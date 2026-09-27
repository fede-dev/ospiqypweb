import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  value: string;
  /** Se dispara tanto al tipear como al tocar la X: un solo camino para limpiar. */
  onValueChange: (value: string) => void;
  placeholder: string;
  /** Texto para lectores de pantalla — el input no tiene `<label>` visible. */
  label: string;
}

/**
 * Buscador con lupa y botón para limpiar. Estaba clonado carácter por carácter
 * en CatalogTable y ProvidersTable; lo único que cambiaba era el placeholder y
 * el aria-label.
 *
 * Sin "use client": lo importan sólo componentes que ya son client. Marcarlo
 * crearía un client boundary de más sin ningún beneficio.
 */
export function SearchInput({
  value,
  onValueChange,
  placeholder,
  label,
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-bg-soft)]"
        >
          <XMarkIcon className="size-5" />
        </button>
      )}
    </div>
  );
}
