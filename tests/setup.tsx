import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Testing Library no desmonta solo cuando `globals: true` sin auto-cleanup:
// sin esto, dos tests del mismo componente se pisan en el mismo document.
afterEach(() => cleanup());

/**
 * `next/link` en jsdom arrastra el router de Next (que no existe fuera de la
 * app). Como los tests de SearchDialog sólo verifican QUÉ se renderiza y a
 * dónde apunta, un <a> plano cumple el mismo contrato observable.
 */
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a
      href={href}
      onClick={(e) => {
        // jsdom no navega y avisa con "Not implemented: navigation to another
        // Document" en cada click. El <a> real tampoco navega (lo intercepta
        // el router de Next), así que cortar el default es lo fiel.
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  ),
}));

/**
 * Radix Dialog usa ResizeObserver y matchMedia; jsdom no los implementa.
 * Stubs mínimos para que el diálogo monte.
 */
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
