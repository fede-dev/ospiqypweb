import type { ReactNode } from "react";

interface LoadMoreButtonProps {
  onClick: () => void;
  /** La etiqueta la pone cada listado: "Ver más prestaciones (N restantes)". */
  children: ReactNode;
}

/**
 * Botón "Ver más" del paginado incremental. Lo duplicado entre los dos listados
 * era el envoltorio centrado y el estilo del botón, no el texto.
 *
 * La etiqueta llega por `children` en vez de por props `label` + `remaining`
 * justamente para no tocar el markup: el texto actual es "Ver más X (" + número
 * + " restantes)", tres nodos que React serializa con separadores propios.
 * Armarlo acá como un único string cambiaría el HTML del export estático.
 */
export function LoadMoreButton({ onClick, children }: LoadMoreButtonProps) {
  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
      >
        {children}
      </button>
    </div>
  );
}
