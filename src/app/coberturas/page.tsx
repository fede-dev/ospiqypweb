import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { COVERAGE } from "@/content/coverage";
import {
  COPAY_GROUPS,
  COPAYS_EFFECTIVE,
  COPAYS_INTRO,
  COPAYS_FOOTNOTE,
} from "@/content/copays";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/coberturas",
  title: "Coberturas",
  description:
    "Conocé todas las coberturas de OSPIQYP: PMO, odontología, discapacidad, ópticas, farmacia y más. Cobertura integral en toda la Argentina.",
});

export default function CoberturasPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <PageHeader
        title="Coberturas"
        description="OSPIQYP ofrece cobertura médica integral según el Programa Médico Obligatorio (PMO) más prestaciones específicas para nuestros afiliados."
        className="mb-12"
      />

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {COVERAGE.map((section) => (
          <li
            key={section.id}
            id={section.id}
            className="flex flex-col p-6 md:p-8 bg-white border border-[color:var(--color-border)] rounded-xl scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-3 text-brand-700">{section.title}</h2>
            <p className="text-[color:var(--color-fg-soft)] mb-5 leading-relaxed">
              {section.summary}
            </p>
            <ul className="space-y-2 mb-6">
              {section.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircleIcon className="size-5 text-accent-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={section.href}
              className="mt-auto inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:gap-2.5 transition-all"
            >
              {section.linkLabel ?? "Más información"}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl border border-brand-100 bg-brand-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-800 mb-1">
            Programa Médico Obligatorio (PMO)
          </h2>
          <p className="text-[color:var(--color-fg-soft)]">
            Conocé las prestaciones esenciales, el catálogo de prácticas y la
            normativa que rige el PMO.
          </p>
        </div>
        <Link
          href="/programa-medico-obligatorio"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Ver el PMO
        </Link>
      </div>

      <section id="bonos" className="mt-16 md:mt-24 scroll-mt-24">
        <div className="max-w-3xl mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">Bonos On-line y Coseguros</h2>
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
              Vigencia: {COPAYS_EFFECTIVE}
            </span>
          </div>
          <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
            {COPAYS_INTRO}
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 items-start">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-6">
            <h3 className="text-xl font-bold text-brand-800 mb-2">
              Imprimí tus bonos online
            </h3>
            <p className="text-[color:var(--color-fg-soft)] mb-5 leading-relaxed">
              Accedé al portal de autogestión para imprimir tus bonos de consulta,
              también los de tu grupo familiar. Seguí los pasos del instructivo.
            </p>
            <a
              href="http://osocial2.homelinux.org:58889/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="size-5" aria-hidden="true" />
              Ingresar a Bonos On-line
            </a>
          </div>

          <figure className="m-0">
            <a
              href="/images/instructivo-bonos.png"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ampliar instructivo de bonos online"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/instructivo-bonos.png"
                alt="Instructivo paso a paso para imprimir bonos online a través de la web, incluyendo los bonos del grupo familiar"
                width={749}
                height={1223}
                loading="lazy"
                className="w-full h-auto rounded-xl border border-[color:var(--color-border)]"
              />
            </a>
            <figcaption className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
              Instructivo: cómo imprimir tus bonos online. Tocá la imagen para ampliarla.
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {COPAY_GROUPS.map((group) => (
            <div
              key={group.id}
              className="bg-white border border-[color:var(--color-border)] rounded-xl overflow-hidden"
            >
              <h3 className="text-lg font-bold px-5 py-3 bg-brand-50 text-brand-800 border-b border-[color:var(--color-border)]">
                {group.title}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {group.rows.map((row) => (
                    <tr
                      key={row.concept}
                      className="border-b border-[color:var(--color-border)] last:border-0"
                    >
                      <th
                        scope="row"
                        className="text-left font-normal px-5 py-3 text-[color:var(--color-fg-soft)]"
                      >
                        {row.concept}
                      </th>
                      <td className="px-5 py-3 text-right whitespace-nowrap font-semibold">
                        {row.amount === "Exento" ? (
                          <span className="text-accent-600">Exento</span>
                        ) : (
                          row.amount
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm text-[color:var(--color-fg-muted)]">
          {COPAYS_FOOTNOTE}
        </p>
      </section>
    </div>
  );
}
