import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

// Requerido por `output: export`: generar el archivo en build-time.
export const dynamic = "force-static";

// Fecha de última actualización del contenido del sitio. Se actualiza
// manualmente al publicar cambios; evita que el sitemap "cambie" en cada build.
const LAST_MODIFIED = new Date("2026-08-06");

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/institucional", priority: 0.8, changeFrequency: "monthly" },
  { path: "/coberturas", priority: 0.9, changeFrequency: "monthly" },
  { path: "/coberturas/discapacidad", priority: 0.7, changeFrequency: "monthly" },
  { path: "/programa-medico-obligatorio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/prestadores", priority: 0.8, changeFrequency: "weekly" },
  { path: "/delegaciones", priority: 0.7, changeFrequency: "monthly" },
  { path: "/formularios", priority: 0.7, changeFrequency: "monthly" },
  { path: "/novedades", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    // Misma fuente de verdad que los canonical de cada página: con barra final,
    // que es lo que sirve Apache con `trailingSlash: true`. Sin esto cada URL
    // del sitemap se comía un 301 antes de llegar al contenido.
    url: canonicalUrl(path),
    lastModified: LAST_MODIFIED,
    priority,
    changeFrequency,
  }));
}
