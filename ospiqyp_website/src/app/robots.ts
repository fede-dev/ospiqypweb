import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Requerido por `output: export`: generar el archivo en build-time.
export const dynamic = "force-static";

/**
 * robots.txt — generado por Next.js en /robots.txt.
 * Permite el rastreo completo del sitio público y apunta al sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Rutas internas/técnicas que no aportan a la indexación.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
