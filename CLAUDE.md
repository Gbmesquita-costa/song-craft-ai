# CLAUDE.md

Guidance for Claude Code when working in this repository. See `AGENTS.md` for
the shared rules every coding agent follows; this file adds Claude-specific
notes and a quick reference.

## Project in one paragraph

SongCraft AI is a Next.js 16 (App Router) + React 19 + TypeScript app. Only
credentials auth (Auth.js v5 + Prisma + Postgres) and the real-time tuner on
the practice page (microphone + YIN pitch detection in the browser) are real.
The rest of the dashboard is UI prototypes with hard-coded data and the
transcription flow is simulated with timers. Do not describe prototype
features as working in code comments, docs or commit messages.

## Commands

```bash
yarn install                 # Yarn 1 (classic); keep yarn.lock, never add package-lock.json
yarn dev                     # docker Postgres up -> wait -> prisma migrate dev -> next dev
yarn typecheck               # next typegen + tsc --noEmit (must pass before every commit)
yarn lint                    # ESLint flat config (must pass before every commit)
yarn build                   # production build (must pass before every commit)
yarn test                    # Vitest unit tests, no database needed (must pass before every commit)
yarn test:e2e                # Playwright e2e against next build + start on :3100, no database needed
yarn prisma:migrate:dev      # create/apply migrations after editing prisma/schema.prisma
yarn database:up | database:stop | database:down
```

Vitest 5 needs Node.js 22.12+. On Windows run it from a cwd with an uppercase
drive letter (`C:\...`); a lowercase `c:\...` cwd makes every suite fail with
`Cannot read properties of undefined (reading 'config')`.

`infra/env.ts` validates the environment at import time. Without a valid
`.env` (copy `.env.example`, generate `AUTH_SECRET`) the build fails; use
`SKIP_ENV_VALIDATION=1` only for tooling such as CI builds.

## Where things live

- `auth.ts` – Auth.js instance (Prisma adapter, JWT session, jwt/session callbacks)
- `auth.config.ts` – shared config with the Credentials provider (also used by the proxy, which runs on Node.js)
- `routes.ts` – route lists and `getRouteRedirect`, the pure access rules used by the proxy
- `src/proxy.ts` – route protection (Next 16 proxy, formerly middleware)
- `src/actions/<name>/index.ts` – Server Actions (`"use server"`)
- `src/schemas/<name>/index.ts` – Zod schemas shared by actions and auth
- `src/repositories/` – Prisma queries
- `src/lib/auth/authorize-credentials.ts` – credentials check behind Auth.js `authorize`
- `src/lib/audio/pitch.ts` – YIN pitch detection and frequency -> note/cents (pure, no browser APIs)
- `src/components/practice/tuner/` – tuner card and `usePitchDetector` (getUserMedia + Web Audio)
- `e2e/` – Playwright specs (`e2e/support/` has the JWT session and fake-mic tone helpers); unit tests sit next to the code as `*.test.ts(x)`
- `.github/workflows/` – `ci.yml` (checks + e2e) calls `deploy.yml` (Vercel, skipped without secrets)
- `infra/` – env validation, Prisma client, scripts
- `src/app/(protected)/_components/` – dashboard screens (prototypes, except the tuner card)

## Working notes

- Follow the conventions and commit rules in `AGENTS.md`.
- User-facing strings are in Brazilian Portuguese; code, comments and commits in English.
- Verify package versions with `npm view <pkg> version` instead of guessing.
- Never read or print the contents of `.env`; it holds local secrets.
