# SRS — Sitio institucional OSPIQYP

> Versión 0.1 · Última actualización 2026-09-29 · **Sin aprobar** (borrador por ingeniería inversa)
> Estado general: borrador. Todo RF está en estado `observado`: describe lo que el sitio **hace hoy**,
> no lo que debería. Nada pasa a `confirmado` sin el OK del usuario.

## 0. Resumen ejecutivo (para cualquier lector)

- **Qué es:** la página web pública de la obra social OSPIQYP.
- **Para quién:** afiliados (muchos de ellos personas mayores), empresas que aportan, prestadores y
  delegaciones del interior.
- **Qué problema resuelve:** encontrar rápido un teléfono, una delegación, un formulario, un prestador o
  qué cubre el plan, desde el celular o la computadora.
- **Qué hace:**
  - Muestra las secciones de la obra social: institucional, coberturas, discapacidad, programa médico
    obligatorio, prestadores, delegaciones, formularios, novedades y contacto.
  - Tiene un buscador que encuentra cualquier cosa del sitio escribiendo unas letras.
  - Deja llamar tocando cualquier teléfono y muestra siempre arriba el teléfono de emergencias.
  - Permite filtrar la lista de prestadores y el catálogo de prestaciones.
  - Permite descargar los formularios en PDF.
- **Qué NO hace (a propósito):** no tiene login de afiliados, no tiene formularios que envíen datos, no
  guarda nada: es un sitio de sólo lectura, publicado como archivos fijos en un hosting sin servidor de
  aplicación.
- **Cómo sabemos que funciona:** `npm run verify` en verde (tipos, lint, tests y los tests sobre el sitio
  armado) antes de cada publicación.

## 1. Alcance

| Entra | No entra (Won't) |
|---|---|
| 10 páginas públicas + página 404 | Cuenta de afiliado, autogestión, turnos |
| Buscador local (en el navegador) | Buscador en servidor |
| Contenido cargado en `src/content/*.ts` | Panel de administración / CMS |
| SEO: canonical, sitemap, robots, Open Graph, datos estructurados | Formularios que envíen datos (no hay ninguno) |
| Publicación manual por FTPS a cPanel | CI / deploy automático (no existe) |

## 2. Actores

| Actor | Tipo | Qué quiere |
|---|---|---|
| Visitante / afiliado | persona | Encontrar teléfonos, cobertura, prestadores, formularios |
| Empresa aportante | persona | Instrucciones y nota de inscripción |
| Editor del contenido | rol (técnico) | Cambiar `src/content/`, correr `verify` y publicar |
| Buscadores (Google) y redes (WhatsApp) | sistema externo | Indexar URLs canónicas y armar previews |
| Hosting cPanel (LiteSpeed) | sistema externo | Servir `out/` y aplicar `.htaccess` |
| Hosts propios de la obra social por HTTP | sistema externo | Webmail y sistemas linkeados desde el footer |

## 3. Glosario

| Término | Significado |
|---|---|
| PMO / PMOE | Programa Médico Obligatorio (de Emergencia); prestaciones mínimas garantizadas |
| Prestador | Profesional o institución de la cartilla (`src/content/providers.ts`) |
| Delegación | Oficina en el interior (`src/content/delegations.ts`) |
| Export estático | Sitio armado como HTML fijo en `out/` (`output: "export"`) |
| Canonical | URL oficial de cada página declarada a los buscadores |
| `verify` | `tsc --noEmit && eslint && test:fast && test:build` |

## 4. Modelo del dominio

No hay base de datos. Cada módulo de `src/content/` es una lista tipada e inmutable:
`SERVICES`, `COVERAGE`, `PMO_PRESTACIONES` + catálogo (`pmo-catalogo.ts`), `PROVIDERS` (categoría ∈
`ProviderCategory`, zona ∈ `ProviderZone`), `DELEGATIONS` (id = ancla de URL), `FORMS` (href a
`/pdfs/`), `NEWS`, `COPAY_GROUPS`, `LEADERSHIP`, y `contact.ts` (teléfonos, mails, dirección). El índice
del buscador (`src/lib/search.ts:SEARCH_INDEX`) se deriva de esas listas en build. Sin estados ni
transiciones.

## 5. Casos de uso

### CU-BUS-01 — Buscar algo en el sitio
- **Actor:** visitante · **Precondición:** cualquier página cargada.
- **Flujo principal:** 1) abre el buscador (botón o Ctrl/Cmd+K) 2) escribe 3) ve resultados agrupados por
  categoría 4) elige uno → navega y el diálogo se cierra.
- **Alternativos y errores:** 2a) sólo espacios → estado inicial, sin resultados · 3a) ningún resultado →
  mensaje con el término buscado · 3b) borra el término → vuelve al estado inicial · 4a) cierra sin elegir
  → al reabrir no queda la búsqueda anterior.
- **Requisitos:** RF-BUS-001…004

### CU-PRE-01 — Encontrar un prestador y llamarlo
- **Actor:** afiliado · **Flujo:** 1) entra a `/prestadores` 2) escribe nombre/localidad/dirección/
  especialidad y/o filtra por categoría y zona 3) toca el teléfono de la tarjeta.
- **Errores:** 2a) sin coincidencias → mensaje y ninguna tarjeta · 2b) más de 40 → "Ver más" con cuántos
  faltan · 3a) el prestador tiene dos números → marca sólo el primero.
- **Requisitos:** RF-CONT-001…003, RF-TEL-001

### CU-PMO-01 — Consultar si una práctica está en el catálogo PMO
- **Flujo:** 1) `/programa-medico-obligatorio` 2) busca por descripción o código, o filtra por categoría.
- **Errores:** sin resultados → mensaje y ninguna tabla · más de 60 → "Ver más".
- **Requisitos:** RF-CONT-004

### CU-TEL-01 — Llamar a emergencias
- **Flujo:** 1) en cualquier página toca el número del banner rojo → el teléfono marca.
- **Errores:** en pantallas angostas se oculta el segundo número (`hidden sm:inline`).
- **Requisitos:** RF-TEL-002

### CU-FORM-01 — Descargar un formulario
- **Flujo:** 1) `/formularios` 2) toca el formulario → descarga el PDF de `/pdfs/`.
- **Errores:** un PDF faltante lo detecta el test antes del deploy, no el usuario.
- **Requisitos:** RF-CONT-005

### CU-DEP-01 — Publicar un cambio
- **Actor:** editor · **Flujo:** 1) edita `src/content/` 2) `npm run verify` 3) `deploy_cpanel.py list`
  4) `deploy_cpanel.py upload`.
- **Errores:** 2a) rojo → no se publica · 4a) FTPS no disponible → cae a FTP plano · 4b) un archivo borrado
  del repo sigue en producción → hay que listarlo en `scripts/prune-list.txt` y correr `prune`, que pide
  escribir `BORRAR` y aborta sin terminal interactiva.
- **Requisitos:** RF-DEP-001…004

## 6. Requisitos funcionales

Formato compacto: enunciado · prioridad · estado · dueño en el código · tests. Los criterios Dado/Cuando/
Entonces se escriben cuando el usuario confirme cada RF; hoy la evidencia de intención son los tests
citados.

### Páginas (PAG)

**RF-PAG-001 — Páginas públicas.** El sistema hoy publica 10 páginas: `/`, `/institucional`,
`/coberturas`, `/coberturas/discapacidad`, `/programa-medico-obligatorio`, `/prestadores`,
`/delegaciones`, `/formularios`, `/novedades`, `/contacto`. Must · observado · `src/app/*/page.tsx`,
`src/app/sitemap.ts:ROUTES` · tests: `tests/build-output.test.ts` ("toda <loc> tiene su index.html").

**RF-PAG-002 — Cada página tiene contenido y un título principal.** Hoy ninguna página exportada tiene el
body con menos de 400 caracteres de texto y todas tienen un `<h1>`. Must · observado · tests:
`tests/build-output.test.ts` ("páginas fantasma").

**RF-PAG-003 — Página 404 propia.** El sistema hoy muestra "Página no encontrada" para rutas
inexistentes. Should · observado · `src/app/not-found.tsx` · tests: ninguno.

**RF-PAG-004 — Home con accesos rápidos.** La home hoy muestra hero, tarjetas de servicios, las primeras
8 delegaciones y contacto rápido. Should · observado · `src/components/home/*` · tests: ninguno directo.

**RF-PAG-005 — Navegación principal y móvil.** Hoy hay menú de escritorio (≥lg) y menú desplegable
móvil con `aria-expanded`/`aria-controls`. Must · observado · `src/components/layout/Header.tsx` · tests:
ninguno.

### Buscador (BUS)

**RF-BUS-001 — Índice del sitio.** El sistema hoy indexa servicios, delegaciones, formularios,
coberturas, comisión directiva, PMO y sus prestaciones, y prestadores; cada ítem con id único, título y
href a una ruta real o https. Must · observado · `src/lib/search.ts:SEARCH_INDEX` · tests:
`tests/content.test.ts` (SEARCH_INDEX).

**RF-BUS-002 — Búsqueda aproximada.** Hoy busca con Fuse.js (pesos título 0.5 / descripción 0.3 /
keywords 0.2, threshold 0.4, mínimo 2 caracteres) y muestra como máximo 30 resultados agrupados por
categoría. Must · observado · `src/lib/search.ts:FUSE_OPTIONS`, `SearchDialog.tsx` · tests:
`tests/components/SearchDialog.test.tsx`.

**RF-BUS-003 — Estados del diálogo.** Hoy: cerrado no renderiza; vacío o sólo espacios muestra estado
inicial; sin resultados muestra el término; elegir un resultado cierra; reabrir limpia. Must · observado
· tests: `tests/components/SearchDialog.test.tsx`.

**RF-BUS-004 — Atajo de teclado.** Hoy Ctrl+K / Cmd+K abre el buscador. Could · observado ·
`src/components/search/SearchTrigger.tsx` · tests: ninguno.

### Contenido y listados (CONT)

**RF-CONT-001 — Listado de prestadores filtrable.** Hoy filtra por texto (nombre, localidad, dirección,
especialidad, sin distinguir mayúsculas), por categoría y por zona combinados con Y. Must · observado ·
`ProvidersTable.tsx`, `filters/useFilteredList.ts` · tests: `tests/components/ProvidersTable.test.tsx`.

**RF-CONT-002 — Paginado "Ver más".** Hoy muestra 40 prestadores / 60 prestaciones por tanda, dice
cuántos faltan, desaparece al final y se resetea al cambiar búsqueda o filtro; "limpiar" resetea ambos.
Must · observado · `PAGE_SIZE` en `ProvidersTable.tsx` y `CatalogTable.tsx` · tests: ambos tests de
componentes.

**RF-CONT-003 — Datos de prestadores válidos.** Hoy hay prestadores cargados, sin duplicados exactos, con
nombre, categoría y zona dentro de las uniones tipadas. Must · observado · `src/content/providers.ts` ·
tests: `tests/content.test.ts` (PROVIDERS).

**RF-CONT-004 — Catálogo PMO filtrable.** Hoy busca por descripción o código exacto y filtra por
categoría; el conteo dice "en total" / "encontradas". Must · observado · `CatalogTable.tsx`,
`src/content/pmo-catalogo.ts` · tests: `tests/components/CatalogTable.test.tsx`.

**RF-CONT-005 — Formularios descargables.** Hoy cada formulario apunta a un PDF que existe en
`public/pdfs/` o a un https externo; ids únicos. Must · observado · `src/content/forms.ts` · tests:
`tests/content.test.ts` (FORMS), `tests/build-output.test.ts` ("todo /pdfs/*.pdf referenciado existe").

**RF-CONT-006 — Delegaciones con ancla.** Hoy cada delegación tiene ciudad, provincia, id-slug usable como
ancla (`/delegaciones#<id>`) y mails con forma de mail. Must · observado · `src/content/delegations.ts` ·
tests: `tests/content.test.ts` (DELEGATIONS).

**RF-CONT-007 — Links internos del contenido.** Hoy los href de SERVICES y COVERAGE apuntan a rutas
reales, y las URLs de servicios externos son https. Must · observado · tests: `tests/content.test.ts`.

**RF-CONT-008 — Novedades.** Hoy `/novedades` lista `NEWS`. Should · observado · `src/content/news.ts` ·
tests: ninguno.

**RF-CONT-009 — Copagos.** Hoy `/coberturas` muestra la tabla de copagos vigente ("Febrero 2026").
Should · observado · `src/content/copays.ts` · tests: ninguno.

### Contacto y teléfonos (TEL)

**RF-TEL-001 — Teléfonos marcables.** Hoy todo teléfono es un link `tel:` que marca el **primer** número
cuando hay varios separados por "/". Must · observado · `src/lib/phone.ts:telHref` · tests:
`tests/phone.test.ts`, `tests/components/ProvidersTable.test.tsx` ("link tel: marcable").

**RF-TEL-002 — Banner de emergencias.** Hoy un banner rojo con `role="alert"` muestra el teléfono 24/7 en
todas las páginas. Must · observado · `src/components/layout/EmergencyBanner.tsx` · tests: ninguno.

**RF-TEL-003 — Teléfonos de contacto bien formados.** Hoy los números no tienen letras, el primero tiene
≥6 dígitos, sin espacios en las puntas, y el `tel:` de `contact.ts` es E.164 y coincide con el visible.
Must · observado · `src/content/contact.ts` · tests: `tests/content.test.ts` (teléfonos).

**RF-TEL-004 — Mails de contacto.** Hoy los mails de contacto tienen forma de mail y se muestran como
links. Must · observado · `contact.ts`, `EmailLink.tsx` · tests: `tests/content.test.ts`.

### SEO (SEO)

**RF-SEO-001 — Canonical propio por página.** Hoy cada página declara SU URL absoluta https con barra
final, nunca la del home. Must · observado · `src/lib/site.ts:canonicalUrl`, `pageMetadata` · tests:
`tests/site.test.ts`, `tests/build-output.test.ts` (canonical).

**RF-SEO-002 — Metadata básica.** Hoy cada página tiene `<title>` no vacío y no repetido, `meta
description` no vacía, Open Graph con imagen y locale `es_AR`. Must · observado · tests:
`tests/site.test.ts`, `tests/build-output.test.ts` (metadata).

**RF-SEO-003 — Sitemap.** Hoy `sitemap.xml` lista toda página exportada, con barra final, y cada `<loc>`
existe en `out/`. Must · observado · `src/app/sitemap.ts` · tests: `tests/build-output.test.ts`.

**RF-SEO-004 — robots.txt.** Hoy permite todo salvo `/api/` y `/_next/` y apunta al sitemap. Should ·
observado · `src/app/robots.ts` · tests: ninguno.

**RF-SEO-005 — Datos estructurados.** Hoy se publica JSON-LD `MedicalOrganization`/`LocalBusiness` con
dirección y horario. Should · observado · `src/components/shared/JsonLd.tsx` · tests: ninguno.

### Build estático (BLD)

**RF-BLD-001 — Export estático.** Hoy el build genera HTML fijo en `out/` con `trailingSlash: true` e
imágenes sin optimizar. Must · observado · `next.config.ts` · tests: `tests/build-output.test.ts`
(indirecto).

**RF-BLD-002 — Assets referenciados existen.** Hoy todo `/images/*` y `/pdfs/*` referenciado en el HTML
existe en `out/`. Must · observado · tests: `tests/build-output.test.ts` (assets).

**RF-BLD-003 — Sin contenido mixto inesperado.** Hoy sólo aparecen `http://` de 3 hosts propios
permitidos (`osocial.homelinux.org:48888`, `osocial2.homelinux.org/webmail`,
`osocial2.homelinux.org:58889`). Must · observado · tests: `tests/build-output.test.ts` ("http:// sin s").

**RF-BLD-004 — Redirects y cabeceras en el hosting.** Hoy los redirects (vía `mod_rewrite`), la CSP sin
`script-src` y HSTS `max-age=300` viven en `public/.htaccess`. Must · observado · tests: ninguno.

### Accesibilidad y responsive (A11Y)

**RF-A11Y-001 — Idioma declarado.** Hoy toda página declara `lang="es-AR"`. Must · observado · tests:
`tests/build-output.test.ts`.

**RF-A11Y-002 — Salto al contenido.** Hoy hay link "Saltar al contenido principal" a `#main`. Should ·
observado · `src/app/layout.tsx` · tests: ninguno.

**RF-A11Y-003 — Etiquetas accesibles en links críticos.** Hoy los teléfonos de emergencia y la navegación
tienen `aria-label`. Should · observado · tests: ninguno.

**RF-A11Y-004 — Responsive.** Hoy el layout usa breakpoints de Tailwind (`sm`/`md`/`lg`). Must ·
observado · tests: ninguno (no hay tests en navegador real).

### Deploy (DEP)

**RF-DEP-001 — Publicación manual verificada.** Hoy se publica sólo a mano tras `npm run verify`. Must ·
observado · `README.md` §Deploy · tests: n/a.

**RF-DEP-002 — Credenciales fuera del repo.** Hoy el script lee `~/.ospiqyp_deploy` y nunca imprime la
contraseña. Must · observado · `scripts/deploy_cpanel.py` · tests: ninguno.

**RF-DEP-003 — Upload que no borra y re-sube HTML.** Hoy `upload` nunca borra y sólo saltea por tamaño lo
de `/_next/static/`. Must · observado · `scripts/deploy_cpanel.py` · tests: ninguno.

**RF-DEP-004 — Borrado explícito y confirmado.** Hoy `prune` sólo borra lo listado en
`scripts/prune-list.txt`, rechaza rutas absolutas/`..`/comodines, exige escribir `BORRAR` y aborta sin
TTY. Must · observado · `scripts/deploy_cpanel.py` · tests: ninguno.

## 7. Requisitos no funcionales

| ID | Tipo | Requisito medible (observado) | Cómo se verifica |
|---|---|---|---|
| RNF-PESO-001 | Rendimiento | `out/` pesa ≤ 12 MB | `tests/build-output.test.ts` (`OUT_BUDGET_MB`) |
| RNF-CONT-001 | Calidad | body de cada página ≥ 400 caracteres de texto | `tests/build-output.test.ts` (`MIN_TEXTO_BODY`) |
| RNF-BUS-001 | Usabilidad | ≤ 30 resultados por búsqueda | `tests/components/SearchDialog.test.tsx` |
| RNF-SEG-001 | Seguridad | sólo 3 hosts `http://` permitidos en el HTML | `tests/build-output.test.ts` |
| RNF-SEG-002 | Seguridad | HSTS `max-age=300`, sin `preload` | sin test (sólo `public/.htaccess`) |
| RNF-COMP-001 | Portabilidad | funciona sin servidor Node (hosting LiteSpeed) | `next.config.ts` `output: "export"`; sin test |

## 8. Huecos

1. **No hay tests en navegador real**: ni responsive en 3 breakpoints, ni menú móvil, ni banner de
   emergencias (RF-PAG-005, RF-TEL-002, RF-A11Y-002…004).
2. **Sin tests**: página 404, home, novedades, copagos, robots.txt, JSON-LD, atajo Ctrl/Cmd+K.
3. **`.htaccess` sin test** (redirects, CSP, HSTS): un cambio ahí sólo se ve en producción.
4. **`scripts/deploy_cpanel.py` sin tests**: las guardas de `prune` (confirmación, rutas) no están probadas.
5. **Sin CI**: `verify` depende de que el editor lo corra.
6. **Por confirmar con el usuario**: si el segundo número de emergencias debe ocultarse en celular; si los 3
   hosts HTTP siguen siendo necesarios; si `LAST_MODIFIED` fijo del sitemap (2026-08-06) es intencional;
   quién es el editor del contenido (¿alguien no técnico?).
7. **Criterios Dado/Cuando/Entonces pendientes** para cada RF; hoy la evidencia son los nombres de los tests.

## 9. Matriz de trazabilidad

Ver [`SRS-matriz.md`](SRS-matriz.md).
