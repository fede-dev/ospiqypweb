import { useCallback, useMemo, useState } from "react";

interface FilteredList<T> {
  /** Texto crudo del input (lo que ve el usuario). */
  query: string;
  /** Setea la búsqueda y vuelve el paginado al principio. */
  setQuery: (value: string) => void;
  /** Volver el paginado al principio sin tocar la búsqueda (para los `<select>`). */
  resetPaging: () => void;
  /** Todo lo que pasa el filtro (sirve para el conteo). */
  filtered: T[];
  /** La tajada visible: lo único que hay que renderizar. */
  shown: T[];
  /** Hay más resultados de los que se están mostrando. */
  hasMore: boolean;
  /** Cuántos quedan sin mostrar. */
  remaining: number;
  /** Suma una página más. */
  showMore: () => void;
}

/**
 * Estado compartido de "buscar + paginar" de los listados filtrables.
 * CatalogTable y ProvidersTable tenían la misma máquina de estados duplicada
 * (query, visible, PAGE_SIZE, reset del paginado cuando cambia el filtro).
 *
 * NO decide QUÉ entra: eso lo aporta el llamador con `matches`, porque cada
 * listado busca en campos distintos y tiene su propia cantidad de `<select>`.
 * Tampoco decide cómo se renderizan las filas — una tabla es un `<table>` y la
 * otra un grid de tarjetas, y unificar eso costaría más de lo que ahorra.
 *
 * `matches` recibe la query YA normalizada (trim + minúsculas) para que cada
 * llamador no repita esa normalización (ni se olvide de hacerla).
 *
 * IMPORTANTE: `matches` tiene que venir envuelto en `useCallback` con los
 * filtros como dependencias. De eso depende que el `useMemo` del filtrado
 * realmente memoice: si la función se recrea en cada render, el catálogo de
 * miles de filas se recorre de nuevo cada vez.
 */
export function useFilteredList<T>(
  items: readonly T[],
  matches: (item: T, query: string) => boolean,
  pageSize: number,
): FilteredList<T> {
  const [query, setQueryState] = useState("");
  const [visible, setVisible] = useState(pageSize);

  const resetPaging = useCallback(() => setVisible(pageSize), [pageSize]);

  const setQuery = useCallback(
    (value: string) => {
      setQueryState(value);
      // Escribir en el buscador (o limpiarlo) siempre reinicia el paginado:
      // si no, tras un "Ver más" la búsqueda nueva arrancaría mostrando de más.
      setVisible(pageSize);
    },
    [pageSize],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => matches(item, q));
  }, [items, matches, query]);

  const showMore = useCallback(
    () => setVisible((v) => v + pageSize),
    [pageSize],
  );

  return {
    query,
    setQuery,
    resetPaging,
    filtered,
    shown: filtered.slice(0, visible),
    hasMore: visible < filtered.length,
    remaining: filtered.length - visible,
    showMore,
  };
}
