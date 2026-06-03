"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
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
 */
export function ProvidersTable({ items, zones, categories }: ProvidersTableProps) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      if (zone && p.zone !== zone) return false;
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.locality?.toLowerCase().includes(q) ?? false) ||
        (p.address?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, query, zone, category]);

  const shown = filtered.slice(0, visible);

  function reset() {
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Controles */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
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
              reset();
            }}
            placeholder="Buscar por nombre, localidad o dirección…"
            aria-label="Buscar prestador"
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                reset();
              }}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-bg-soft)]"
            >
              <XMarkIcon className="size-5" />
            </button>
          )}
        </div>

        <select
          value={zone}
          onChange={(e) => {
            setZone(e.target.value);
            reset();
          }}
          aria-label="Filtrar por zona"
          className="rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          <option value="">Todas las zonas</option>
          {zones.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            reset();
          }}
          aria-label="Filtrar por categoría"
          className="rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-sm text-[color:var(--color-fg-muted)]">
        {filtered.length === 0
          ? "No se encontraron prestadores para tu búsqueda."
          : `${filtered.length} prestador${filtered.length === 1 ? "" : "es"}`}
      </p>

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
              {p.note && (
                <p className="mt-2 text-xs text-[color:var(--color-fg-muted)]">{p.note}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
          >
            Ver más prestadores ({filtered.length - visible} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
