import Link from "next/link";
import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DELEGATIONS } from "@/content/delegations";

export function DelegationsPreview() {
  // Mostramos 8 delegaciones más relevantes en home como preview
  const featured = DELEGATIONS.slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="delegations-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 id="delegations-heading" className="text-3xl md:text-4xl font-bold mb-3">
              Presencia en todo el país
            </h2>
            <p className="text-lg text-[color:var(--color-fg-soft)]">
              Más de 20 delegaciones a lo largo de Argentina para atenderte cerca tuyo.
            </p>
          </div>
          <Link
            href="/delegaciones"
            className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all flex-shrink-0"
          >
            Ver todas
            <ArrowRightIcon className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {featured.map((d) => (
            <li key={d.id}>
              <Link
                href={`/delegaciones#${d.id}`}
                className="flex items-start gap-2 p-3 rounded-lg border border-[color:var(--color-border)] hover:border-brand-600 hover:bg-brand-50 transition-colors"
              >
                <MapPinIcon className="size-4 text-brand-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{d.city}</div>
                  <div className="text-xs text-[color:var(--color-fg-soft)] truncate">{d.province}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
