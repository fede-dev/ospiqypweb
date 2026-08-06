import type { Metadata } from "next";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ProvidersTable } from "@/components/shared/ProvidersTable";
import {
  PROVIDERS,
  type ProviderZone,
  type ProviderCategory,
} from "@/content/providers";

export const metadata: Metadata = {
  title: "Prestadores",
  description:
    "Cartilla de prestadores de OSPIQYP: clínicas, sanatorios, centros de diagnóstico, odontología, farmacias y ópticas en CABA y zonas adyacentes. Buscá por zona y categoría.",
};

export default function PrestadoresPage() {
  const zones = Array.from(new Set(PROVIDERS.map((p) => p.zone))) as ProviderZone[];
  const categories = Array.from(
    new Set(PROVIDERS.map((p) => p.category)),
  ) as ProviderCategory[];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Prestadores</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          Consultá la cartilla de clínicas, sanatorios, centros de diagnóstico,
          odontología, farmacias y ópticas de la red OSPIQYP. Buscá por nombre,
          especialidad o localidad, o filtrá por zona y categoría.
        </p>
      </div>

      {/* Descarga del resumen de cartilla */}
      <div className="mb-10 flex flex-col gap-4 rounded-xl border border-brand-100 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-brand-800 mb-1">
            Resumen de Cartilla 2026
          </h2>
          <p className="text-sm text-[color:var(--color-fg-soft)]">
            Descargá el resumen completo en PDF con todas las zonas y el interior
            del país.
          </p>
        </div>
        <a
          href="/pdfs/resumen-cartilla-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          <ArrowDownTrayIcon className="size-5" aria-hidden="true" />
          Descargar PDF
        </a>
      </div>

      <ProvidersTable items={PROVIDERS} zones={zones} categories={categories} />
    </div>
  );
}
