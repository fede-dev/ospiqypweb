/**
 * Unit tests de `src/lib/site.ts`.
 *
 * Este archivo es la única fuente de verdad de las URLs canónicas: lo usan
 * la metadata de las 10 páginas Y el sitemap. Los DOS bugs de SEO que
 * arrastramos a producción (canonical apuntando siempre al home, y <loc> sin
 * barra final devolviendo 301) salen de acá.
 *
 * `tests/build-output.test.ts` los verifica sobre el HTML real, que es la
 * prueba definitiva; estos tests son el complemento barato: corren en
 * milisegundos sin buildear y señalan la causa exacta en vez del síntoma.
 */
import { describe, it, expect } from "vitest";
import { canonicalUrl, pageMetadata, SITE_URL } from "@/lib/site";

describe("canonicalUrl", () => {
  it("la home devuelve la raíz con barra", () => {
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
    expect(canonicalUrl("")).toBe(`${SITE_URL}/`);
  });

  /**
   * La barra final no es cosmética: `next.config.ts` tiene
   * `trailingSlash: true`, así que la URL que sirve Apache es
   * `/institucional/`. Sin barra, cada canonical y cada <loc> del sitemap se
   * comían un 301 antes de llegar al contenido.
   */
  it("siempre agrega la barra final", () => {
    expect(canonicalUrl("/institucional")).toBe(`${SITE_URL}/institucional/`);
    expect(canonicalUrl("/institucional/")).toBe(`${SITE_URL}/institucional/`);
  });

  it("normaliza barras de sobra en las puntas", () => {
    // `/`, `""`, `/contacto` y `/contacto/` tienen que dar todos lo mismo, y
    // nunca puede aparecer un `//` en el medio.
    for (const entrada of ["contacto", "/contacto", "/contacto/", "//contacto//"]) {
      expect(canonicalUrl(entrada)).toBe(`${SITE_URL}/contacto/`);
    }
  });

  it("soporta rutas anidadas", () => {
    expect(canonicalUrl("/coberturas/discapacidad")).toBe(
      `${SITE_URL}/coberturas/discapacidad/`,
    );
  });

  it("siempre devuelve una URL absoluta https", () => {
    expect(canonicalUrl("/formularios")).toMatch(/^https:\/\//);
  });
});

describe("pageMetadata", () => {
  /**
   * BUG REAL: el canonical se heredaba del layout raíz (fijo en "/"), así que
   * las 10 páginas se declaraban duplicadas del home. El helper existe para
   * que sea imposible crear una página sin su canonical propio: pide `path`
   * de forma obligatoria.
   */
  it("el canonical sale del path de la página, no del home", () => {
    const meta = pageMetadata({ path: "/delegaciones", title: "Delegaciones" });
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/delegaciones/`);
    expect(meta.alternates?.canonical).not.toBe(`${SITE_URL}/`);
  });

  it("openGraph.url coincide con el canonical", () => {
    // Si divergen, WhatsApp/Facebook cachean el preview con la URL equivocada.
    const meta = pageMetadata({ path: "/prestadores" });
    expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
  });

  /**
   * Next NO hace merge profundo de `openGraph`: la página pisa el bloque
   * entero del layout. Por eso el helper tiene que volver a declarar la
   * imagen, o el preview al compartir queda sin foto.
   */
  it("siempre declara una imagen de openGraph", () => {
    const meta = pageMetadata({ path: "/novedades" });
    const images = meta.openGraph?.images;
    expect(Array.isArray(images) && images.length > 0).toBe(true);
  });

  it("declara locale es_AR", () => {
    const og = pageMetadata({ path: "/contacto" }).openGraph as {
      locale?: string;
    };
    expect(og.locale).toBe("es_AR");
  });

  it("omite title y description si no se pasan (los hereda del layout)", () => {
    const meta = pageMetadata({ path: "/" });
    expect(meta.title).toBeUndefined();
    expect(meta.description).toBeUndefined();
    // …pero el canonical nunca se omite.
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/`);
  });

  it("propaga title y description cuando se pasan", () => {
    const meta = pageMetadata({
      path: "/institucional",
      title: "Institucional",
      description: "Quiénes somos.",
    });
    expect(meta.title).toBe("Institucional");
    expect(meta.description).toBe("Quiénes somos.");
  });
});
