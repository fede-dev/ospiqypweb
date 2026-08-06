"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
 */
export function CatalogTable({ items, categories }: CatalogTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category && item.category !== category) return false;
      if (!q) return true;
      return (
        item.code.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.note?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, query, category]);

  const shown = filtered.slice(0, visible);

  function resetVisible() {
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetVisible();
            }}
            placeholder="Buscar por código o práctica…"
            aria-label="Buscar en el catálogo de prestaciones"
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                resetVisible();
              }}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-bg-soft)]"
            >
              <XMarkIcon className="size-5" />
            </button>
          )}
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            resetVisible();
          }}
          aria-label="Filtrar por categoría"
          className="rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 md:max-w-xs"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Conteo */}
      <p className="mt-3 text-sm text-[color:var(--color-fg-muted)]">
        {filtered.length === 0
          ? "No se encontraron prestaciones para tu búsqueda."
          : `${filtered.length} ${filtered.length === 1 ? "prestación" : "prestaciones"} ${
              query || category ? "encontrada" + (filtered.length === 1 ? "" : "s") : "en total"
            }`}
      </p>

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
      {visible < filtered.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
          >
            Ver más prestaciones ({filtered.length - visible} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
