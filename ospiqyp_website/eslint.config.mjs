import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reporte HTML de `npm run test:coverage`: es código generado por v8/istanbul.
    "coverage/**",
    // Worktrees de agentes: son checkouts completos del propio repo, así que
    // sin esto eslint se lintea a sí mismo N veces, incluido el out/ de cada
    // copia (miles de "errores" en JS minificado que no son de nadie).
    ".claude/**",
  ]),
]);

export default eslintConfig;
