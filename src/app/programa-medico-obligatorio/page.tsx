import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Accordion, type AccordionItemData } from "@/components/shared/Accordion";
import { CatalogTable } from "@/components/shared/CatalogTable";
import {
  PMO_INTRO,
  PMO_PRESTACIONES,
  PMO_NORMATIVA,
  PMO_NORMATIVA_INTRO,
  type PmoBlock,
} from "@/content/pmo";
import {
  PMO_CATALOGO,
  PMO_CATALOGO_CATEGORIAS,
  CATALOGO_INTRO,
} from "@/content/pmo-catalogo";

export const metadata: Metadata = {
  title: "Programa Médico Obligatorio (PMO)",
  description:
    "Programa Médico Obligatorio (PMO/PMOE) de OSPIQYP: prestaciones esenciales por subsección (atención primaria, plan materno infantil, internación, salud mental, medicamentos y más), catálogo de prácticas buscable y normativa de referencia.",
};

function Blocks({ blocks }: { blocks: PmoBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "subheading") {
          return (
            <h3 key={i} className="text-lg font-bold text-brand-700">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircleIcon
                    className="size-5 flex-shrink-0 text-accent-600 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[color:var(--color-fg-soft)]">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[color:var(--color-fg-soft)] leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function ProgramaMedicoObligatorioPage() {
  const normativaItems: AccordionItemData[] = PMO_NORMATIVA.map((norma) => ({
    id: norma.id,
    trigger: norma.heading,
    content: (
      <div className="space-y-3">
        {norma.paragraphs.map((p, i) => (
          <p key={i} className="text-[color:var(--color-fg-soft)] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    ),
  }));

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Encabezado */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Programa Médico Obligatorio (PMO)
        </h1>
        <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
          {PMO_INTRO}
        </p>
      </div>

      {/* Índice de subsecciones */}
      <nav
        aria-label="Secciones del PMO"
        className="mb-12 rounded-xl border border-brand-100 bg-brand-50 p-5 md:p-6"
      >
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-800">
          Contenido de esta página
        </h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PMO_PRESTACIONES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm font-medium text-brand-700 hover:underline"
              >
                {s.title}
              </a>
            </li>
          ))}
          <li>
            <a href="#catalogo" className="text-sm font-medium text-brand-700 hover:underline">
              Catálogo de prestaciones (Anexo II)
            </a>
          </li>
          <li>
            <a href="#normativa" className="text-sm font-medium text-brand-700 hover:underline">
              Normativa de referencia
            </a>
          </li>
        </ul>
      </nav>

      {/* Prestaciones (Anexo I) */}
      <section aria-labelledby="prestaciones-title" className="mb-16">
        <h2
          id="prestaciones-title"
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Prestaciones cubiertas
        </h2>
        <p className="max-w-3xl text-[color:var(--color-fg-soft)] mb-8 leading-relaxed">
          Conjunto de prestaciones básicas esenciales garantizadas por OSPIQYP según el
          Anexo I del Programa Médico Obligatorio de Emergencia (PMOE).
        </p>

        <div className="space-y-6">
          {PMO_PRESTACIONES.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-brand-700">{section.title}</h3>
                {section.tag && (
                  <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                    {section.tag}
                  </span>
                )}
              </div>
              <Blocks blocks={section.blocks} />
            </article>
          ))}
        </div>
      </section>

      {/* Catálogo de prestaciones (Anexo II) */}
      <section id="catalogo" className="mb-16 scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Catálogo de prestaciones (Anexo II)
        </h2>
        <div className="max-w-3xl space-y-3 mb-6">
          {CATALOGO_INTRO.map((p, i) => (
            <p key={i} className="text-[color:var(--color-fg-soft)] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <CatalogTable items={PMO_CATALOGO} categories={PMO_CATALOGO_CATEGORIAS} />
      </section>

      {/* Normativa (Decreto 2724/2002) */}
      <section id="normativa" className="scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Normativa de referencia</h2>
        <p className="max-w-3xl text-[color:var(--color-fg-soft)] mb-6 leading-relaxed">
          {PMO_NORMATIVA_INTRO}
        </p>
        <Accordion items={normativaItems} multiple />
      </section>

      {/* Volver a Coberturas */}
      <div className="mt-12">
        <Link
          href="/coberturas"
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          ← Volver a Coberturas
        </Link>
      </div>
    </div>
  );
}
