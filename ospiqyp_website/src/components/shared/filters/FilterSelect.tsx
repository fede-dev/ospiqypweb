interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  /** Texto de la opción "sin filtro" ("Todas las zonas", "Todas las categorías"). */
  allLabel: string;
  options: readonly string[];
  /** Texto para lectores de pantalla — el select no tiene `<label>` visible. */
  label: string;
  /** Clases extra: el filtro del catálogo va solo y se capea con `md:max-w-xs`. */
  className?: string;
}

const BASE_CLASS =
  "rounded-lg border border-[color:var(--color-border)] bg-white py-2.5 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

/**
 * `<select>` de filtro con su opción "todas" al principio. Idéntico en las tres
 * apariciones (zona y categoría de prestadores, categoría del catálogo).
 */
export function FilterSelect({
  value,
  onValueChange,
  allLabel,
  options,
  label,
  className,
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      aria-label={label}
      className={className ? `${BASE_CLASS} ${className}` : BASE_CLASS}
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
