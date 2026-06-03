/**
 * Coberturas de OSPIQYP basadas en el PMO (Programa Médico Obligatorio).
 * Contenido placeholder estructurado; el cliente edita después con texto
 * legal definitivo.
 */

export type CoverageSection = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  /** Enlace a la página/sección con más información. */
  href: string;
  /** Texto del enlace (default: "Más información"). */
  linkLabel?: string;
};

export const COVERAGE: CoverageSection[] = [
  {
    id: "pmo",
    title: "Programa Médico Obligatorio (PMO)",
    summary:
      "Todas las prestaciones obligatorias establecidas por la Superintendencia de Servicios de Salud están cubiertas por OSPIQYP.",
    bullets: [
      "31 especialidades médicas",
      "Cobertura maternidad 100%",
      "Internación y cirugías",
      "Estudios complementarios",
      "Medicamentos según vademécum",
    ],
    href: "/programa-medico-obligatorio",
    linkLabel: "Ver prestaciones del PMO",
  },
  {
    id: "odontologia",
    title: "Odontología",
    summary:
      "Red de odontólogos en todo el país. Algunas prácticas con copago según convenio.",
    bullets: [
      "Consulta y diagnóstico",
      "Limpieza y profilaxis",
      "Tratamientos de conducto",
      "Prótesis con cobertura parcial",
      "Ortodoncia (cobertura por edad)",
    ],
    href: "/programa-medico-obligatorio#odontologia",
    linkLabel: "Ver cobertura odontológica",
  },
  {
    id: "discapacidad",
    title: "Programa Discapacidad",
    summary:
      "Programa integral para afiliados con discapacidad certificada. Cobertura al 100% según Ley 24.901.",
    bullets: [
      "Centros de día",
      "Transporte especial",
      "Rehabilitación integral",
      "Educación terapéutica",
      "Insumos y prótesis",
    ],
    href: "/coberturas/discapacidad",
    linkLabel: "Ver información del programa",
  },
  {
    id: "credenciales",
    title: "Credenciales",
    summary:
      "Tu credencial OSPIQYP te identifica como afiliado. Es necesaria para acceder a todas las prestaciones.",
    bullets: [
      "Solicitar credencial física en sede",
      "Renovar credencial vencida",
      "Reportar pérdida o robo",
      "Credencial provisoria mientras se emite la definitiva",
    ],
    href: "/contacto",
    linkLabel: "Solicitar en Afiliaciones",
  },
  {
    id: "opticas",
    title: "Ópticas",
    summary:
      "Cobertura para anteojos recetados con tope anual. Red de ópticas adheridas en CABA, GBA e interior.",
    bullets: [
      "Anteojos recetados con tope anual",
      "Lentes de contacto (cobertura parcial)",
      "Cambio de cristales por receta",
    ],
    href: "/prestadores",
    linkLabel: "Ver red de ópticas",
  },
  {
    id: "farmacias",
    title: "Red de Farmacias",
    summary:
      "Convenio con red nacional de farmacias adheridas. Descuentos según vademécum y categoría del medicamento.",
    bullets: [
      "40% en medicamentos ambulatorios",
      "70% en tratamientos crónicos",
      "100% en cobertura PMO específica",
      "Vacunas calendario oficial 100%",
    ],
    href: "/prestadores",
    linkLabel: "Ver farmacias adheridas",
  },
];
