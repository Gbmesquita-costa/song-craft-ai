# AGENTS.md

Rules for any coding agent (and human) changing this repository.

## Setup and checks

- Package manager: **Yarn 1** (`yarn.lock`). Do not use npm/pnpm to install.
- Local database: `yarn database:up` (Docker, `postgres:17.11-alpine`).
- Environment: copy `.env.example` to `.env` and generate `AUTH_SECRET`
  (`npx auth secret`). `infra/env.ts` rejects missing or placeholder values.
- Before every commit, all of these must pass:
  - `yarn typecheck`
  - `yarn lint`
  - `yarn build`
  - the test commands, once they exist in `package.json`

## Architecture

- Next.js App Router under `src/app`, with route groups `(auth)` and `(protected)`.
- Auth: Auth.js v5. `auth.config.ts` holds the provider config shared with the
  proxy (`src/proxy.ts`); `auth.ts` adds the Prisma adapter and callbacks.
  Route lists live in `routes.ts`.
- Mutations go through Server Actions in `src/actions/<action-name>/index.ts`.
  Validate input with a Zod schema from `src/schemas/<schema-name>/index.ts`
  and return field errors from `error.flatten()` like the existing actions.
- Database access goes through `src/repositories/` using the Prisma client
  from `infra/database.ts`. Schema changes need a Prisma migration in
  `prisma/migrations` (`yarn prisma:migrate:dev`).
- Read environment variables through `env` from `infra/env.ts`, and add every
  new variable to both the Zod schema there and `.env.example`.

## Conventions

- TypeScript strict; prefer `const` arrow functions and named exports at the
  bottom of the file (`export { handleSigninUser };`), matching existing code.
- Imports: `@/` maps to `src/`; root files (`auth.ts`, `routes.ts`, `infra/`)
  are imported relatively or through `@/../`.
- UI text is Brazilian Portuguese; identifiers, comments and docs for
  developers are English.
- UI primitives live in `src/components/ui` (shadcn/ui style); reuse them.
- Never return or log password hashes or other secrets; `authorize` returns
  only public profile fields.
- Mark mocked or simulated behavior clearly (the dashboard data and the
  transcription flow are currently prototypes). Docs must not claim features
  that the code does not implement.

## Commits and branches

- Work on `staging`; `main` is only updated through reviewed merges. Never
  force-push or rewrite published history.
- One logical change per commit, in **Conventional Commits** format
  (`feat:`, `fix:`, `docs:`, `build:`, `chore:`, `test:`, `refactor:`), in
  English, with a short body explaining **why**.
- Every commit must type-check and build on its own.
- Stage files explicitly and review `git diff --cached` before committing.
  Never commit `.env*` (except `.env.example`), keys, tokens, `node_modules`,
  `.next`, coverage or test reports.
