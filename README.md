# SongCraft AI

Plataforma web (em desenvolvimento) para transformar músicas em material de
estudo: transcrição, biblioteca de músicas, modo prática e acompanhamento de
progresso.

> **Estado atual:** o projeto está no início. Autenticação por e-mail e senha
> funciona de ponta a ponta com Postgres; as telas do dashboard são protótipos
> de interface com dados fixos e a transcrição é **simulada**. A seção
> [O que está implementado](#o-que-está-implementado) detalha cada parte.

## O que está implementado

| Área | Situação |
| --- | --- |
| Landing page (`/`) | Implementada (conteúdo estático: hero, features, preços, depoimentos de exemplo) |
| Cadastro (`/signup`) | Implementado: validação com Zod, senha com bcrypt, usuário salvo no Postgres via Prisma |
| Login (`/signin`) | Implementado: Auth.js (NextAuth v5) com provider Credentials e sessão JWT |
| Logout | Implementado (server action) |
| Proteção de rotas | Implementada no `src/middleware.ts` (rotas públicas, de auth e protegidas em `routes.ts`) |
| Papel do usuário (`ADMIN`/`USER`) | Salvo no banco e propagado para o JWT e a sessão; ainda não há tela que dependa dele |
| Validação de variáveis de ambiente | Implementada com Zod em `infra/env.ts`; a app não sobe com `.env` inválido |
| Recuperar senha (`/forgot-password`) | **Não implementado**: a página informa isso; não existe token de reset nem envio de e-mail |
| Dashboard, Minhas Músicas, Progresso, Configurações | **Protótipo de UI** com dados fixos definidos nos próprios componentes (ex.: `mockData`, `mockSongs`); nada é lido ou salvo no banco |
| Nova Transcrição | **Simulada**: o arquivo escolhido não é enviado a lugar nenhum; as etapas de "processamento" são temporizadores de 2 s |
| Modo Prática | **Protótipo de UI**, sem áudio ou detecção de notas |
| Pagamentos | **Não implementado** (o pacote `stripe` está nas dependências, mas não é usado) |
| Login social (Google etc.) | **Não implementado** |
| Testes automatizados, lint e CI | **Ainda não configurados** |

## Stack

- **Next.js 15** (App Router, Server Actions) + **React 19** + **TypeScript**
- **Tailwind CSS 4**, componentes no estilo shadcn/ui sobre **Radix UI**, **Framer Motion**
- **Auth.js / NextAuth v5 (beta)** com `@auth/prisma-adapter`
- **Prisma 6** + **PostgreSQL 17** (via Docker Compose em desenvolvimento)
- **Zod 4** para validação de formulários e do ambiente

## Como rodar localmente

Pré-requisitos: Node.js 20+, Yarn 1 (classic) e Docker com Docker Compose.

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
| `yarn tsc --noEmit` | Checagem de tipos |
| `yarn prisma:migrate:dev` | `prisma migrate dev` |
| `yarn database:up` / `database:stop` / `database:down` | Controla o container do Postgres |
| `yarn wait-for-postgres` | Aguarda o container aceitar conexões |

`yarn lint` existe no `package.json`, mas o ESLint ainda não está configurado.

## Arquitetura

```
auth.ts / auth.config.ts   Auth.js: provider Credentials, callbacks jwt/session, Prisma adapter
routes.ts                  Rotas públicas, de autenticação e redirect padrão
infra/
  env.ts                   Validação das variáveis de ambiente (Zod)
  database.ts              PrismaClient singleton
  scripts/                 wait-for-postgres
prisma/                    schema.prisma (User, Account) e migrations
src/
  middleware.ts            Redireciona visitantes e usuários logados conforme routes.ts
  actions/                 Server Actions: signin-user, signup-user, logout-user
  schemas/                 Schemas Zod dos formulários de auth
  repositories/            Acesso a dados (getUserByEmail, getUserById)
  app/
    (auth)/                signin, signup, forgot-password
    (protected)/dashboard  Telas do dashboard (protótipos com dados fixos)
    api/auth/[...nextauth] Handlers do Auth.js
  components/              UI (ui/ = componentes base, auth/, home/, layouts/)
  providers/               Layout protegido (sidebar) e tema
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
