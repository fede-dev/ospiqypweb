/**
 * CAPA 2 — Invariantes del contenido.
 *
 * `src/content/` son módulos de datos tipados: es donde el mantenimiento
 * futuro (agregar una delegación, sumar un prestador de la cartilla nueva)
 * mete errores que TypeScript no puede ver — un id repetido, un PDF que no
 * se subió, un teléfono con una letra.
 *
 * Estos tests no necesitan `out/`: leen los módulos y el filesystem de
 * public/, así que corren siempre.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { FORMS } from "@/content/forms";
import { DELEGATIONS } from "@/content/delegations";
import { PROVIDERS } from "@/content/providers";
import {
  MAIN_PHONES,
  SPECIALIZED_PHONES,
  EMERGENCY_PHONES,
  SERVICE_CONTACTS,
  EMAILS,
} from "@/content/contact";
import { SERVICES } from "@/content/services";
import { COVERAGE } from "@/content/coverage";
import { SEARCH_INDEX } from "@/lib/search";

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

/* ------------------------------------------------------------------ */
/*  Formularios                                                        */
/* ------------------------------------------------------------------ */

describe("FORMS", () => {
  /**
   * Un href de formulario es un string: si el PDF se renombra o no se sube,
   * el build pasa igual y el afiliado se come un 404 al querer descargar el
   * trámite. Esto lo caza antes.
   */
  it("cada href a /pdfs/ existe en public/pdfs/", () => {
    const pdfs = FORMS.filter((f) => f.href.startsWith("/pdfs/"));
    expect(pdfs.length).toBeGreaterThan(0);

    const rotos = pdfs
      .filter((f) => !fs.existsSync(path.join(PUBLIC, decodeURIComponent(f.href))))
      .map((f) => `${f.id} → ${f.href}`);

    expect(rotos).toEqual([]);
  });

  it("no hay ids duplicados", () => {
    expect(duplicados(FORMS.map((f) => f.id))).toEqual([]);
  });

  it("todo href es una ruta absoluta del sitio o un enlace externo https", () => {
    for (const f of FORMS) {
      expect(f.href, f.id).toMatch(/^(\/|https:\/\/)/);
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Delegaciones                                                       */
/* ------------------------------------------------------------------ */

describe("DELEGATIONS", () => {
  /**
   * El id de la delegación es el ancla de la URL (`/delegaciones#moreno`) y
   * la key de React. Duplicado = el link lleva siempre a la primera y React
   * avisa por consola, pero nada rompe visiblemente.
   */
  it("no hay ids duplicados", () => {
    expect(duplicados(DELEGATIONS.map((d) => d.id))).toEqual([]);
  });

  it("el id sirve como ancla de URL (slug en minúsculas, sin espacios)", () => {
    for (const d of DELEGATIONS) {
      expect(d.id, d.city).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("toda delegación tiene ciudad y provincia", () => {
    for (const d of DELEGATIONS) {
      expect(d.city.trim(), d.id).not.toBe("");
      expect(d.province.trim(), d.id).not.toBe("");
    }
  });

  it("los emails tienen forma de email", () => {
    for (const d of DELEGATIONS) {
      if (!d.email) continue;
      expect(d.email, d.id).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i);
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Prestadores                                                        */
/* ------------------------------------------------------------------ */

/**
 * Las uniones de tipo de `Provider` viven en el módulo, pero TypeScript se
 * evapora en runtime: si mañana los datos entran de un CSV o alguien hace un
 * cast, un valor fuera de la unión pasa. Y el filtro de /prestadores arma
 * sus opciones desde estas listas, así que una zona mal tipeada crea una
 * categoría fantasma que no matchea con nada.
 *
 * Se declaran acá a propósito, copiadas de la unión: si alguien agrega una
 * categoría al tipo tiene que tocar también este test (y pensar si el filtro
 * de la página la contempla).
 */
const CATEGORIAS_VALIDAS = [
  "Clínicas y Sanatorios",
  "Centros de Diagnóstico",
  "Kinesiología",
  "Odontología",
  "Farmacias",
  "Ópticas",
];

const ZONAS_VALIDAS = [
  "Capital Federal",
  "Zona Sur",
  "Zona Oeste",
  "Zona Norte",
  "Provincia de Buenos Aires",
];

describe("PROVIDERS", () => {
  it("hay prestadores cargados", () => {
    expect(PROVIDERS.length).toBeGreaterThan(100);
  });

  it("cada category está dentro de la unión ProviderCategory", () => {
    const fuera = [
      ...new Set(PROVIDERS.map((p) => p.category as string)),
    ].filter((c) => !CATEGORIAS_VALIDAS.includes(c));
    expect(fuera).toEqual([]);
  });

  it("cada zone está dentro de la unión ProviderZone", () => {
    const fuera = [...new Set(PROVIDERS.map((p) => p.zone as string))].filter(
      (z) => !ZONAS_VALIDAS.includes(z),
    );
    expect(fuera).toEqual([]);
  });

  /**
   * La cartilla se carga a mano desde un PDF: pegar dos veces el mismo bloque
   * es el error más fácil de cometer y el más difícil de ver (son ~300 filas).
   * "Exacto" = mismo nombre + misma dirección + misma categoría. Dos sedes
   * distintas de la misma cadena (I.A.M.A. Suipacha vs. Viamonte) NO son
   * duplicados y tienen que seguir pasando.
   */
  it("no hay prestadores duplicados exactos (nombre + dirección + categoría)", () => {
    const claves = PROVIDERS.map((p) =>
      [p.name, p.address ?? "", p.category].join(" | ").toLowerCase(),
    );
    expect(duplicados(claves)).toEqual([]);
  });

  it("todo prestador tiene nombre no vacío", () => {
    const sinNombre = PROVIDERS.filter((p) => !p.name.trim());
    expect(sinNombre).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/*  Teléfonos                                                          */
/* ------------------------------------------------------------------ */

describe("teléfonos", () => {
  /**
   * En la cartilla conviven varios formatos legítimos: "(011) 5275-2270",
   * "4943-0183 / 1497", "02226-15-471010", "0810-555-7777". No queremos
   * uniformarlos (así figuran en el papel), pero SÍ que sean marcables:
   *
   *  - sólo dígitos, espacios, guiones, paréntesis, barras y "+";
   *  - el primer número (antes de la "/") tiene al menos 6 dígitos.
   *
   * El porqué del segundo punto: el link para llamar lo arma `telHref`
   * (src/lib/phone.ts) con el PRIMER número, el que va antes de la "/".
   * Si ese primero quedó incompleto, el link llama a la nada.
   */
  const CARACTERES_PERMITIDOS = /^[0-9()\-/+ .]+$/;

  const telefonos: Array<[string, string]> = [
    ...PROVIDERS.filter((p) => p.phone).map(
      (p) => [`prestador ${p.name}`, p.phone!] as [string, string],
    ),
    ...DELEGATIONS.filter((d) => d.phone).map(
      (d) => [`delegación ${d.id}`, d.phone!] as [string, string],
    ),
    ...[...MAIN_PHONES, ...SPECIALIZED_PHONES, ...EMERGENCY_PHONES].map(
      (p) => [`línea ${p.label}`, p.number] as [string, string],
    ),
    ...SERVICE_CONTACTS.filter((s) => s.phone).map(
      (s) => [`servicio ${s.label}`, s.phone!] as [string, string],
    ),
  ];

  it("hay teléfonos cargados", () => {
    expect(telefonos.length).toBeGreaterThan(100);
  });

  it("no contienen letras ni símbolos raros", () => {
    const invalidos = telefonos
      .filter(([, tel]) => !CARACTERES_PERMITIDOS.test(tel))
      .map(([quien, tel]) => `${quien}: "${tel}"`);
    expect(invalidos).toEqual([]);
  });

  it("el primer número marcable tiene al menos 6 dígitos", () => {
    const cortos = telefonos
      .filter(([, tel]) => {
        const primero = tel.split("/")[0].replace(/[^\d]/g, "");
        return primero.length < 6;
      })
      .map(([quien, tel]) => `${quien}: "${tel}"`);
    expect(cortos).toEqual([]);
  });

  it("no quedan espacios de sobra en las puntas", () => {
    const conEspacios = telefonos
      .filter(([, tel]) => tel !== tel.trim())
      .map(([quien, tel]) => `${quien}: "${tel}"`);
    expect(conEspacios).toEqual([]);
  });

  /**
   * En contact.ts el número visible (`number`) y el marcable (`tel`) son dos
   * campos separados: si se corrige uno y no el otro, la pantalla muestra un
   * teléfono y el link llama a otro — un error que nadie ve hasta que un
   * afiliado marca mal. Acá exigimos E.164 y que el tel contenga los dígitos
   * del número visible (con o sin el 0 inicial del código de área).
   */
  it("el `tel:` de contact.ts es E.164 y coincide con el número visible", () => {
    const lineas = [
      ...MAIN_PHONES,
      ...SPECIALIZED_PHONES,
      ...EMERGENCY_PHONES,
      ...SERVICE_CONTACTS.filter((s) => s.phone && s.tel).map((s) => ({
        label: s.label,
        number: s.phone!,
        tel: s.tel!,
      })),
    ];

    const inconsistentes = lineas
      .filter(({ number, tel }) => {
        if (!/^\+\d{10,15}$/.test(tel)) return true;
        const visible = number.replace(/\D/g, "");
        const sinCeroInicial = visible.replace(/^0/, "");
        return !tel.includes(visible) && !tel.includes(sinCeroInicial);
      })
      .map(({ label, number, tel }) => `${label}: "${number}" vs "${tel}"`);

    expect(inconsistentes).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/*  Índice de búsqueda                                                 */
/* ------------------------------------------------------------------ */

describe("SEARCH_INDEX", () => {
  /**
   * El buscador es la única parte del sitio que puede mandar al usuario a una
   * URL que no existe: los href salen de los módulos de contenido, no del
   * árbol de rutas. Con `output: "export"` una ruta inexistente es un 404 duro
   * de Apache (no hay router de Next que la atrape).
   *
   * Resolvemos cada href contra `src/app/` (donde una ruta = una carpeta con
   * page.tsx), ignorando el fragmento `#ancla`.
   */
  function rutaExiste(href: string): boolean {
    const ruta = href.split("#")[0].split("?")[0];
    if (ruta === "/" || ruta === "") {
      return fs.existsSync(path.join(APP, "page.tsx"));
    }
    if (ruta.startsWith("/pdfs/") || ruta.startsWith("/images/")) {
      return fs.existsSync(path.join(PUBLIC, decodeURIComponent(ruta)));
    }
    const dir = path.join(APP, ruta.replace(/^\/|\/$/g, ""));
    return fs.existsSync(path.join(dir, "page.tsx"));
  }

  it("hay índice cargado", () => {
    expect(SEARCH_INDEX.length).toBeGreaterThan(100);
  });

  it("cada href interno corresponde a una ruta real de src/app/ (o a un archivo de public/)", () => {
    const rotos = [...new Set(SEARCH_INDEX.map((i) => i.href))]
      .filter((href) => href.startsWith("/"))
      .filter((href) => !rutaExiste(href));
    expect(rotos).toEqual([]);
  });

  it("los href externos son https absolutos", () => {
    // Hay items que apuntan a sitios de la federación (ej. turismo): no los
    // podemos resolver contra el filesystem, pero sí exigirles https.
    const externos = [...new Set(SEARCH_INDEX.map((i) => i.href))].filter(
      (href) => !href.startsWith("/"),
    );
    for (const href of externos) {
      expect(href).toMatch(/^https:\/\//);
    }
  });

  it("no hay ids duplicados", () => {
    // El id es la key de React en la lista de resultados del diálogo.
    expect(duplicados(SEARCH_INDEX.map((i) => i.id))).toEqual([]);
  });

  it("todo item tiene título no vacío", () => {
    const sinTitulo = SEARCH_INDEX.filter((i) => !i.title?.trim()).map((i) => i.id);
    expect(sinTitulo).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/*  Resto del contenido enlazado                                       */
/* ------------------------------------------------------------------ */

describe("links internos del contenido", () => {
  function rutaInternaExiste(href: string): boolean {
    const ruta = href.split("#")[0].split("?")[0];
    if (ruta === "/" || ruta === "") return true;
    if (ruta.startsWith("/pdfs/") || ruta.startsWith("/images/")) {
      return fs.existsSync(path.join(PUBLIC, decodeURIComponent(ruta)));
    }
    return fs.existsSync(
      path.join(APP, ruta.replace(/^\/|\/$/g, ""), "page.tsx"),
    );
  }

  it("los href internos de SERVICES apuntan a rutas reales", () => {
    const rotos = SERVICES.filter(
      (s) => s.href.startsWith("/") && !rutaInternaExiste(s.href),
    ).map((s) => `${s.id} → ${s.href}`);
    expect(rotos).toEqual([]);
  });

  it("los href de COVERAGE apuntan a rutas reales", () => {
    const rotos = COVERAGE.filter(
      (c) => c.href.startsWith("/") && !rutaInternaExiste(c.href),
    ).map((c) => `${c.id} → ${c.href}`);
    expect(rotos).toEqual([]);
  });

  it("no hay ids duplicados en SERVICES ni en COVERAGE", () => {
    expect(duplicados(SERVICES.map((s) => s.id))).toEqual([]);
    expect(duplicados(COVERAGE.map((c) => c.id))).toEqual([]);
  });

  it("los emails de contacto tienen forma de email", () => {
    const mails = [
      ...EMAILS.map((e) => e.email),
      ...SPECIALIZED_PHONES.filter((p) => p.email).map((p) => p.email!),
    ];
    expect(mails.length).toBeGreaterThan(0);
    for (const mail of mails) {
      expect(mail).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i);
    }
  });

  it("las URLs de servicios externos son https", () => {
    // Los links a terceros del pie/contacto: si alguno queda en http, es
    // mixed content en una página servida por HTTPS.
    for (const s of SERVICE_CONTACTS) {
      if (!s.url) continue;
      expect(s.url, s.label).toMatch(/^https:\/\//);
    }
  });
});

/* ------------------------------------------------------------------ */

/** Devuelve los valores que aparecen más de una vez, con su cantidad. */
function duplicados(valores: string[]): string[] {
  const cuenta = new Map<string, number>();
  for (const v of valores) cuenta.set(v, (cuenta.get(v) ?? 0) + 1);
  return [...cuenta.entries()]
    .filter(([, n]) => n > 1)
    .map(([v, n]) => `${v} (x${n})`);
}
