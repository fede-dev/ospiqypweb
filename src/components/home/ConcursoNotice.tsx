import { ArrowDownTrayIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

/**
 * Aviso institucional debajo del banner principal del home: apertura de
 * concurso preventivo, con descarga del PDF correspondiente.
 */
export function ConcursoNotice() {
  return (
    <section
      aria-labelledby="concurso-title"
      className="border-b border-brand-100 bg-brand-50"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <DocumentTextIcon
              className="size-7 flex-shrink-0 text-brand-700"
              aria-hidden="true"
            />
            <h2
              id="concurso-title"
              className="text-xl md:text-2xl font-bold text-brand-800 leading-snug"
            >
              La Obra Social ha solicitado la apertura de un concurso preventivo.
            </h2>
          </div>
          <a
            href="/pdfs/concurso-preventivo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            <ArrowDownTrayIcon className="size-5" aria-hidden="true" />
            Descargar PDF
          </a>
        </div>
      </div>
    </section>
  );
}
