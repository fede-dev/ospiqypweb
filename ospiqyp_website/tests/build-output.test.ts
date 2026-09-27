/**
 * CAPA 1 — Aserciones sobre el HTML que realmente se sube a producción.
 *
 * Es la capa de mayor retorno del repo: el sitio es un export estático
 * (`output: "export"`) servido por LiteSpeed sin Node, así que TODO lo que
 * puede salir mal en prod ya está escrito en `out/`. Cada test de acá nace
 * de un bug que YA nos pasó en producción, no de una hipótesis.
 *
 * Requiere `npm run build` corrido antes (ver script `test:build` en
 * package.json).
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

/**
 * Hosts de terceros que HOY no tienen HTTPS. Son sistemas del propio
 * prestador informático de la obra social (autogestión de afiliados y
 * webmail), fuera de nuestro control: si les forzamos https el link muere.
 * Cualquier OTRO http:// en el HTML es un bug nuestro (mixed content, un
 * link viejo copiado, una URL hardcodeada) y este test lo tiene que cazar.
 *
 * Si algún día el proveedor habilita HTTPS, se saca de acá y el test obliga
 * a actualizar los links.
 */
const HTTP_ALLOWLIST = [
  "http://osocial.homelinux.org:48888",
  "http://osocial2.homelinux.org/webmail",
  "http://osocial2.homelinux.org:58889",
];

/**
 * Los namespaces XML NO son links: `xmlns="http://www.w3.org/2000/svg"` es
 * un identificador, el browser nunca lo pide por red. Los excluimos antes
 * de comparar contra la allowlist para no ensuciarla con ruido técnico.
 */
const XML_NAMESPACE_PREFIX = "http://www.w3.org/";

/** Presupuesto de peso del export. Ver el test de tamaño para el porqué. */
const OUT_BUDGET_MB = 12;

/**
 * Páginas reales del sitio. `404/` y `_not-found/` son el fallback de Next:
 * no llevan canonical ni description propias y no están en el sitemap, así
 * que quedan fuera de las aserciones de SEO.
 */
const NOT_A_PAGE = new Set(["404", "_not-found"]);

type Page = {
  /** Ruta pública con barra inicial y final, ej. "/contacto/" o "/". */
  route: string;
  file: string;
  html: string;
};

let pages: Page[] = [];
let allHtmlFiles: string[] = [];

/** Lista recursiva de archivos bajo `dir`. */
function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

beforeAll(() => {
  // Mensaje explícito: sin `out/` el test no puede decidir nada, y "0 tests"
  // o un error de ENOENT se lee como "anda todo bien". Falla ruidoso.
  if (!fs.existsSync(OUT)) {
    throw new Error(
      "No existe out/. Estos tests corren sobre el export estático: " +
        "ejecutá `npm run build` antes (o usá `npm run test:build`).",
    );
  }

  allHtmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));

  pages = allHtmlFiles
    .filter((f) => path.basename(f) === "index.html")
    .map((file) => {
      const rel = path.relative(OUT, path.dirname(file));
      return {
        route: rel === "" ? "/" : `/${rel.split(path.sep).join("/")}/`,
        file,
        html: fs.readFileSync(file, "utf8"),
      };
    })
    .filter((p) => !NOT_A_PAGE.has(p.route.replaceAll("/", "")))
    .sort((a, b) => a.route.localeCompare(b.route));

  expect(pages.length).toBeGreaterThan(0);
});

describe("canonical", () => {
  /**
   * BUG REAL: el canonical se heredaba del layout raíz, que lo tenía fijo en
   * "/". Resultado: las 10 páginas le declaraban a Google que eran duplicados
   * del home. Se arregló con el helper `pageMetadata()` de src/lib/site.ts,
   * que deriva el canonical del `path`. Este test es el candado.
   */
  it("cada página apunta a SU propia URL, no al home", () => {
    const wrong: string[] = [];

    for (const page of pages) {
      const match = page.html.match(
        /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/,
      );
      if (!match) {
        wrong.push(`${page.route} → sin <link rel="canonical">`);
        continue;
      }
      const canonical = match[1];
      const expectedPath = page.route;
      if (!canonical.endsWith(expectedPath)) {
        wrong.push(`${page.route} → declara ${canonical}`);
      }
    }

    expect(wrong).toEqual([]);
  });

  it("el canonical es absoluto, https y con barra final", () => {
    for (const page of pages) {
      const canonical = page.html.match(
        /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/,
      )?.[1];
      expect(canonical, `${page.route} sin canonical`).toBeTruthy();
      // La barra final no es cosmética: con `trailingSlash: true` la URL que
      // sirve el hosting es /institucional/. Sin barra, Google se come un 301.
      expect(canonical, page.route).toMatch(/^https:\/\/[^/]+\/(.*\/)?$/);
    }
  });
});

describe("sitemap.xml", () => {
  let locs: string[] = [];

  beforeAll(() => {
    const file = path.join(OUT, "sitemap.xml");
    expect(fs.existsSync(file), "falta out/sitemap.xml").toBe(true);
    const xml = fs.readFileSync(file, "utf8");
    locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(0);
  });

  /**
   * BUG REAL: las <loc> salían sin barra final y el server devolvía 301 en
   * cada URL del sitemap — un salto de redirección gratis por cada visita
   * del crawler.
   */
  it("toda <loc> termina en barra", () => {
    const sinBarra = locs.filter((loc) => !loc.endsWith("/"));
    expect(sinBarra).toEqual([]);
  });

  it("toda <loc> tiene su index.html en out/", () => {
    const faltantes = locs.filter((loc) => {
      const route = new URL(loc).pathname; // "/contacto/"
      return !fs.existsSync(path.join(OUT, route, "index.html"));
    });
    expect(faltantes).toEqual([]);
  });

  it("toda página exportada está listada en el sitemap", () => {
    const enSitemap = new Set(locs.map((loc) => new URL(loc).pathname));
    const huerfanas = pages
      .map((p) => p.route)
      .filter((route) => !enSitemap.has(route));
    expect(huerfanas).toEqual([]);
  });
});

describe("assets referenciados", () => {
  /**
   * Caza links rotos: un PDF renombrado o una imagen borrada en una limpieza
   * no rompe el build (son strings), sólo da 404 en producción. Barremos
   * TODO el HTML, no sólo las páginas, para incluir el 404 y cualquier
   * fragmento.
   */
  function refsDe(pattern: RegExp): Map<string, Set<string>> {
    const refs = new Map<string, Set<string>>();
    for (const file of allHtmlFiles) {
      const html = fs.readFileSync(file, "utf8");
      for (const m of html.matchAll(pattern)) {
        // El HTML de Next mete rutas también dentro de payloads JSON, donde
        // las comillas vienen escapadas: limpiamos la barra final colgada.
        const ref = decodeURIComponent(m[1].replace(/\\+$/, ""));
        const donde = refs.get(ref) ?? new Set<string>();
        donde.add(path.relative(OUT, file));
        refs.set(ref, donde);
      }
    }
    return refs;
  }

  it("todo /pdfs/*.pdf referenciado existe en out/", () => {
    const refs = refsDe(/(?:href|src)="(\/pdfs\/[^"?#]+\.pdf)/g);
    expect(refs.size, "no se encontró ninguna referencia a PDFs").toBeGreaterThan(0);

    const rotos = [...refs.entries()]
      .filter(([ref]) => !fs.existsSync(path.join(OUT, ref)))
      .map(([ref, donde]) => `${ref} (en ${[...donde].join(", ")})`);

    expect(rotos).toEqual([]);
  });

  it("todo /images/* referenciado existe en out/", () => {
    const refs = refsDe(/(?:href|src)="(\/images\/[^"?#]+)/g);
    expect(refs.size, "no se encontró ninguna referencia a imágenes").toBeGreaterThan(0);

    const rotos = [...refs.entries()]
      .filter(([ref]) => !fs.existsSync(path.join(OUT, ref)))
      .map(([ref, donde]) => `${ref} (en ${[...donde].join(", ")})`);

    expect(rotos).toEqual([]);
  });
});

describe("peso del export", () => {
  /**
   * BUG REAL: out/ pesaba 35 MB, de los cuales 24 MB eran PNGs de banners
   * que ya nadie referenciaba (quedaron de iteraciones de diseño). Hoy pesa
   * ~10 MB. Este presupuesto es el candado para que no vuelvan: si alguien
   * mete un PNG de 5 MB en public/, el test falla antes del deploy.
   */
  it(`out/ no supera ${OUT_BUDGET_MB} MB`, () => {
    const bytes = walk(OUT).reduce((sum, f) => sum + fs.statSync(f).size, 0);
    const mb = bytes / 1024 / 1024;
    expect(
      mb,
      `out/ pesa ${mb.toFixed(1)} MB. Revisá si entró un asset pesado ` +
        `(public/images, public/pdfs) o subí el presupuesto a conciencia.`,
    ).toBeLessThanOrEqual(OUT_BUDGET_MB);
  });
});

describe("http:// sin s", () => {
  /**
   * Mixed content: la página se sirve por HTTPS, así que cualquier recurso
   * http:// lo bloquea el browser (o al menos rompe el candado). Sólo se
   * toleran los 3 hosts de terceros que no ofrecen HTTPS.
   */
  it("sólo aparecen los hosts de terceros conocidos", () => {
    const encontrados = new Map<string, Set<string>>();

    for (const file of allHtmlFiles) {
      const html = fs.readFileSync(file, "utf8");
      for (const m of html.matchAll(/http:\/\/[^\s"'<>)\\]+/g)) {
        const url = m[0];
        if (url.startsWith(XML_NAMESPACE_PREFIX)) continue;
        if (HTTP_ALLOWLIST.some((allowed) => url.startsWith(allowed))) continue;
        const donde = encontrados.get(url) ?? new Set<string>();
        donde.add(path.relative(OUT, file));
        encontrados.set(url, donde);
      }
    }

    const inesperados = [...encontrados.entries()].map(
      ([url, donde]) => `${url} (en ${[...donde].join(", ")})`,
    );
    expect(inesperados).toEqual([]);
  });
});

describe("metadata básica de cada página", () => {
  it("tiene <title> no vacío", () => {
    for (const page of pages) {
      const title = page.html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
      expect(title.trim(), `${page.route} sin <title>`).not.toBe("");
    }
  });

  it("tiene <meta name=\"description\"> no vacío", () => {
    for (const page of pages) {
      const desc =
        page.html.match(
          /<meta[^>]+name="description"[^>]+content="([^"]*)"/,
        )?.[1] ?? "";
      expect(desc.trim(), `${page.route} sin description`).not.toBe("");
    }
  });

  it("declara lang=\"es-AR\"", () => {
    // No es "es" a secas: el sitio es de una obra social argentina y el copy
    // está en rioplatense (voseo). Afecta a lectores de pantalla y a Google.
    for (const page of pages) {
      const lang = page.html.match(/<html[^>]+lang="([^"]*)"/)?.[1];
      expect(lang, `${page.route}`).toBe("es-AR");
    }
  });

  it("no repite el mismo <title> en dos páginas", () => {
    const titles = pages.map((p) => [
      p.route,
      p.html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "",
    ]);
    const vistos = new Map<string, string>();
    const duplicados: string[] = [];
    for (const [route, title] of titles) {
      const previo = vistos.get(title);
      if (previo) duplicados.push(`"${title}": ${previo} y ${route}`);
      else vistos.set(title, route);
    }
    expect(duplicados).toEqual([]);
  });
});

describe("páginas fantasma", () => {
  /**
   * BUG REAL: /coberturas/pmo/ existía como ruta y devolvía 200, pero su
   * HTML no tenía contenido — una página en blanco indexable. El build no se
   * queja de eso: una page que no renderiza nada compila perfecto.
   *
   * Medimos el texto visible del <body> sacando <script>/<style>/tags. El
   * umbral es holgado a propósito: el header y el footer solos ya suman
   * varios cientos de caracteres, así que 400 sólo dispara con una página
   * genuinamente vacía, no con una corta.
   */
  const MIN_TEXTO_BODY = 400;

  it("ninguna página tiene el body prácticamente vacío", () => {
    const vacias: string[] = [];

    for (const page of pages) {
      const body = page.html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";
      const texto = body
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<style[\s\S]*?<\/style>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (texto.length < MIN_TEXTO_BODY) {
        vacias.push(`${page.route} → ${texto.length} caracteres de texto`);
      }
    }

    expect(vacias).toEqual([]);
  });

  it("cada página tiene un <h1>", () => {
    // Otra señal de página a medio hacer, y además es SEO básico.
    const sinH1 = pages
      .filter((p) => !/<h1[\s>]/.test(p.html))
      .map((p) => p.route);
    expect(sinH1).toEqual([]);
  });
});
