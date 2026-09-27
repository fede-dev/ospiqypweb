import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { QuickContact } from "@/components/home/QuickContact";
import { DelegationsPreview } from "@/components/home/DelegationsPreview";

// El home es el único que no usa `pageMetadata()`: hereda title, description y
// openGraph del layout raíz, y Next pisa el bloque openGraph entero cuando una
// página declara el suyo. Sólo necesita su canonical propio, ahora que dejó de
// vivir en el layout.
export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <QuickContact />
      <DelegationsPreview />
    </>
  );
}
