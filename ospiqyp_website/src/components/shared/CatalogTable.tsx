"use client";

import { useCallback, useState } from "react";
import { FilterSelect } from "@/components/shared/filters/FilterSelect";
import { LoadMoreButton } from "@/components/shared/filters/LoadMoreButton";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { SearchInput } from "@/components/shared/filters/SearchInput";
import { useFilteredList } from "@/components/shared/filters/useFilteredList";
import type { CatalogoItem } from "@/content/pmo-catalogo";

interface CatalogTableProps {
  items: CatalogoItem[];
  categories: string[];
}

const PAGE_SIZE = 60;

/**
 * Tabla buscable y filtrable del catálogo de prestaciones (Anexo II del PMOE).
 * Filtra por texto (código o descripción) y por categoría, con paginado simple
 * para no renderizar miles de filas a la vez.
 *
 * La mecánica de buscar/paginar vive en `useFilteredList` y los controles en
 * `shared/filters`; acá queda sólo lo propio del catálogo: qué campos se buscan
 * y cómo se dibuja cada fila del `<table>`.
 */
export function CatalogTable({ items, categories }: CatalogTableProps) {
  const [category, setCategory] = useState<string>("");

  // useCallback (y no una función suelta) para que el filtrado de miles de
  // filas se rehaga sólo cuando cambia la categoría o el texto buscado.
  const matches = useCallback(
    (item: CatalogoItem, q: string) => {
      if (category && item.category !== category) return false;
      if (!q) return true;
      return (
        item.code.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.note?.toLowerCase().includes(q) ?? false)
      );
    },
    [category],
  );

  const { query, setQuery, resetPaging, filtered, shown, hasMore, remaining, showMore } =
    useFilteredList(items, matches, PAGE_SIZE);

  const isFiltering = Boolean(query || category);

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder="Buscar por código o práctica…"
          label="Buscar en el catálogo de prestaciones"
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
          className="md:max-w-xs"
        />
      </div>

      {/* Conteo */}
      <ResultCount
        count={filtered.length}
        singular="prestación"
        plural="prestaciones"
        suffix={
          isFiltering
            ? filtered.length === 1
              ? "encontrada"
              : "encontradas"
            : "en total"
        }
      />

      {/* Tabla */}
      {filtered.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50 text-left text-brand-800">
                <th scope="col" className="w-28 px-4 py-3 font-semibold">
                  Código
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Práctica
                </th>
                <th scope="col" className="hidden px-4 py-3 font-semibold md:table-cell">
                  Categoría
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((item) => (
                <tr
                  key={item.code}
                  className="border-t border-[color:var(--color-border)] align-top"
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-brand-700">
                    {item.code}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[color:var(--color-fg)]">{item.description}</span>
                    {item.note && (
                      <span className="mt-1 block text-xs text-[color:var(--color-fg-muted)]">
                        {item.note}
                      </span>
                    )}
                    <span className="mt-1 block text-xs text-[color:var(--color-fg-muted)] md:hidden">
                      {item.category}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-[color:var(--color-fg-soft)] md:table-cell">
                    {item.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Ver más */}
      {hasMore && (
        <LoadMoreButton onClick={showMore}>
          Ver más prestaciones ({remaining} restantes)
        </LoadMoreButton>
      )}
    </div>
  );
}
