import type { Metadata } from "next";
import { BuildingOffice2Icon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { LEADERSHIP } from "@/content/leadership";
import { ADDRESS, COMPANY_ENROLLMENT_EMAIL } from "@/content/contact";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/institucional",
  title: "Institucional",
  description:
    "Conocé OSPIQYP — Obra Social del Personal de Industrias Químicas y Petroquímicas. Nuestra historia, misión y comisión directiva.",
});

export default function InstitucionalPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Sin margen inferior: la sección siguiente ya trae su propio `mt-12 md:mt-16`. */}
      <PageHeader
        title="Institucional"
        description="OSPIQYP es la Obra Social del Personal de Industrias Químicas y Petroquímicas. Una organización sindical comprometida con la salud y el bienestar de sus afiliados y sus familias en toda la Argentina."
      />

      <section className="mt-12 md:mt-16 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Nuestra misión</h2>
        <p className="text-lg leading-relaxed text-[color:var(--color-fg-soft)] mb-4">
          Garantizar el acceso a una cobertura médica integral, oportuna y de
          calidad para todos nuestros afiliados, respondiendo a las necesidades
          de salud del personal de la industria química y petroquímica.
        </p>
        <p className="text-lg leading-relaxed text-[color:var(--color-fg-soft)]">
          Trabajamos en red con prestadores en todo el país para que la
          distancia no sea una barrera para el cuidado de tu salud.
        </p>
      </section>

      <section id="comision" className="mt-12 md:mt-16">
        <h2 className="text-3xl font-bold mb-8">Comisión Directiva</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((m) => (
            <li
              key={m.id}
              className="p-6 bg-white border border-[color:var(--color-border)] rounded-xl"
            >
              <div className="text-sm font-semibold uppercase tracking-wider text-brand-700 mb-2">
                {m.role}
              </div>
              <div className="text-xl font-semibold">{m.name}</div>
            </li>
          ))}
        </ul>
      </section>

      <section id="empresas" className="mt-12 md:mt-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <BuildingOffice2Icon className="size-8 text-brand-600" aria-hidden="true" />
          <h2 className="text-3xl font-bold">Para Empresas</h2>
        </div>
        <p className="text-lg leading-relaxed text-[color:var(--color-fg-soft)] mb-6">
          Para inscripciones o empadronamiento de empresas, comunicate por correo
          electrónico. Recibí información actualizada y la cartilla online.
        </p>
        <div className="p-6 bg-brand-50 border border-brand-100 rounded-xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-brand-700 mb-2">
            Inscripción de empresas
          </div>
          <a
            href={`mailto:${COMPANY_ENROLLMENT_EMAIL}`}
            className="inline-flex items-center gap-2 text-lg font-semibold text-brand-700 hover:underline"
          >
            <EnvelopeIcon className="size-5 flex-shrink-0" aria-hidden="true" />
            {COMPANY_ENROLLMENT_EMAIL}
          </a>
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-fg-soft)]">
          Horario de atención: {ADDRESS.hours}. {ADDRESS.street}, {ADDRESS.city} ({ADDRESS.postalCode}).
        </p>
      </section>
    </div>
  );
}
