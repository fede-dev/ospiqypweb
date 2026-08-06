import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

// `.mts` para que Vite lo cargue como ESM nativo (evita el warning de
// configLoader) sin tener que poner "type": "module" en el package.json,
// que rompería la config de Next y PostCSS.
const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vitest, no Jest: corre TS y ESM nativo sin configurar transforms. Con
 * Next 16 + React 19 + Tailwind v4, la config de transform de Jest es
 * justo lo que se rompe en cada bump de versión.
 *
 * Dos entornos conviven en la misma suite:
 *  - `tests/build-output.test.ts` y `tests/content.test.ts` son Node puro
 *    (leen el filesystem / módulos de datos): no necesitan DOM.
 *  - `tests/components/*` necesitan jsdom.
 * En vez de dos proyectos, usamos jsdom global (barato) y listo.
 */
export default defineConfig({
  resolve: {
    // Mismo alias que tsconfig.json → los tests importan igual que src/.
    alias: { "@": path.resolve(dirname, "src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.tsx"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      include: ["src/components/**", "src/lib/**", "src/content/**"],
      reporter: ["text", "html"],
    },
  },
});
