import { SERVICES } from "@/content/services";
import { DELEGATIONS } from "@/content/delegations";
import { FORMS } from "@/content/forms";
import { COVERAGE } from "@/content/coverage";
import { LEADERSHIP } from "@/content/leadership";
import { PMO_PRESTACIONES } from "@/content/pmo";
import { PROVIDERS } from "@/content/providers";

export type SearchCategory =
  | "Servicios"
  | "Delegaciones"
  | "Formularios"
  | "Coberturas"
  | "Institucional"
  | "Prestadores";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords?: string[];
};

/**
 * Index estático para Fuse.js. Se genera en build time desde content/ y
 * se importa en el cliente para búsqueda fuzzy local.
 */
export const SEARCH_INDEX: SearchItem[] = [
  ...SERVICES.map<SearchItem>((s) => ({
    id: `service-${s.id}`,
    title: s.title,
    description: s.description,
    href: s.href,
    category: "Servicios",
  })),
  ...DELEGATIONS.map<SearchItem>((d) => ({
    id: `delegation-${d.id}`,
    title: d.city,
    description: `Delegación en ${d.province}`,
    href: `/delegaciones#${d.id}`,
    category: "Delegaciones",
    keywords: [d.province, d.city],
  })),
  ...FORMS.map<SearchItem>((f) => ({
    id: `form-${f.id}`,
    title: f.title,
    description: f.description,
    href: f.href,
    category: "Formularios",
  })),
  ...COVERAGE.map<SearchItem>((c) => ({
    id: `coverage-${c.id}`,
    title: c.title,
    description: c.summary,
    href: c.href,
    category: "Coberturas",
    keywords: c.bullets,
  })),
  ...LEADERSHIP.map<SearchItem>((l) => ({
    id: `leadership-${l.id}`,
    title: `${l.role}: ${l.name}`,
    description: "Comisión Directiva de OSPIQYP",
    href: "/institucional#comision",
    category: "Institucional",
  })),
  {
    id: "pmo",
    title: "Programa Médico Obligatorio (PMO)",
    description:
      "Prestaciones esenciales, catálogo de prácticas y normativa del PMO/PMOE garantizado por OSPIQYP.",
    href: "/programa-medico-obligatorio",
    category: "Coberturas",
    keywords: ["PMO", "PMOE", "prestaciones", "catálogo", "normativa"],
  },
  ...PMO_PRESTACIONES.map<SearchItem>((s) => ({
    id: `pmo-${s.id}`,
    title: s.title,
    description: "Prestación cubierta por el Programa Médico Obligatorio (PMO)",
    href: `/programa-medico-obligatorio#${s.id}`,
    category: "Coberturas",
    keywords: ["PMO", "prestación"],
  })),
  ...PROVIDERS.map<SearchItem>((p, i) => ({
    id: `provider-${i}`,
    title: p.name,
    description: [p.category, p.zone, p.locality, p.address]
      .filter(Boolean)
      .join(" · "),
    href: "/prestadores",
    category: "Prestadores",
    keywords: [p.category, p.zone, p.locality ?? "", p.name],
  })),
];

export const FUSE_OPTIONS = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "keywords", weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};
