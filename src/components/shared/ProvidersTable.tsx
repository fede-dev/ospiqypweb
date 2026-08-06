"use client";

import { useCallback, useState } from "react";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FilterSelect } from "@/components/shared/filters/FilterSelect";
import { LoadMoreButton } from "@/components/shared/filters/LoadMoreButton";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { SearchInput } from "@/components/shared/filters/SearchInput";
import { useFilteredList } from "@/components/shared/filters/useFilteredList";
import type {
  Provider,
  ProviderCategory,
  ProviderZone,
} from "@/content/providers";

interface ProvidersTableProps {
  items: Provider[];
  zones: ProviderZone[];
  categories: ProviderCategory[];
}

const PAGE_SIZE = 40;

/**
 * Listado de prestadores buscable y filtrable por zona y categoría.
 * Pensado para la cartilla (clínicas, diagnóstico, farmacias, ópticas).
 *
 * Comparte con CatalogTable el estado de buscar/paginar (`useFilteredList`) y
 * los controles, pero renderiza tarjetas en grid en vez de una tabla: por eso
 * cada uno sigue siendo dueño de su markup.
 */
export function ProvidersTable({ items, zones, categories }: ProvidersTableProps) {
  const [zone, setZone] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Ojo: la búsqueda también mira `specialties`, para que "endodoncia"
  // encuentre al odontólogo aunque no lo diga el nombre ni la dirección.
  const matches = useCallback(
    (p: Provider, q: string) => {
      if (zone && p.zone !== zone) return false;
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.locality?.toLowerCase().includes(q) ?? false) ||
        (p.address?.toLowerCase().includes(q) ?? false) ||
        (p.specialties?.some((s) => s.toLowerCase().includes(q)) ?? false)
      );
    },
    [zone, category],
  );

  const { query, setQuery, resetPaging, filtered, shown, hasMore, remaining, showMore } =
    useFilteredList(items, matches, PAGE_SIZE);

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Buscar por nombre, localidad o dirección…"
          label="Buscar prestador"
        />

        <FilterSelect
          value={zone}
          onValueChange={(value) => {
            setZone(value);
            resetPaging();
          }}
          allLabel="Todas las zonas"
          options={zones}
          label="Filtrar por zona"
        />

        <FilterSelect
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            resetPaging();
          }}
          allLabel="Todas las categorías"
          options={categories}
          label="Filtrar por categoría"
        />
      </div>

      <ResultCount count={filtered.length} singular="prestador" plural="prestadores" />

      {/* Tarjetas */}
      {filtered.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((p, i) => (
            <li
              key={`${p.name}-${p.address ?? i}`}
              className="flex flex-col rounded-xl border border-[color:var(--color-border)] bg-white p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {p.category}
                </span>
                <span className="text-xs text-[color:var(--color-fg-muted)]">
                  {p.zone}
                  {p.locality ? ` · ${p.locality}` : ""}
                </span>
              </div>
              <h3 className="font-semibold text-[color:var(--color-fg)]">{p.name}</h3>
              {p.specialties && p.specialties.length > 0 && (
                <p className="mt-0.5 text-sm text-[color:var(--color-fg-soft)]">
                  {p.specialties.join(" · ")}
                </p>
              )}
              {p.address && (
                <p className="mt-1 flex items-start gap-1.5 text-sm text-[color:var(--color-fg-soft)]">
                  <MapPinIcon className="size-4 flex-shrink-0 text-brand-600 mt-0.5" aria-hidden="true" />
                  {p.address}
                </p>
              )}
              {p.phone && (
                <a
                  href={`tel:${p.phone.replace(/[^\d+]/g, "").split("/")[0]}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-brand-700 hover:underline"
                >
                  <PhoneIcon className="size-4 flex-shrink-0" aria-hidden="true" />
                  {p.phone}
                </a>
              )}
              {p.license && (
                <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
                  Mat. {p.license}
                </p>
              )}
              {p.note && (
                <p className="mt-2 text-xs text-[color:var(--color-fg-muted)]">{p.note}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <LoadMoreButton onClick={showMore}>
          Ver más prestadores ({remaining} restantes)
        </LoadMoreButton>
      )}
    </div>
  );
}
