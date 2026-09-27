import { ADDRESS, MAIN_PHONES, GENERAL_EMAIL } from "@/content/contact";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Schema.org JSON-LD para OSPIQYP. Tipo MedicalOrganization + LocalBusiness.
 * Mejora el SEO al exponer datos estructurados que Google/Bing entienden.
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness"],
    name: SITE_NAME,
    legalName:
      "Obra Social del Personal de Industrias Químicas y Petroquímicas",
    url: SITE_URL,
    logo: `${SITE_URL}${OG_IMAGE.url}`,
    email: GENERAL_EMAIL,
    telephone: MAIN_PHONES.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      postalCode: ADDRESS.postalCode,
      addressCountry: "AR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: ADDRESS.opens,
      closes: ADDRESS.closes,
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}

/**
 * Serializa a JSON escapando lo que rompe un <script> embebido.
 *
 * `JSON.stringify` no escapa nada de esto, así que un `</script>` dentro de
 * cualquier valor cierra la etiqueta antes de tiempo y lo que sigue se
 * interpreta como HTML. Hoy los datos salen de `src/content/contact.ts` (fijos,
 * escritos por nosotros) y no hay nada explotable, pero es un componente que se
 * copia y pega para agregar otros bloques de datos estructurados: si mañana uno
 * toma un dato editable, el agujero ya está puesto. Se escapa acá y listo.
 *
 * U+2028 y U+2029 van por otro motivo: son saltos de línea válidos en JSON pero
 * ilegales dentro de un literal de JavaScript, y rompen el parseo.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
