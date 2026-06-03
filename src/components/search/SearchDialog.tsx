"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { SEARCH_INDEX, FUSE_OPTIONS, type SearchItem, type SearchCategory } from "@/lib/search";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// El índice de Fuse no depende de props ni estado: se construye una sola vez a
// nivel de módulo en lugar de en cada montaje del diálogo.
const FUSE = new Fuse(SEARCH_INDEX, FUSE_OPTIONS);

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return FUSE.search(query.trim()).slice(0, 30);
  }, [query]);

  // Agrupar resultados por categoría
  const grouped = useMemo(() => {
    if (!results) return null;
    const map = new Map<SearchCategory, SearchItem[]>();
    for (const r of results) {
      const list = map.get(r.item.category) || [];
      list.push(r.item);
      map.set(r.item.category, list);
    }
    return Array.from(map.entries());
  }, [results]);

  function handleOpenChange(next: boolean) {
    if (!next) setQuery("");
    onOpenChange(next);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-[10%] -translate-x-1/2 z-50 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden mx-4 max-h-[80vh] flex flex-col">
          <Dialog.Title className="sr-only">Buscar en el sitio</Dialog.Title>
          <Dialog.Description className="sr-only">
            Buscador del sitio de OSPIQYP. Tipeá para encontrar servicios, formularios, delegaciones y más.
          </Dialog.Description>

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border)]">
            <MagnifyingGlassIcon className="size-5 text-[color:var(--color-fg-muted)] flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar servicios, formularios, delegaciones..."
              className="flex-1 bg-transparent outline-none text-base placeholder:text-[color:var(--color-fg-muted)]"
              autoFocus
              aria-label="Término de búsqueda"
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar buscador"
                className="p-1.5 rounded-md hover:bg-[color:var(--color-bg-soft)] transition-colors"
              >
                <XMarkIcon className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {!query.trim() && (
              <div className="px-4 py-8 text-center text-[color:var(--color-fg-muted)] text-sm">
                Empezá a tipear para buscar en el sitio.
                <br />
                <span className="text-xs">
                  Probá: &quot;credencial&quot;, &quot;Córdoba&quot;, &quot;discapacidad&quot;...
                </span>
              </div>
            )}

            {query.trim() && grouped && grouped.length === 0 && (
              <div className="px-4 py-8 text-center text-[color:var(--color-fg-muted)] text-sm">
                No encontramos resultados para <strong>&quot;{query}&quot;</strong>.
                <br />
                <span className="text-xs">Probá con otro término o navegá por las secciones desde el menú.</span>
              </div>
            )}

            {query.trim() && grouped && grouped.length > 0 && (
              <ul className="py-2">
                {grouped.map(([category, items]) => (
                  <li key={category}>
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                      {category}
                    </div>
                    <ul>
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={() => handleOpenChange(false)}
                            className="block px-4 py-2.5 hover:bg-brand-50 transition-colors"
                          >
                            <div className="font-medium text-[color:var(--color-fg)]">{item.title}</div>
                            <div className="text-xs text-[color:var(--color-fg-soft)] mt-0.5">
                              {item.description}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
