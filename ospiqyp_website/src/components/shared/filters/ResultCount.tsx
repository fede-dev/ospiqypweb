interface ResultCountProps {
  count: number;
  /**
   * El sustantivo va explícito en singular y plural: en castellano no alcanza
   * con pegarle una "s" ("prestación" → "prestaciones" cambia la tilde, y
   * "prestador" → "prestadores" agrega "es").
   */
  singular: string;
  plural: string;
  /** Cola opcional después del sustantivo ("en total", "encontradas"). */
  suffix?: string;
}

/**
 * Línea de conteo de resultados que va arriba de cada listado filtrable.
 *
 * El texto se arma como UN solo string y se renderiza como una sola expresión
 * a propósito: componerlo con varios nodos JSX haría que React intercale
 * separadores `<!-- -->` en el HTML del export estático, cambiando el markup
 * publicado sin necesidad.
 */
export function ResultCount({
  count,
  singular,
  plural,
  suffix,
}: ResultCountProps) {
  const text =
    count === 0
      ? `No se encontraron ${plural} para tu búsqueda.`
      : `${count} ${count === 1 ? singular : plural}${suffix ? ` ${suffix}` : ""}`;

  return (
    <p className="mt-3 text-sm text-[color:var(--color-fg-muted)]">{text}</p>
  );
}
