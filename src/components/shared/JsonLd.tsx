import { ADDRESS, MAIN_PHONES, EMAILS } from "@/content/contact";

/**
 * Schema.org JSON-LD para OSPIQYP. Tipo MedicalOrganization + LocalBusiness.
 * Mejora el SEO al exponer datos estructurados que Google/Bing entienden.
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness"],
    name: "OSPIQYP",
    legalName:
      "Obra Social del Personal de Industrias Químicas y Petroquímicas",
    url: "https://www.ospiqyp.org.ar",
    logo: "https://www.ospiqyp.org.ar/images/logo.png",
    email: EMAILS[0].email,
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
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
