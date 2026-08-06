import type { Metadata } from "next";
import {
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  ADDRESS,
  MAIN_PHONES,
  SPECIALIZED_PHONES,
  EMERGENCY_PHONES,
  EMAILS,
  SERVICE_CONTACTS,
} from "@/content/contact";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { EmailLink } from "@/components/shared/EmailLink";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/contacto",
  title: "Contacto",
  description:
    "Comunicate con OSPIQYP. Teléfonos, emails, dirección y horarios de atención.",
});

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          Estamos para atenderte. Comunicate con nosotros por el canal que más
          te convenga.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sede + horarios */}
        <section className="lg:col-span-1 p-6 bg-white border border-[color:var(--color-border)] rounded-xl">
          <h2 className="text-xl font-bold mb-4">Sede Central</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPinIcon className="size-5 text-brand-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <address className="not-italic">
                {ADDRESS.street}
                <br />
                {ADDRESS.city}
                <br />
                ({ADDRESS.postalCode}) — {ADDRESS.country}
              </address>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="size-5 text-brand-600 flex-shrink-0" aria-hidden="true" />
              <span>{ADDRESS.hours}</span>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-6 aspect-video rounded-lg overflow-hidden border border-[color:var(--color-border)]">
            <iframe
              title="Mapa de la sede OSPIQYP — México 1474, CABA"
              src="https://maps.google.com/maps?q=México+1474+Buenos+Aires&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* Teléfonos */}
        <section className="lg:col-span-2 space-y-6">
          {/* Emergencias destacado */}
          <div className="p-6 bg-alert-500 text-white rounded-xl">
            <h2 className="text-xl font-bold mb-4">Emergencias 24/7</h2>
            <ul className="space-y-3">
              {EMERGENCY_PHONES.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold hover:underline"
                    aria-label={`Llamar a emergencias al ${p.number}`}
                  >
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Líneas principales */}
          <div className="p-6 bg-white border border-[color:var(--color-border)] rounded-xl">
            <h2 className="text-xl font-bold mb-4">Líneas principales</h2>
            <ul className="space-y-3">
              {MAIN_PHONES.map((p) => (
                <li key={p.tel}>
                  <PhoneLink number={p.number} tel={p.tel} label={p.label} size="lg" />
                </li>
              ))}
            </ul>
          </div>

          {/* Líneas especializadas (con email del área si existe) */}
          <div className="p-6 bg-white border border-[color:var(--color-border)] rounded-xl">
            <h2 className="text-xl font-bold mb-4">Atención especializada</h2>
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
                    <div className="mt-1.5">
                      <EmailLink email={p.email} label={p.label} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Emails */}
          <div className="p-6 bg-white border border-[color:var(--color-border)] rounded-xl">
            <h2 className="text-xl font-bold mb-4">Correo electrónico</h2>
            <ul className="space-y-3">
              {EMAILS.map((e) => (
                <li key={e.email} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-[color:var(--color-border)] last:border-b-0 last:pb-0">
                  <span className="font-medium">{e.label}</span>
                  <EmailLink email={e.email} label={e.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Redes y servicios contratados */}
          <div className="p-6 bg-white border border-[color:var(--color-border)] rounded-xl">
            <h2 className="text-xl font-bold mb-4">Redes y servicios</h2>
            <ul className="space-y-4">
              {SERVICE_CONTACTS.map((s) => (
                <li
                  key={s.label}
                  className="pb-4 border-b border-[color:var(--color-border)] last:border-b-0 last:pb-0"
                >
                  <p className="text-sm font-semibold text-brand-700">{s.label}</p>
                  <p className="font-medium">{s.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    {s.phone && s.tel && (
                      <a href={`tel:${s.tel}`} className="text-brand-700 hover:underline">
                        {s.phone}
                      </a>
                    )}
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-brand-700 hover:underline"
                      >
                        Sitio web
                        <ArrowTopRightOnSquareIcon className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
