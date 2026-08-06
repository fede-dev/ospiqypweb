import type { Metadata } from "next";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { DELEGATIONS } from "@/content/delegations";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/delegaciones",
  title: "Delegaciones",
  description:
    "Más de 20 delegaciones de OSPIQYP en toda la Argentina. Encontrá la oficina más cercana a tu domicilio.",
});

export default function DelegacionesPage() {
  // Agrupar por provincia
  const byProvince = DELEGATIONS.reduce<Record<string, typeof DELEGATIONS>>((acc, d) => {
    if (!acc[d.province]) acc[d.province] = [];
    acc[d.province].push(d);
    return acc;
  }, {});

  const provinces = Object.keys(byProvince).sort();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Delegaciones</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          Tenemos presencia en todo el país. Encontrá la delegación más cercana
          para realizar tus trámites presenciales.
        </p>
      </div>

      <div className="space-y-10">
        {provinces.map((province) => (
          <section key={province}>
            <h2 className="text-2xl font-bold mb-4 text-brand-700">{province}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byProvince[province].map((d) => (
                <li
                  key={d.id}
                  id={d.id}
                  className="p-5 bg-white border border-[color:var(--color-border)] rounded-lg scroll-mt-24"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <MapPinIcon className="size-5 text-brand-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-semibold">{d.city}</h3>
                  </div>
                  {d.address && (
                    <p className="text-sm text-[color:var(--color-fg-soft)] mb-2 ml-7">{d.address}</p>
                  )}
                  {d.phone && (
                    <a
                      href={`tel:${d.phone.replace(/\D/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm text-brand-700 hover:underline ml-7"
                    >
                      <PhoneIcon className="size-4" aria-hidden="true" />
                      {d.phone}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
