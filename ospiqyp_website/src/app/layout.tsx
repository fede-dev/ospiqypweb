import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { OrganizationJsonLd } from "@/components/shared/JsonLd";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Ojo: acá NO va `alternates.canonical`. La metadata del layout raíz la
// heredan todas las páginas hijas, así que un canonical fijo en "/" hacía que
// /institucional, /contacto, /prestadores y compañía se declararan duplicadas
// del home. Cada página arma el suyo con `pageMetadata()` (src/lib/site.ts) y
// el del home vive en src/app/page.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Obra Social del Personal de Industrias Químicas y Petroquímicas. Cobertura médica, odontología, discapacidad, ópticas, farmacia y red nacional de prestadores.",
  keywords: [
    "OSPIQYP",
    "obra social",
    "industrias químicas",
    "petroquímica",
    "cobertura médica",
    "PMO",
    "Argentina",
  ],
  openGraph: {
    ...OPEN_GRAPH_BASE,
    title: SITE_TITLE,
    description:
      "Cobertura médica integral, red nacional de prestadores y atención personalizada para vos y tu familia.",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-white text-[color:var(--color-fg)]"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <EmergencyBanner />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
