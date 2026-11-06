# CLAUDE.md

Guidance for Claude Code when working in this repository. See `AGENTS.md` for
the shared rules every coding agent follows; this file adds Claude-specific
notes and a quick reference.

## Project in one paragraph

SongCraft AI is a Next.js 15 (App Router) + React 19 + TypeScript app. Only
credentials auth is real (Auth.js v5 + Prisma + Postgres). The dashboard pages
are UI prototypes with hard-coded data and the transcription flow is simulated
with timers. Do not describe prototype features as working in code comments,
docs or commit messages.

## Commands

```bash
yarn install                 # Yarn 1 (classic); keep yarn.lock, never add package-lock.json
yarn dev                     # docker Postgres up -> wait -> prisma migrate dev -> next dev
yarn tsc --noEmit            # type-check (must pass before every commit)
yarn lint                    # ESLint flat config (must pass before every commit)
yarn build                   # production build (must pass before every commit)
yarn prisma:migrate:dev      # create/apply migrations after editing prisma/schema.prisma
yarn database:up | database:stop | database:down
```

There is no test suite yet. When tests are added, run them before committing
as well.

`infra/env.ts` validates the environment at import time. Without a valid
`.env` (copy `.env.example`, generate `AUTH_SECRET`) the build fails; use
`SKIP_ENV_VALIDATION=1` only for tooling such as CI builds.

## Where things live

- `auth.ts` – Auth.js instance (Prisma adapter, JWT session, jwt/session callbacks)
- `auth.config.ts` – edge-safe config with the Credentials provider (also used by the proxy)
- `routes.ts` – public routes, auth routes, API auth prefix, default redirect
- `src/proxy.ts` – route protection (Next 16 proxy, formerly middleware)
- `src/actions/<name>/index.ts` – Server Actions (`"use server"`)
- `src/schemas/<name>/index.ts` – Zod schemas shared by actions and auth
- `src/repositories/` – Prisma queries
- `infra/` – env validation, Prisma client, scripts
- `src/app/(protected)/_components/` – dashboard screens (prototypes)

## Working notes

- Follow the conventions and commit rules in `AGENTS.md`.
- User-facing strings are in Brazilian Portuguese; code, comments and commits in English.
- Verify package versions with `npm view <pkg> version` instead of guessing.
- Never read or print the contents of `.env`; it holds local secrets.
