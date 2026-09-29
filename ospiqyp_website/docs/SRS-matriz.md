# Matriz de trazabilidad — RF → tests

> 2026-09-29 · derivada de `docs/SRS.md` v0.1 y de `tests/` (93 `it()` en 7 archivos). No hay tests e2e
> ni de integración: el proyecto no tiene backend ni navegador real en la suite.
> ✅ cubierto · 🟡 parcial / indirecto · 🔴 sin test

| RF | Test (archivo · describe) | Estado |
|---|---|---|
| RF-PAG-001 | `tests/build-output.test.ts` · sitemap.xml | ✅ |
| RF-PAG-002 | `tests/build-output.test.ts` · páginas fantasma | ✅ |
| RF-PAG-003 | — | 🔴 |
| RF-PAG-004 | — | 🔴 |
| RF-PAG-005 | — | 🔴 |
| RF-BUS-001 | `tests/content.test.ts` · SEARCH_INDEX | ✅ |
| RF-BUS-002 | `tests/components/SearchDialog.test.tsx` | ✅ |
| RF-BUS-003 | `tests/components/SearchDialog.test.tsx` | ✅ |
| RF-BUS-004 | — | 🔴 |
| RF-CONT-001 | `tests/components/ProvidersTable.test.tsx` | ✅ |
| RF-CONT-002 | `tests/components/ProvidersTable.test.tsx`, `tests/components/CatalogTable.test.tsx` | ✅ |
| RF-CONT-003 | `tests/content.test.ts` · PROVIDERS | ✅ |
| RF-CONT-004 | `tests/components/CatalogTable.test.tsx` | ✅ |
| RF-CONT-005 | `tests/content.test.ts` · FORMS; `tests/build-output.test.ts` · assets | ✅ |
| RF-CONT-006 | `tests/content.test.ts` · DELEGATIONS | ✅ |
| RF-CONT-007 | `tests/content.test.ts` · links internos del contenido | ✅ |
| RF-CONT-008 | — | 🔴 |
| RF-CONT-009 | — | 🔴 |
| RF-TEL-001 | `tests/phone.test.ts`; `tests/components/ProvidersTable.test.tsx` | ✅ |
| RF-TEL-002 | — | 🔴 |
| RF-TEL-003 | `tests/content.test.ts` · teléfonos | ✅ |
| RF-TEL-004 | `tests/content.test.ts` · DELEGATIONS / links internos (emails) | ✅ |
| RF-SEO-001 | `tests/site.test.ts` · canonicalUrl; `tests/build-output.test.ts` · canonical | ✅ |
| RF-SEO-002 | `tests/site.test.ts` · pageMetadata; `tests/build-output.test.ts` · metadata básica | ✅ |
| RF-SEO-003 | `tests/build-output.test.ts` · sitemap.xml | ✅ |
| RF-SEO-004 | — | 🔴 |
| RF-SEO-005 | — | 🔴 |
| RF-BLD-001 | `tests/build-output.test.ts` (indirecto: lee `out/`) | 🟡 |
| RF-BLD-002 | `tests/build-output.test.ts` · assets referenciados | ✅ |
| RF-BLD-003 | `tests/build-output.test.ts` · http:// sin s | ✅ |
| RF-BLD-004 | — | 🔴 |
| RF-A11Y-001 | `tests/build-output.test.ts` · metadata básica (lang) | ✅ |
| RF-A11Y-002 | — | 🔴 |
| RF-A11Y-003 | — | 🔴 |
| RF-A11Y-004 | — (requiere navegador real) | 🔴 |
| RF-DEP-001 | n/a (procedimiento; `npm run verify`) | 🔴 |
| RF-DEP-002 | — | 🔴 |
| RF-DEP-003 | — | 🔴 |
| RF-DEP-004 | — | 🔴 |

## Conteos

| | Cantidad |
|---|---|
| RF totales | 39 |
| ✅ cubiertos | 21 |
| 🟡 parciales | 1 |
| 🔴 sin test | 17 |

`it()` por archivo: build-output 15 · content 27 · site 11 · phone 3 · SearchDialog 12 ·
ProvidersTable 14 · CatalogTable 11 = 93. Todos los tests mapean a algún RF (ningún test huérfano).

## Huecos prioritarios

1. RF-TEL-002 (emergencias) y RF-A11Y-004 (responsive): Must y sin test; necesitan navegador real.
2. RF-DEP-004 (`prune`): borra en producción y sus guardas no están probadas.
3. RF-BLD-004 (`.htaccess`): redirects/CSP sin verificación antes del deploy.
