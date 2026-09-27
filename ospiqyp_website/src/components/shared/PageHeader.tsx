import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  /** Bajada de la página. ReactNode y no string por si alguna necesita un enlace inline. */
  description: ReactNode;
  /**
   * Clases extra para el bloque (en la práctica, el margen inferior: cada página
   * separa el encabezado de su contenido con `mb-10` o `mb-12`, y una no lleva nada).
   * Se concatena al `max-w-3xl` base en vez de exponer una prop `spacing` con un
   * mapa de valores: es la misma cantidad de código y no inventa un vocabulario nuevo.
   */
  className?: string;
}

/**
 * Encabezado de página: el par h1 + bajada que abren las nueve secciones internas.
 * Estaba copiado literal en cada `page.tsx`, así que cualquier ajuste tipográfico
 * obligaba a tocar nueve archivos (y a que ninguno se olvidara).
 *
 * Deliberadamente NO incluye el `<div className="container ...">` que envuelve la
 * página entera: ese wrapper contiene TODO el contenido, no sólo el encabezado.
 * Absorberlo obligaría a pasar la página completa como `children` — un componente
 * llamado "header" que en realidad es el layout de la página. El container se
 * queda donde está.
 */
export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={className ? `max-w-3xl ${className}` : "max-w-3xl"}>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
