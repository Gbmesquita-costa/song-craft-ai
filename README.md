# SongCraft AI

Plataforma web (em desenvolvimento) para transformar músicas em material de
estudo: transcrição, biblioteca de músicas, modo prática e acompanhamento de
progresso.

> **Estado atual:** o projeto está no início. Autenticação por e-mail e senha
> funciona de ponta a ponta com Postgres e o **afinador em tempo real** do Modo
> Prática é real (microfone + detecção de notas no navegador). As demais telas
> do dashboard são protótipos de interface com dados fixos e a transcrição é
> **simulada**. A seção [O que está implementado](#o-que-está-implementado)
> detalha cada parte.

## O que está implementado

| Área | Situação |
| --- | --- |
| Landing page (`/`) | Implementada (conteúdo estático: hero, features, preços, depoimentos de exemplo) |
| Cadastro (`/signup`) | Implementado: validação com Zod, senha com bcrypt, usuário salvo no Postgres via Prisma |
| Login (`/signin`) | Implementado: Auth.js (NextAuth v5) com provider Credentials e sessão JWT |
| Logout | Implementado (server action) |
| Proteção de rotas | Implementada no `src/proxy.ts` (rotas públicas, de auth e protegidas em `routes.ts`) |
| Papel do usuário (`ADMIN`/`USER`) | Salvo no banco e propagado para o JWT e a sessão; ainda não há tela que dependa dele |
| Validação de variáveis de ambiente | Implementada com Zod em `infra/env.ts`; a app não sobe com `.env` inválido |
| Recuperar senha (`/forgot-password`) | **Não implementado**: a página informa isso; não existe token de reset nem envio de e-mail |
| Dashboard, Minhas Músicas, Progresso, Configurações | **Protótipo de UI** com dados fixos definidos nos próprios componentes (ex.: `mockData`, `mockSongs`); nada é lido ou salvo no banco |
| Nova Transcrição | **Simulada**: o arquivo escolhido não é enviado a lugar nenhum; as etapas de "processamento" são temporizadores de 2 s |
| Afinador (Modo Prática) | **Implementado**: microfone via Web Audio API e detecção de notas (YIN) no navegador; veja [Afinador](#afinador-em-tempo-real) |
| Resto do Modo Prática | **Protótipo de UI** (partitura, player, seções, metas e estatísticas usam dados fixos) |
| Pagamentos | **Não implementado** (o pacote `stripe` está nas dependências, mas não é usado) |
| Login social (Google etc.) | **Não implementado** (os botões do Google aparecem nas telas de auth, mas não fazem nada) |
| Lint | ESLint 10 com flat config (`eslint.config.mjs`, regras do `eslint-config-next`) |
| Testes automatizados | Vitest (unitários) e Playwright (e2e no Chromium); veja [Testes](#testes) |
| CI/CD | GitHub Actions: checks em todo push/PR para `main` e `staging`; deploy na Vercel **configurado, mas só roda quando os secrets da Vercel existirem**; veja [CI/CD](#cicd) |

## Stack

- **Next.js 16** (App Router, Server Actions) + **React 19** + **TypeScript**
- **Tailwind CSS 4**, componentes no estilo shadcn/ui sobre **Radix UI**, **Framer Motion**
- **Auth.js / NextAuth v5 (beta)** com `@auth/prisma-adapter`
- **Prisma 6** + **PostgreSQL 17** (via Docker Compose em desenvolvimento)
- **Zod 4** para validação de formulários e do ambiente

## Afinador em tempo real

No Modo Prática (`/dashboard/practice`), o card **Afinador** usa o microfone
para mostrar a nota tocada ou cantada, a frequência, o desvio em cents
(±50), um ponteiro e a forma de onda ao vivo. Dentro de ±5 cents a nota
aparece como "Afinado".

- **Tudo roda no navegador.** O áudio não é gravado nem enviado a servidor
  algum, e não há custo de API ou de IA.
- **Algoritmo:** YIN (de Cheveigné & Kawahara, 2002) em TypeScript puro, em
  `src/lib/audio/pitch.ts`, com faixa de 60 Hz a 1500 Hz e referência
  A4 = 440 Hz. A leitura passa por uma mediana curta para não oscilar.
- **Microfone:** `getUserMedia` com cancelamento de eco, supressão de ruído
  e ganho automático desligados, porque eles distorcem a altura do som.
  Permissão negada, falta de microfone e navegador sem suporte (é preciso
  HTTPS ou `localhost`) mostram mensagens próprias. O microfone é liberado
  ao parar e ao sair da página.
- **Limites:** detecta uma nota por vez (monofônico); acordes e notas abaixo
  de 60 Hz (como a corda Si de um baixo de 5 cordas) não são suportados. Os
  dados de progresso ao redor do afinador continuam fictícios.

## Como rodar localmente

Pré-requisitos: Node.js 20.9+, Yarn 1 (classic) e Docker com Docker Compose.

```bash
# 1. Dependências
yarn install

# 2. Variáveis de ambiente
cp .env.example .env
# Gere um AUTH_SECRET real (o placeholder do exemplo é recusado na inicialização):
npx auth secret        # ou: openssl rand -base64 32

# 3. Sobe o Postgres, espera ficar pronto, aplica as migrations e inicia o Next
yarn dev
```

Acesse http://localhost:3000, crie uma conta em `/signup` e entre em `/signin`.

O `yarn dev` executa, em sequência, `database:up` → `wait-for-postgres` →
`prisma migrate dev` e depois `next dev` (via `postdev`).

> Se você já tinha um volume local criado com a imagem antiga
> `bitnami/postgresql`, remova-o uma vez (`docker compose down -v`), pois o
> diretório de dados da imagem oficial do Postgres é diferente.

### Variáveis de ambiente

Todas estão documentadas em [`.env.example`](./.env.example):

| Variável | Uso |
| --- | --- |
| `DATABASE_URL` | Conexão do Prisma (`postgresql://...`) |
| `POSTGRES_*` | Usuário, senha, banco, host e porta do container local |
| `AUTH_SECRET` | Segredo do Auth.js (mínimo 32 caracteres, nunca commitar) |
| `SKIP_ENV_VALIDATION` | Opcional. `1` pula a validação do ambiente; só para ferramentas como um `next build` em CI sem segredos |

## Scripts

| Comando | O que faz |
| --- | --- |
| `yarn dev` | Sobe o banco, aguarda, roda migrations e inicia `next dev` |
| `yarn build` | Build de produção do Next.js |
| `yarn start` | Serve o build de produção |
| `yarn typecheck` | Gera os tipos de rotas do Next (`next typegen`) e roda `tsc --noEmit` |
| `yarn lint` | ESLint em todo o projeto |
| `yarn test` / `yarn test:watch` | Testes unitários com Vitest (uma vez / modo watch) |
| `yarn test:e2e` | Testes end-to-end com Playwright (faz `next build` + `next start` na porta 3100) |
| `yarn prisma:migrate:dev` | `prisma migrate dev` |
| `yarn database:up` / `database:stop` / `database:down` | Controla o container do Postgres |
| `yarn wait-for-postgres` | Aguarda o container aceitar conexões |

## Testes

Os testes **não precisam de banco de dados** nem de `.env`.

```bash
yarn test                            # unitários (Vitest)
npx playwright install chromium      # uma vez, baixa o navegador
yarn test:e2e                        # end-to-end (Playwright)
```

- **Unitários** (`*.test.ts(x)` ao lado do código): o detector de notas
  (`src/lib/audio/pitch.test.ts`, com senoides sintetizadas das cordas do
  violão, tons com harmônicos, ruído e silêncio), o componente do afinador
  (Web Audio API falsa, permissão negada, liberação do microfone), schemas
  Zod de login e cadastro, a lógica do `authorize`
  (`src/lib/auth/authorize-credentials.ts`, com o repositório de usuários
  mockado), as regras de acesso de rotas
  (`getRouteRedirect` em `routes.ts`), a validação do ambiente
  (`infra/env.ts`), `cn` e os banners de erro/sucesso dos formulários (jsdom
  + Testing Library).
- **E2E** (`e2e/`): a landing page renderiza e leva a `/signin` e
  `/signup`; os formulários mostram os erros de validação devolvidos pelas
  server actions; visitantes sem sessão que abrem `/dashboard` vão para
  `/signin`; o afinador recebe um tom G3 gerado como microfone falso do
  Chromium e mostra G3 / 196 Hz / "Afinado". O servidor de teste recebe
  variáveis descartáveis e um `DATABASE_URL` apontando para uma porta
  fechada. Telas protegidas são abertas com um cookie de sessão JWT assinado
  com o segredo de teste (`e2e/support/session.ts`), sem passar pelo login.
  Por isso **cadastro e login com sucesso não são testados** ainda.

Requisitos: o Vitest 5 exige **Node.js 22.12+** (a app em si roda com 20.9+).
No Windows, rode os testes num terminal cujo diretório atual use a letra do
drive em maiúscula (`C:\...`); com `c:\...` o Vitest carrega o projeto duas
vezes e as suítes falham com `Cannot read properties of undefined`.

## CI/CD

Fluxo de branches: todo trabalho entra em `staging`; `main` só recebe
merges revisados de `staging` e representa produção.

- **CI** (`.github/workflows/ci.yml`), em todo push e pull request para
  `main` e `staging`, com Node 22 e cache do Yarn:
  - job de checks: `yarn lint`, `yarn typecheck`, `yarn test` e
    `yarn build` (com variáveis descartáveis; o build não acessa o banco);
  - job de e2e: instala o Chromium e roda `yarn test:e2e`; se falhar, o
    relatório do Playwright fica disponível como artifact por 7 dias.
- **Deploy** (`.github/workflows/deploy.yml`), chamado pelo CI só depois que
  os dois jobs passam, e só em push:
  - `staging` → deploy de preview na Vercel, ambiente `staging` do GitHub;
  - `main` → deploy de produção na Vercel, ambiente `production`.
  - Enquanto `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` não
    estiverem nos secrets do repositório (ou dos ambientes), o job apenas
    emite um aviso e termina sem deploy. **Hoje nenhum deploy é feito.**
  - As variáveis da aplicação (`DATABASE_URL`, `AUTH_SECRET`) vêm das
    configurações do projeto na Vercel, não do repositório; sem elas o build
    falha na validação de `infra/env.ts`.
- **Dependabot** (`.github/dependabot.yml`): PRs semanais de npm
  (minor/patch agrupados) e mensais de GitHub Actions, com destino
  `staging`. O GitHub só lê esse arquivo na branch padrão, então ele passa a
  valer depois do primeiro merge em `main`.

## Arquitetura

```
auth.ts / auth.config.ts   Auth.js: provider Credentials, callbacks jwt/session, Prisma adapter
routes.ts                  Rotas públicas/de auth e getRouteRedirect (regras de acesso)
infra/
  env.ts                   Validação das variáveis de ambiente (Zod)
  database.ts              PrismaClient singleton
  scripts/                 wait-for-postgres
prisma/                    schema.prisma (User, Account) e migrations
src/
  proxy.ts                 Redireciona visitantes e usuários logados conforme routes.ts
  lib/auth/                authorizeCredentials (checagem de e-mail e senha do login)
  lib/audio/               Detecção de notas (YIN) e conversão frequência → nota/cents
  actions/                 Server Actions: signin-user, signup-user, logout-user
  schemas/                 Schemas Zod dos formulários de auth
  repositories/            Acesso a dados (getUserByEmail, getUserById)
  app/
    (auth)/                signin, signup, forgot-password
    (protected)/dashboard  Telas do dashboard (protótipos com dados fixos, exceto o afinador)
    api/auth/[...nextauth] Handlers do Auth.js
  components/              UI (ui/ = componentes base, auth/, home/, layouts/, practice/tuner)
  providers/               Layout protegido (sidebar) e tema
e2e/                       Testes end-to-end (Playwright) e helpers em e2e/support
.github/                   Workflows de CI e deploy, Dependabot
```

Fluxo de login: o formulário chama a server action `handleSigninUser`, que
valida com Zod e chama `signIn("credentials")`. O `authorize` busca o usuário
pelo e-mail (normalizado em minúsculas), compara a senha com bcrypt e devolve
apenas os dados públicos do perfil. O callback `jwt` adiciona o papel do
usuário ao token e o `session` o expõe na sessão.

A pasta `docs/` contém notas de planejamento antigas (setup com Google OAuth,
lista de telas planejadas) que **não** refletem o código atual.

## Licença

[MIT](./LICENSE)
