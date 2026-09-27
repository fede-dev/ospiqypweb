import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { MAIN_PHONES, SPECIALIZED_PHONES } from "@/content/contact";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { EmailLink } from "@/components/shared/EmailLink";

export function QuickContact() {
  return (
    <section className="py-16 md:py-20 bg-[color:var(--color-bg-soft)]" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Líneas principales */}
          <div>
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">
              Estamos para ayudarte
            </h2>
            <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">
              Comunicate con nosotros por teléfono o consultá nuestros canales de
              atención especializados.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                Líneas principales
              </h3>
              {MAIN_PHONES.map((p) => (
                <div key={p.tel}>
                  <PhoneLink number={p.number} tel={p.tel} label={p.label} size="lg" />
                </div>
              ))}
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all"
            >
              Ver todos los canales de contacto
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Líneas especializadas (con email opcional debajo del tel) */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-[color:var(--color-border)] shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Atención especializada</h3>
            <ul className="space-y-5">
              {SPECIALIZED_PHONES.map((p) => (
                <li
                  key={p.tel}
                  className="pb-4 border-b border-[color:var(--color-border)] last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="font-medium">{p.label}</span>
                    <PhoneLink number={p.number} tel={p.tel} label={p.label} size="md" />
                  </div>
                  {p.email && (
                    <div className="mt-1 text-sm">
                      <EmailLink email={p.email} label={p.label} className="text-xs" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
