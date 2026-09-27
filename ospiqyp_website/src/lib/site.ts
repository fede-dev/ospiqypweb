import type { Metadata } from "next";

/**
 * Constantes globales del sitio. Única fuente de verdad para la URL base,
 * usada por metadata, sitemap y robots.
 */
export const SITE_URL = "https://www.ospiqyp.org.ar";

export const SITE_NAME = "OSPIQYP";

export const SITE_LEGAL_NAME = "Obra Social del Personal de Industrias Químicas y Petroquímicas";

export const SITE_TITLE = `${SITE_NAME} — ${SITE_LEGAL_NAME}`;

/**
 * Imagen que se muestra al compartir cualquier página en redes/WhatsApp.
 * Vive acá porque `pageMetadata` reemplaza el bloque `openGraph` del layout
 * (Next NO hace merge profundo de openGraph: lo pisa entero), así que cada
 * página tiene que volver a declararla o el preview queda sin imagen.
 */
export const SITE_LOGO = "/images/logo.png";

// Hoy la imagen de compartir es el logo, pero son dos cosas: si mañana se hace
// una imagen apaisada para WhatsApp, cambia OG_IMAGE y el logo queda.
const OG_IMAGE = { url: SITE_LOGO, alt: SITE_NAME };

/** Lo que todo bloque openGraph comparte: lo usan el layout raíz y `pageMetadata`. */
export const OPEN_GRAPH_BASE = {
  type: "website" as const,
  locale: "es_AR",
  siteName: SITE_NAME,
  images: [OG_IMAGE],
};

/**
 * Devuelve la URL absoluta canónica de una ruta, SIEMPRE con barra final.
 * La barra final no es cosmética: `next.config.ts` usa `trailingSlash: true`,
 * o sea que la URL real que sirve el hosting es `/institucional/`. Si el
 * canonical apuntara a `/institucional`, le estaríamos declarando a Google
 * una URL que responde 301 — un salto de redirección gratis en cada visita
 * del crawler.
 */
export function canonicalUrl(path: string): string {
  // Normalizamos barras de sobra en las puntas para que `/`, `""`, `/contacto`
  // y `/contacto/` den todos el mismo resultado y nunca aparezca `//`.
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

type PageMetadataInput = {
  /** Ruta de la página tal como está en el árbol de `app/` (ej. "/contacto"). */
  path: string;
  /**
   * Title de la página, sin el sufijo de marca: el `title.template` del layout
   * raíz le agrega " | OSPIQYP". Se omite sólo en el home, que hereda el
   * `title.default` del layout.
   */
  title?: string;
  description?: string;
};

/**
 * Construye la metadata de una página: title, description, canonical y
 * openGraph.url, todos derivados de un único `path`.
 *
 * La razón de que exista este helper: el canonical se venía heredando del
 * layout raíz (fijo en "/"), así que TODAS las páginas se declaraban a sí
 * mismas como duplicadas del home. Al obligar a pasar `path` para poder
 * armar el objeto de metadata, es imposible crear una página nueva sin su
 * canonical propio.
 */
export function pageMetadata({ path, title, description }: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      url,
      // title y description del openGraph los completa Next con los de la
      // página (o los del layout, si acá no se pasaron): no los repetimos.
    },
  };
}
