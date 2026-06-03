/**
 * Servicios destacados que el sitio actual muestra en homepage.
 * Datos verificados contra https://www.ospiqyp.org.ar/ (mayo 2026).
 * iconName matchea con un mapping de @heroicons/react en ServiceCards.tsx.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName:
    | "face-smile"
    | "identification"
    | "eye"
    | "user-group"
    | "document-text"
    | "beaker"
    | "shield-check"
    | "phone-arrow-up-right"
    | "map-pin"
    | "globe-alt"
    | "ticket"
    | "building-office-2";
};

export const SERVICES: Service[] = [
  {
    id: "odontologia",
    title: "Odontología",
    description: "Cobertura odontológica con red de prestadores en todo el país.",
    href: "/coberturas#odontologia",
    iconName: "face-smile",
  },
  {
    id: "credenciales",
    title: "Credenciales y Coseguros",
    description: "Solicitá tu credencial OSPIQYP para acceder a las prestaciones.",
    href: "/coberturas#credenciales",
    iconName: "identification",
  },
  {
    id: "opticas",
    title: "Red de Ópticas",
    description: "Cobertura para anteojos recetados y lentes de contacto.",
    href: "/coberturas#opticas",
    iconName: "eye",
  },
  {
    id: "discapacidad",
    title: "Discapacidad",
    description: "Programa integral de atención para personas con discapacidad.",
    href: "/coberturas#discapacidad",
    iconName: "user-group",
  },
  {
    id: "formularios",
    title: "Formularios",
    description: "Descargá los formularios para trámites y autorizaciones.",
    href: "/formularios",
    iconName: "document-text",
  },
  {
    id: "farmacias",
    title: "Red de Farmacias",
    description: "Acceso a medicamentos con cobertura en farmacias adheridas.",
    href: "/coberturas#farmacias",
    iconName: "beaker",
  },
  {
    id: "pmo",
    title: "Programa Médico Obligatorio",
    description: "Todas las prestaciones del PMO con red nacional de profesionales.",
    href: "/coberturas/pmo",
    iconName: "shield-check",
  },
  {
    id: "emergencias",
    title: "Emergencias ECCO",
    description: "Atención de emergencias médicas las 24 horas, los 365 días.",
    href: "/contacto",
    iconName: "phone-arrow-up-right",
  },
  {
    id: "delegaciones",
    title: "Delegaciones",
    description: "Más de 20 delegaciones para atenderte cerca de tu domicilio.",
    href: "/delegaciones",
    iconName: "map-pin",
  },
  {
    id: "prestadores",
    title: "Prestadores",
    description: "Médicos, centros médicos y hospitales de la red OSPIQYP.",
    href: "/prestadores",
    iconName: "building-office-2",
  },
  {
    id: "bonos",
    title: "Bonos On-line",
    description: "Gestioná tus bonos de consulta online de forma rápida.",
    href: "/coberturas#bonos",
    iconName: "ticket",
  },
  {
    id: "turismo",
    title: "Turismo y Vacaciones",
    description: "Beneficios turísticos a través de la Federación Química.",
    href: "https://federacionquimica.org.ar/turismo/",
    iconName: "globe-alt",
  },
];
