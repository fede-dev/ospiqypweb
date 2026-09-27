import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700 mb-3">
        Error 404
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] max-w-md mx-auto mb-8">
        Lo sentimos, la página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <HomeIcon className="size-5" aria-hidden="true" />
        Volver al inicio
      </Link>
    </div>
  );
}
