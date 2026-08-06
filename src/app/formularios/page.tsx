import type { Metadata } from "next";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import {
  FORMS,
  FORM_CATEGORY_LABELS,
  type DownloadForm,
  type FormCategory,
} from "@/content/forms";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/formularios",
  title: "Formularios",
  description:
    "Descargá los formularios y documentos de OSPIQYP: afiliación, programas de crónicos, discapacidad y empresas. Todos en formato PDF.",
});

export default function FormulariosPage() {
  // Agrupar los formularios por categoría, respetando el orden de las etiquetas.
  const grouped = (Object.keys(FORM_CATEGORY_LABELS) as FormCategory[])
    .map((category) => ({
      category,
      label: FORM_CATEGORY_LABELS[category],
      items: FORMS.filter((f) => f.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <PageHeader
        title="Formularios"
        description="Descargá los formularios y documentos que necesitás para tus trámites. Todos los archivos están en formato PDF."
        className="mb-12"
      />

      <div className="space-y-12">
        {grouped.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="text-2xl font-bold text-brand-700 mb-5"
            >
              {group.label}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((form: DownloadForm) => (
                <li key={form.id}>
                  <a
                    href={form.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-xl border border-[color:var(--color-border)] bg-white p-6 hover:border-brand-600 hover:shadow-md transition-all"
                  >
                    <DocumentArrowDownIcon
                      className="size-8 text-brand-600 mb-3"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold mb-2 group-hover:text-brand-700 transition-colors">
                      {form.title}
                    </h3>
                    <p className="text-[color:var(--color-fg-soft)] text-sm flex-1">
                      {form.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
