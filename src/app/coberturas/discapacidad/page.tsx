import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ClockIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { FORMS } from "@/content/forms";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/coberturas/discapacidad",
  title: "Programa Discapacidad",
  description:
    "Información para afiliados y prestadores del Programa de Discapacidad de OSPIQYP: requisitos, plazos de autorización, presentación de expedientes, fechas de liquidación y contactos.",
});

const REQUISITOS = [
  "El CUD (Certificado Único de Discapacidad) debe estar vigente según ANDIS (Agencia Nacional de Discapacidad).",
  "Solo se acepta documentación en formato digital, escaneada en PDF. No se aceptan fotos.",
  "El expediente debe presentarse completo y ordenado según el instructivo. No se aceptan presentaciones parciales.",
  "No se aceptan prestaciones retroactivas: las prestaciones se cubren a partir del momento de la autorización.",
];

const DISCAPACIDAD_FORMS = FORMS.filter((f) => f.category === "discapacidad");

export default function DiscapacidadPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Link
        href="/coberturas"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline mb-6"
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
        Volver a Coberturas
      </Link>

      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Programa Discapacidad</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          Programa integral para afiliados con discapacidad certificada, con
          cobertura al 100% según la Ley 24.901. A continuación, la información
          para afiliados y prestadores sobre requisitos, plazos y trámites.
        </p>
      </div>

      {/* Aviso instructivo 2026 */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-5 md:p-6">
        <DocumentCheckIcon className="size-6 flex-shrink-0 text-brand-700 mt-0.5" aria-hidden="true" />
        <div>
          <h2 className="font-bold text-brand-800 mb-1">
            Ya está disponible el Instructivo 2026
          </h2>
          <p className="text-sm text-[color:var(--color-fg-soft)]">
            Solicitalo por mail a{" "}
            <a
              href="mailto:autorizaciones@ospiqyp.org.ar"
              className="font-semibold text-brand-700 hover:underline"
            >
              autorizaciones@ospiqyp.org.ar
            </a>
            . El instructivo actualizado aún no está publicado en la web.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requisitos de presentación */}
        <section className="rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-brand-700">
            <ExclamationTriangleIcon className="size-6 flex-shrink-0" aria-hidden="true" />
            Requisitos importantes
          </h2>
          <ul className="space-y-3">
            {REQUISITOS.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircleIcon className="size-5 flex-shrink-0 text-accent-600 mt-0.5" aria-hidden="true" />
                <span className="text-[color:var(--color-fg-soft)]">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Plazos y liquidación */}
        <section className="rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-brand-700">Plazos</h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <ClockIcon className="size-6 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold">Autorizaciones</p>
                <p className="text-sm text-[color:var(--color-fg-soft)]">
                  Las autorizaciones tardan entre 20 y 25 días hábiles.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CalendarDaysIcon className="size-6 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold">Liquidación de prestaciones</p>
                <p className="text-sm text-[color:var(--color-fg-soft)]">
                  La liquidación se efectúa aproximadamente los días 20 de cada mes.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Contactos */}
      <section className="mt-6 rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-brand-700">Contactos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-start gap-3">
            <PhoneIcon className="size-5 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-fg-muted)]">
                Teléfono
              </p>
              <a href="tel:+541152752200" className="text-brand-700 hover:underline">
                (011) 5275-2200
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EnvelopeIcon className="size-5 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-fg-muted)]">
                Consultas médicas o estudios
              </p>
              <a
                href="mailto:autorizaciones@ospiqyp.org.ar"
                className="text-brand-700 hover:underline break-all"
              >
                autorizaciones@ospiqyp.org.ar
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EnvelopeIcon className="size-5 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-fg-muted)]">
                Afiliación
              </p>
              <a
                href="mailto:afiliaciones@ospiqyp.org.ar"
                className="text-brand-700 hover:underline break-all"
              >
                afiliaciones@ospiqyp.org.ar
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EnvelopeIcon className="size-5 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-fg-muted)]">
                Medicación
              </p>
              <a
                href="mailto:medicacionospiqyp@gmail.com"
                className="text-brand-700 hover:underline break-all"
              >
                medicacionospiqyp@gmail.com
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-[color:var(--color-fg-muted)]">
          Sector Discapacidad — OSPIQYP Central, México 1474, CABA.
        </p>
      </section>

      {/* Formularios e instructivos */}
      {DISCAPACIDAD_FORMS.length > 0 && (
        <section className="mt-6 rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-brand-700">
            Formularios e instructivos
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DISCAPACIDAD_FORMS.map((f) => (
              <li key={f.id}>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] p-4 hover:border-brand-600 hover:shadow-md transition-all"
                >
                  <ArrowDownTrayIcon className="size-5 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold group-hover:text-brand-700 transition-colors">
                      {f.title}
                    </p>
                    <p className="text-sm text-[color:var(--color-fg-soft)]">
                      {f.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
