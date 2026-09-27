# OSPIQYP — sitio institucional

Sitio público de la **Obra Social del Personal de Industrias Químicas y Petroquímicas**
(https://www.ospiqyp.org.ar). Es el canal por el que un afiliado busca la cartilla de
prestadores, el teléfono de su delegación, un formulario para descargar, qué cubre el PMO
o a quién llamar en una emergencia.

El público es mayormente **adulto y adulto mayor**. Eso no es una nota de color: manda sobre
las decisiones del código. Los contrastes de `globals.css` se eligieron por encima del mínimo
de WCAG AA, los teléfonos van grandes y clickeables (`tel:`), y no hay flujos con estado ni
login: todo se resuelve leyendo y tocando un link.

---

## La decisión que explica casi todo lo demás

**Next 16 con App Router y `output: "export"`. En producción NO hay Node.**

`next build` no levanta un servidor: escupe la carpeta `out/` con HTML plano, y esos archivos
se suben por FTP a un hosting cPanel donde los sirve **LiteSpeed**. No hay SSR, no hay rutas de
API, no hay middleware, no hay revalidación. Todo lo que el afiliado ve ya está escrito en un
`.html` antes de subirse.

Consecuencias directas, todas verificables en el repo:

| Decisión | Dónde vive | Por qué |
| --- | --- | --- |
| `output: "export"` | `next.config.ts` | El hosting no corre Node. |
| `images: { unoptimized: true }` | `next.config.ts` | No hay servidor que optimice imágenes on-demand. |
| `trailingSlash: true` | `next.config.ts` | Cada ruta es una carpeta con `index.html`; el server la sirve sin reglas extra. |
| Redirects en `.htaccess` | `public/.htaccess` | `permanentRedirect()` de Next no redirige en un export (ver Gotchas). |
| `export const dynamic = "force-static"` | `src/app/sitemap.ts`, `src/app/robots.ts` | Sin eso, Next no los genera en build-time. |
| Tests que leen `out/` | `tests/build-output.test.ts` | El artefacto final es la única verdad; ahí se verifica. |

Si vas a tocar algo y dudás, la pregunta correcta es siempre: *¿esto existe en el HTML
generado, o requiere un servidor que no tenemos?*

---

## Comandos

```bash
npm install
npm run dev          # http://localhost:3000
```

| Comando | Qué hace | Cuándo usarlo |
| --- | --- | --- |
| `npm run dev` | Servidor de desarrollo de Next con hot reload. | Día a día, mientras editás. |
| `npm run build` | Genera el export estático en `out/`. | Antes de deployar, y para todo test que mire `out/`. |
| `npm run lint` | ESLint con `eslint-config-next` (core-web-vitals + typescript). | Antes de commitear. |
| `npm test` | Corre **toda** la suite de Vitest, incluida la capa que lee `out/`. | Cuando ya corriste `build` y querés todo verde. |
| `npm run test:watch` | Vitest en modo watch. | Mientras escribís o arreglás tests. |
| `npm run test:fast` | Sólo contenido, `lib/site` y componentes. **No necesita `out/`**. | Loop rápido: corre en segundos sin buildear. |
| `npm run test:build` | `next build` + los tests sobre `out/`. | Para verificar el artefacto que se sube. |
| `npm run test:coverage` | Cobertura v8 sobre `src/components`, `src/lib` y `src/content`. | Ocasional, cuando querés ver qué quedó sin cubrir. |
| **`npm run verify`** | **`tsc --noEmit` + `eslint` + `test:fast` + `test:build`.** | **Obligatorio antes de cualquier deploy.** |

```bash
npm run verify   # el único comando que tenés que recordar antes de subir nada
```

`verify` es la puerta: type-check, lint, invariantes de contenido, componentes, build real y
aserciones sobre el HTML que se va a subir. Si `verify` está verde, el `out/` es deployable.

> `npm start` (`next start`) quedó del boilerplate y no aplica: con `output: "export"` no hay
> servidor que arrancar. Para revisar el build local, serví `out/` con cualquier servidor
> estático (por ejemplo `python3 -m http.server` parado dentro de `out/`).

---

## Estructura

```
src/
  app/            # App Router: una carpeta por ruta, cada una con su page.tsx
    layout.tsx    # metadata base, fuentes, Header/Footer, EmergencyBanner, JSON-LD
    globals.css   # tokens de color/tipografía (Tailwind v4, @theme inline)
    sitemap.ts    # lista explícita de rutas del sitio
    robots.ts
  components/
    layout/       # Header, Footer, EmergencyBanner
    home/         # Hero, ServiceCards, DelegationsPreview, QuickContact
    search/       # SearchDialog (Fuse.js) + SearchTrigger
    shared/       # ProvidersTable, CatalogTable, Accordion, PhoneLink, EmailLink, JsonLd
  content/        # LOS DATOS DEL SITIO (ver abajo)
  lib/
    site.ts       # SITE_URL, canonicalUrl(), pageMetadata()  ← única fuente de verdad de URLs
    search.ts     # arma SEARCH_INDEX a partir de src/content/
public/
  .htaccess       # config del server: redirects, cabeceras, caché, compresión
  images/         # logo, banners (WebP)
  pdfs/           # formularios y cartilla descargables (ver public/pdfs/README.md)
scripts/
  deploy_cpanel.py    # subida por FTPS al hosting
  prune-list.txt      # lista explícita de qué borrar del server
tests/
```

---

## Contenido: `src/content/` es la base de datos

**No hay CMS ni backend.** Todo el contenido del sitio son módulos TypeScript tipados en
`src/content/`. Para actualizar la cartilla no se entra a ningún panel: se edita el `.ts`, se
corre `npm run verify` y se deploya.

| Archivo | Qué contiene | Lo consume |
| --- | --- | --- |
| `providers.ts` | Cartilla de prestadores (clínicas, diagnóstico, kinesiología, odontología, farmacias, ópticas) con zona, localidad, dirección y teléfono. | `/prestadores` vía `ProvidersTable` |
| `delegations.ts` | Delegaciones del país: ciudad, provincia, dirección, teléfono, email. | `/delegaciones` y la preview del home |
| `forms.ts` | Formularios descargables, agrupados por categoría; cada `href` apunta a un PDF real de `public/pdfs/`. | `/formularios` |
| `pmo.ts` | Programa Médico Obligatorio: prestaciones (Anexo I) + texto normativo del decreto. | `/programa-medico-obligatorio` |
| `pmo-catalogo.ts` | Anexo II, el catálogo de prácticas: texto crudo por línea que se parsea a filas tipadas. | `CatalogTable` |
| `coverage.ts` | Secciones de coberturas con bullets y link a más info. | `/coberturas` |
| `copays.ts` | Coseguros vigentes, agrupados por tipo de prestación. | `/coberturas` |
| `contact.ts` | Teléfonos (principales, especializados, emergencias), emails, dirección y horarios. | `/contacto`, header, footer |
| `services.ts` | Servicios destacados del home, con nombre de ícono de Heroicons. | `ServiceCards` |
| `leadership.ts` | Comisión Directiva. | `/institucional` |
| `news.ts` | Novedades. | `/novedades` |

`src/lib/search.ts` arma el índice del buscador global juntando servicios, delegaciones,
formularios, coberturas, institucional y prestadores. **Contenido que agregues ahí aparece en
el buscador sin tocar nada más**, siempre que el módulo esté enganchado en `search.ts`.

Reglas al editar contenido:

- Los `id` tienen que ser únicos dentro de cada módulo (hay tests que lo verifican).
- Si agregás un formulario, subí primero el PDF a `public/pdfs/`: el test rompe si el `href`
  apunta a un archivo que no existe.
- Los links internos del contenido tienen que corresponder a rutas reales de `src/app/`
  (también está testeado).

---

## Tests

Vitest, en tres capas, cada una con un propósito distinto.

### Capa 1 — `tests/build-output.test.ts`: el HTML que se sube

Lee `out/` y afirma sobre el artefacto real. **Es la capa de mayor retorno**, porque el sitio
es estático: si algo está mal en `out/`, está mal en producción. Cada test nació de un bug que
ya pasó, no de una hipótesis. Verifica, entre otras cosas:

- Cada página declara **su propia** URL canónica (absoluta, https, con barra final), no la del home.
- Toda `<loc>` del sitemap termina en barra y tiene su `index.html` en `out/`; y toda página
  exportada está en el sitemap.
- Todo `/pdfs/*.pdf` y `/images/*` referenciado en el HTML existe realmente en `out/`.
- No hay `http://` sin `s` fuera de una allowlist chica de hosts de terceros que hoy no tienen
  HTTPS (autogestión y webmail de la obra social).
- Cada página tiene `<title>` y `<meta name="description">` no vacíos, `lang="es-AR"`, un `<h1>`
  y un body que no está prácticamente vacío (cazapáginas fantasma).
- `out/` no supera el presupuesto de peso.

Requiere `npm run build` corrido antes; por eso existe `npm run test:build`.

### Capa 2 — `tests/content.test.ts` + `tests/site.test.ts`: invariantes

`src/content/` es donde el mantenimiento futuro mete errores que TypeScript no ve: un id
repetido, un PDF que no se subió, un teléfono con una letra, un link interno a una ruta que no
existe. Estos tests leen los módulos y el filesystem de `public/`, sin necesidad de `out/`.
`site.test.ts` cubre `canonicalUrl()` y `pageMetadata()` como unit test barato: señalan la
causa exacta de los bugs de SEO en milisegundos, mientras que la capa 1 detecta el síntoma.

### Capa 3 — `tests/components/`: componentes con estado

Los tres componentes que tienen lógica de verdad: `ProvidersTable` (búsqueda + filtros +
paginado de la cartilla), `CatalogTable` (miles de códigos del Anexo II, donde el paginado no
es cosmético sino la diferencia entre que renderice y que no) y `SearchDialog` (el buscador
global, 100% cliente sobre Fuse.js). Se testea el **contrato observable**: qué entra (props +
interacción) y qué se ve. Nada de estado interno ni clases de Tailwind — un refactor de la
implementación no debería romperlos; un cambio de comportamiento sí.

### Por qué Vitest y no Jest ni Playwright

- **Vitest y no Jest**: corre TypeScript y ESM nativo sin configurar transforms. Con Next 16 +
  React 19 + Tailwind v4, la config de transform de Jest es exactamente lo que se rompe en cada
  bump de versión.
- **Vitest y no Playwright**: no hay servidor, ni sesiones, ni flujos con estado. Lo que se
  quiere verificar es *el contenido del HTML generado*, y eso se lee del filesystem — más
  rápido, más determinista y sin navegador que mantener. Los pocos componentes interactivos se
  cubren con Testing Library en jsdom.

La config vive en `vitest.config.mts` (`.mts` a propósito: Vite lo carga como ESM nativo sin
tener que poner `"type": "module"` en `package.json`, que rompería la config de Next y PostCSS).

---

## Deploy

El deploy es **manual y explícito**. No hay CI que suba nada.

### Credenciales

Viven **fuera del repo**, en `~/.ospiqyp_deploy`, y nunca en git:

```
CP_HOST=ftp.tudominio.com.ar
CP_USER=usuario
CP_PASS=contraseña
CP_DIR=public_html          # opcional, default public_html
```

El script las lee de ese archivo — nunca de `argv`, nunca hardcodeadas — y nunca imprime la
contraseña.

### Procedimiento

```bash
npm run verify                                                     # 1. type-check + lint + tests + build
python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy list     # 2. mirar qué hay hoy en el server
python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy upload   # 3. subir out/
```

Conecta por FTPS (TLS explícito) y cae a FTP plano sólo si el server no lo soporta. El
`PatientFTP_TLS` del script reusa la sesión TLS del canal de control en el de datos porque el
Pure-FTPd del hosting lo exige: sin eso, la transferencia aborta con
`451 Error during read from data connection` apenas pasa el primer bloque.

### ⚠️ Advertencias que no se pueden saltear

**1. El upload NUNCA borra.**
`upload` sube `out/` encima de lo que haya. Sacar un archivo del repo **no lo saca de
producción**: sigue vivo en el server. Para borrar existe la acción `prune`, que sólo toca las
rutas escritas a mano en `scripts/prune-list.txt`.

```bash
python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy prune
```

`prune` releva primero (muestra ruta + tamaño real en el server), pide que un humano escriba
`BORRAR` en mayúsculas, y recién ahí borra, verificando cada entrada contra el server. Aborta si
no hay terminal interactiva. La lista es explícita **a propósito**: deducir "lo que sobra"
comparando `out/` contra el server se apoya en que el build local esté completo, y con un `out/`
a medias (build cortado, `npm run build` que falló silencioso) "lo que sobra" pasa a ser el
sitio entero. Además, al estar versionada, queda en el historial de git qué se sacó y cuándo.
Formato: una ruta por línea relativa a `CP_DIR`; sin barra final = archivo (`DELETE`), con barra
final = directorio (`RMD`, y sólo si quedó vacío, así que los archivos van listados **antes** que
su directorio). El script rechaza rutas absolutas, `..` y comodines.

**2. El salteo por tamaño sólo aplica a `/_next/static/`.**
Los nombres de ahí llevan el hash del contenido: mismo nombre + mismo tamaño ⇒ mismo archivo, se
puede saltear sin riesgo. **Para el resto no alcanza comparar el tamaño**: el build ID de Next
tiene largo fijo, así que un `index.html` que sólo cambió de build ID pesa *exactamente* lo
mismo. Cuando el salteo aplicaba a todo, esos HTML no se re-subían y producción quedaba
sirviendo HTML de un build anterior, apuntando a chunks que ya no existían. Hoy todo lo que no
cuelga de `_next/static/` se re-sube siempre (son archivos chicos: HTML, txt, xml).

**3. `wp-archive-DEPRECADO` no se toca.**
Mueve **todo** el contenido de `CP_DIR` a `_wp_viejo/`. Se usó una sola vez, en la migración de
WordPress al export estático, cuando `CP_DIR` todavía tenía el sitio viejo. **Hoy `CP_DIR` es el
sitio en producción**: correrla se lleva `index.html` y `_next/` a un subdirectorio y tira la web
abajo en el acto. Tiene un portero que aborta si detecta `index.html` **y** `_next/` juntos (la
huella inconfundible del export de Next) y por eso el nombre es largo e imposible de tipear sin
querer. Sigue existiendo porque es el único camino de vuelta si alguna vez hay que archivar un
`CP_DIR` ajeno al deploy actual.

**4. Las credenciales nunca van a git.** `~/.ospiqyp_deploy` vive en el home, fuera del repo.

---

## Gotchas que costaron caro

**El server es LiteSpeed, no Apache.**
Interpreta `.htaccess`, pero **no declara `mod_alias.c`**. Un bloque `<IfModule mod_alias.c>`
evalúa falso y se saltea **en silencio**: la ruta seguía dando 404 y no había ningún error que
lo delatara. Los redirects van por `mod_rewrite`, que LiteSpeed sí reconoce (verificado contra
producción: `server: LiteSpeed`). Vale para cualquier directiva nueva que agregues: confirmá
que el módulo esté declarado antes de envolverla en un `<IfModule>`.

**`permanentRedirect()` de Next no funciona con `output: "export"`.**
No genera un redirect: genera un HTML sin meta refresh que el server devuelve con **200**. O sea
una página en blanco, indexable. Le pasó a `/coberturas/pmo`. Los redirects los hace el
`.htaccess`, y además hay que **borrar del server los archivos de la ruta vieja con `prune`**:
mientras el archivo real exista, el server lo sirve y la regla de rewrite nunca llega a aplicarse.

**Los canonical se arman con `pageMetadata()` de `src/lib/site.ts`.**
Si una página nueva no lo usa, hereda el `openGraph`/canonical del layout raíz y **se declara a
sí misma como duplicada del home**. Eso ya pasó en las 10 páginas del sitio. Por eso
`pageMetadata()` obliga a pasar `path`: es imposible armar la metadata sin su canonical propio.
Ojo también con `openGraph`: Next **no hace merge profundo**, lo pisa entero, así que el helper
vuelve a declarar la imagen de OG en cada página o el preview de WhatsApp queda sin imagen.

**`trailingSlash: true` ⇒ todo lleva barra final.**
La URL real que sirve el hosting es `/institucional/`. Un canonical o una `<loc>` del sitemap sin
barra le declara a Google una URL que responde **301**: un salto de redirección gratis en cada
visita del crawler. Por eso `sitemap.ts` usa el mismo `canonicalUrl()` que la metadata de las
páginas, y hay tests en las dos capas verificándolo.

**Los títulos `h1..h6` heredan color, no lo fijan.**
En `globals.css`, la regla de headings lleva `color: inherit` a propósito. Un selector de
elemento le gana a la herencia, así que fijar el color ahí dejaba los títulos casi negros dentro
de cualquier contenedor oscuro (hero, footer) por más que el contenedor tuviera `text-white`.
Como el `body` ya define `var(--color-fg)`, heredar da el mismo gris oscuro de siempre en el
resto del sitio.

**La CSP del `.htaccess` no lleva `script-src`, y es deliberado.**
Next inlinea sus scripts de bootstrap e hidratación y, siendo un export estático sin servidor,
no hay forma de generar un nonce por request. Tampoco van `upgrade-insecure-requests` ni
`block-all-mixed-content`: el footer y `/coberturas` linkean a hosts de la obra social que hoy
sólo responden por HTTP, y cualquiera de esas dos directivas dejaría a las delegaciones del
interior sin acceso. El HSTS arranca en `max-age=300` a propósito, y **nunca** hay que agregarle
`preload`: eso lo hornean los navegadores en su binario y salir de esa lista tarda meses.

---

## Cómo agregar una página nueva

1. **Creá `src/app/<ruta>/page.tsx`.** Si necesita datos, ponelos en un módulo de
   `src/content/`, no inline en el componente.
2. **Exportá su metadata con `pageMetadata()`**, nunca a mano:
   ```tsx
   import type { Metadata } from "next";
   import { pageMetadata } from "@/lib/site";

   export const metadata: Metadata = pageMetadata({
     path: "/mi-ruta",
     title: "Título sin el sufijo de marca",
     description: "Una descripción propia, no vacía.",
   });
   ```
   El `title.template` del layout le agrega ` | OSPIQYP` solo.
3. **Poné un `<h1>`** en la página. Hay un test que lo exige.
4. **Sumala a `ROUTES` en `src/app/sitemap.ts`** con su `priority` y `changeFrequency`. Si no,
   el test de "toda página exportada está listada en el sitemap" falla.
5. **Enganchala en la navegación** (`src/components/layout/Header.tsx` / `Footer.tsx`) y, si
   corresponde, en el índice del buscador (`src/lib/search.ts`).
6. **`npm run verify`.** Verde = deployable.
