"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchDialog } from "./SearchDialog";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar en el sitio (atajo: Ctrl+K o Cmd+K)"
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[color:var(--color-fg-soft)] hover:text-brand-700 hover:bg-brand-50 transition-colors"
      >
        <MagnifyingGlassIcon className="size-5" aria-hidden="true" />
        <span className="hidden md:inline">Buscar</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-[color:var(--color-bg-soft)] border border-[color:var(--color-border)] rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
