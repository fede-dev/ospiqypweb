"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/institucional", label: "Institucional" },
  { href: "/coberturas", label: "Coberturas" },
  { href: "/programa-medico-obligatorio", label: "PMO" },
  { href: "/prestadores", label: "Prestadores" },
  { href: "/delegaciones", label: "Delegaciones" },
  { href: "/formularios", label: "Formularios" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[color:var(--color-border)] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label="OSPIQYP — Volver al inicio" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="OSPIQYP"
              // Las medidas REALES del archivo (93x43), no las que había antes
              // (150x60): con `w-auto` estos valores sólo fijan la proporción que
              // se reserva mientras carga, y declarar 2.5:1 sobre una imagen de
              // 2.16:1 reservaba una caja de ancho equivocado.
              width={93}
              height={43}
              priority
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-[color:var(--color-fg-soft)] hover:text-brand-700 hover:bg-brand-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <SearchTrigger />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md hover:bg-[color:var(--color-bg-soft)] transition-colors"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-[600px] py-4 border-t border-[color:var(--color-border)]" : "max-h-0",
          )}
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-[color:var(--color-fg-soft)] hover:text-brand-700 hover:bg-brand-50 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
