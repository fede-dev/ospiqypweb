/**
 * Formularios y documentos descargables.
 * `href` apunta a archivos reales en /public/pdfs/.
 */

export type FormCategory =
  | "afiliacion"
  | "cronicos"
  | "discapacidad"
  | "empresas"
  | "general";

export type DownloadForm = {
  id: string;
  title: string;
  description: string;
  category: FormCategory;
  href: string;
};

/** Etiquetas legibles de cada categoría, en el orden en que se muestran. */
export const FORM_CATEGORY_LABELS: Record<FormCategory, string> = {
  afiliacion: "Afiliación y trámites",
  cronicos: "Programas de crónicos",
  discapacidad: "Discapacidad",
  empresas: "Empresas",
  general: "Documentos generales",
};

export const FORMS: DownloadForm[] = [
  {
    id: "declaracion-jurada",
    title: "Declaración Jurada",
    description: "Formulario de declaración jurada para trámites de afiliación.",
    category: "afiliacion",
    href: "/pdfs/declaracion-jurada.pdf",
  },
  {
    id: "formulario-cronicidad",
    title: "Formulario de Cronicidad",
    description:
      "Formulario para la inscripción y cobertura de tratamientos crónicos.",
    category: "cronicos",
    href: "/pdfs/FORMULARIO-DE-CRONICIDAD.pdf",
  },
  {
    id: "formulario-anexo",
    title: "Formulario Anexo",
    description: "Anexo complementario para trámites de prestaciones.",
    category: "cronicos",
    href: "/pdfs/FORMULARIO-ANEXO.pdf",
  },
  {
    id: "documentacion-diabetes",
    title: "Documentación para Diabetes",
    description:
      "Documentación requerida para la cobertura del programa de diabetes.",
    category: "cronicos",
    href: "/pdfs/DOCUMENTACION-PARA-DIABETES.pdf",
  },
  {
    id: "ficha-relevamiento-dbt",
    title: "Ficha de Relevamiento – Diabetes (DBT)",
    description: "Ficha de relevamiento para pacientes del programa de diabetes.",
    category: "cronicos",
    href: "/pdfs/FICHA-RELEVAMIENTO-DBT.pdf",
  },
  {
    id: "planilla-hiv",
    title: "Planilla Ministerial HIV",
    description: "Planilla ministerial para la cobertura del programa de HIV.",
    category: "cronicos",
    href: "/pdfs/PLANILLA-MINISTERIAL-HIV.pdf",
  },
  {
    id: "instructivo-discapacidad",
    title: "Instructivo de Prestaciones por Discapacidad 2025",
    description:
      "Instructivo con los requisitos para tramitar prestaciones por discapacidad.",
    category: "discapacidad",
    href: "/pdfs/instructivo-prestaciones-por-discapacidad2025.pdf",
  },
  {
    id: "instructivo-2023-res-360",
    title: "Instructivo 2023 (Res. 360/22)",
    description:
      "Instructivo para prestaciones según la Resolución 360/22.",
    category: "discapacidad",
    href: "/pdfs/instructivo2023-res-360-22.pdf",
  },
  {
    id: "inscripcion-empresa",
    title: "Inscripción de empresa a la obra social",
    description:
      "Nota modelo para la inscripción de una empresa a la obra social.",
    category: "empresas",
    href: "/pdfs/Nota-modelo-de-inscripcin-de-empresa-a-obra-social.pdf",
  },
  {
    id: "resumen-cartilla-2026",
    title: "Resumen de Cartilla 2026",
    description:
      "Resumen de la cartilla de prestadores de OSPIQYP: clínicas, diagnóstico, farmacias y ópticas.",
    category: "general",
    href: "/pdfs/resumen-cartilla-2026.pdf",
  },
];
