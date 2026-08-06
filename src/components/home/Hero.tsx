import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
      {/* Fondo generado con IA (Nano Banana Pro), responsive:
          - celular  -> versión vertical (4:5)
          - escritorio -> versión horizontal (16:9)
          Si todavía no existen, se ve el degradé azul como fallback. */}
      <Image
        src="/images/banners/hero-fondo-mobile.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center md:hidden"
      />
      <Image
        src="/images/banners/hero-fondo.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 hidden object-cover object-right md:block"
      />
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
            <Link
              href="/coberturas"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
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
