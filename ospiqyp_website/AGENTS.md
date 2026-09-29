<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OSPIQYP — instrucciones del repo

Hereda el contrato global (`~/.claude/AGENTS.md`): evidencia antes de "listo", hard stops, alcance.
Acá va sólo lo propio de este repo.

## Comandos (de `package.json`)

```bash
npm run dev            # servidor de desarrollo (http://localhost:3000)
npm run build          # export estático en out/
npm run lint           # eslint
npm test               # vitest run (toda la suite; la capa build-output necesita out/)
npm run test:fast      # contenido + lib + componentes, sin build
npm run test:coverage  # cobertura v8
npm run verify         # tsc --noEmit + eslint + test:fast + test:build — obligatorio antes de deployar
```

`npm start` no aplica (export estático, sin servidor Node).

## Dónde está cada cosa

- Qué tiene que hacer el sitio: [`docs/SRS.md`](docs/SRS.md) · trazabilidad RF → test:
  [`docs/SRS-matriz.md`](docs/SRS-matriz.md). Un cambio de comportamiento actualiza las dos.
- Estructura, deploy (manual, FTPS a cPanel) y gotchas: [`README.md`](README.md).
