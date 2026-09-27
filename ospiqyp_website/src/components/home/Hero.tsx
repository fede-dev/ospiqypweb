import Link from "next/link";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
      {/* Fondo generado con IA (Nano Banana Pro), responsive:
          - celular  -> versión vertical (4:5), encuadre centrado
          - escritorio -> versión horizontal (16:9), encuadre a la derecha
          Si todavía no existen, se ve el degradé azul como fallback.

          POR QUÉ <picture> + <img> NATIVO Y NO DOS <Image> CON priority:
          antes había dos next/image (una `md:hidden`, otra `hidden md:block`),
          las dos con `priority`. `priority` emite un <link rel="preload"> en el
          <head>, pero quién se ve lo decide el CSS: el navegador bajaba LAS DOS
          (~157 KB) en cada visita y descartaba una, con el warning de consola
          "preloaded using link preload but not used". Con <picture> la elección
          la hace el propio navegador por `media` ANTES de pedir nada, así que se
          descarga una sola imagen. Y como el proyecto usa `output: "export"` con
          `images.unoptimized: true`, next/image acá no optimizaba nada: sólo
          aportaba el posicionamiento de `fill`, que se replica con
          `absolute inset-0 size-full object-cover` (idéntico CSS, sin CLS).
          Sigue siendo carga prioritaria: el preload scanner la descubre apenas
          parsea el HTML (es lo primero del <body>) y `fetchPriority="high"` la
          pone al tope de la cola, que es lo que hace falta para el LCP.

          El `media` del <source> es min-width (mobile-first) y en `rem` para
          calcar el breakpoint `md:` de Tailwind v4 (48rem) — si el usuario
          agranda la tipografía del navegador, imagen y CSS siguen coincidiendo.
          El <img> de fallback apunta a la versión mobile: es la más liviana y la
          que usa el navegador viejo que ignore <source>. */}
      <picture className="contents">
        <source
          media="(min-width: 48rem)"
          srcSet="/images/banners/hero-fondo.webp"
        />
        {/* <img> nativo a propósito: next/image no permite anidar <source>, y
            con `images.unoptimized: true` no aporta optimización. No hace falta
            desactivar `@next/next/no-img-element` porque la regla ya exceptúa
            los <img> que viven adentro de un <picture>. */}
        <img
          src="/images/banners/hero-fondo-mobile.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-center md:object-right"
        />
      </picture>
      {/* Degradé para legibilidad del texto blanco. En celular es vertical
          (cubre todo el ancho); en escritorio es lateral (más oscuro a la izquierda). */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/95 via-brand-900/75 to-brand-900/40 md:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-brand-900/90 via-brand-800/70 to-brand-900/20 md:block" />

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6">
            <ShieldCheckIcon className="size-4" aria-hidden="true" />
            <span>Tu salud es nuestro compromiso</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Obra Social del Personal de Industrias Químicas y Petroquímicas
          </h1>
          <p className="text-lg md:text-xl text-brand-100 leading-relaxed mb-8 max-w-2xl">
            Cobertura médica integral, red nacional de prestadores y atención
            personalizada para vos y tu familia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* accent-600 y no accent-500: el 500 (#43a047) con texto blanco da
                3.3:1 y no llega al 4.5:1 de WCAG AA — lo marcó Lighthouse sobre
                producción. El 600 (#2e7d32) da 5.13:1 y mantiene el mismo
                lenguaje visual (verde que se oscurece al pasar el mouse). */}
            <Link
              href="/coberturas"
              className="inline-flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Ver coberturas
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/30"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
