# PDFs del sitio

**Todos los PDFs van planos acá, sin subcarpetas.** La ruta pública es siempre
`/pdfs/<archivo>.pdf`, uno a uno igual al nombre del archivo en esta carpeta.

Contenido actual: los formularios descargables (declaración jurada, cronicidad, diabetes, HIV,
discapacidad, alta de empresa) y `resumen-cartilla-2026.pdf`, la cartilla que se descarga desde
`/prestadores`.

## Cómo se referencian

Casi todos entran por `src/content/forms.ts`, que es lo que arma la página `/formularios`:

```ts
{
  id: "declaracion-jurada",
  title: "…",
  description: "…",
  category: "afiliacion",
  href: "/pdfs/declaracion-jurada.pdf",
}
```

La única referencia directa fuera de ese módulo es la cartilla, enlazada desde
`src/app/prestadores/page.tsx`.

## Reglas

- **Nombres sin espacios, sin paréntesis y sin acentos.** Un nombre con espacios obliga a
  URL-encodearlo en el `href` y se rompe distinto en cada lugar. Los archivos que llegan de la
  obra social con nombres así se renombran al subirlos (así nació `resumen-cartilla-2026.pdf`,
  que llegó como `cartilla 2026 6 (resumen).pdf`).
- **Los nombres en MAYÚSCULAS son legado** de los archivos originales; se respetan tal cual
  porque ya están enlazados. Para un PDF nuevo usá kebab-case en minúsculas.
- **Subí el PDF antes de referenciarlo.** `tests/content.test.ts` verifica que todo `href` a
  `/pdfs/` exista en esta carpeta, y `tests/build-output.test.ts` que todo `/pdfs/*.pdf`
  referenciado en el HTML exista en `out/`. `npm run verify` los corre.
- **Borrar el archivo del repo NO lo saca de producción.** El deploy sube pero nunca borra: hay
  que agregar la ruta (`pdfs/<archivo>.pdf`) a `scripts/prune-list.txt` y correr la acción
  `prune`. Ver la sección de deploy del README raíz.
- **Todo lo que está en `public/` se publica**, este README incluido. Nada sensible acá.
- Los PDFs pesan: hay un test que le pone un techo al peso total de `out/`. Si vas a sumar un
  archivo grande, fijate de comprimirlo primero.
