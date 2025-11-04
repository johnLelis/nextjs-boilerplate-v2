# Next.js Boilerplate V2

A production-ready Next.js starter kit focused on authentication, email delivery, and developer ergonomics. The project integrates Better Auth, Drizzle ORM, Tailwind-based UI primitives, email templates, and testing/linting pipelines to accelerate building secure web applications.

## Table of contents

- [Project overview](#project-overview)
- [Architecture](#architecture)
- [Key technologies](#key-technologies)
- [Repository layout (high level)](#repository-layout-high-level)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Authentication and email](#authentication-and-email)
- [Database and migrations](#database-and-migrations)
- [Testing and linting](#testing-and-linting)
- [UI components and patterns](#ui-components-and-patterns)
- [Scripts and maintenance tasks](#scripts-and-maintenance-tasks)
- [Contributing](#contributing)
- [References](#references)

## Project overview

This repository provides a modern Next.js (v15) application scaffold with:

- Full-featured authentication powered by Better Auth.
- Email templates and a pluggable email service.
- Drizzle ORM for PostgreSQL schema and migrations.
- Reusable UI primitives and component-first layout.
- Integrated tooling: ESLint, Prettier, Vitest, Husky, lint-staged.

## Architecture

- Next.js App Router provides server and client components.
- Better Auth handles user lifecycle: registration, sessions, passkeys, 2FA, social providers.
  - Auth configuration and hooks live in [`src/lib/auth/auth.ts`](src/lib/auth/auth.ts) and usage via [`authClient`](src/lib/auth/auth-client.ts).
- Emails are rendered via React-based templates and sent through provider adapters (`azure`, `postmark`, `sendgrid`) implemented under [`src/services/email`](src/services/email).
  - Core API surfaces: [`sendEmail`](src/services/email/email-service.ts) and [`getEmailConfigFromEnv`](src/services/email/email-service.ts).
- Database access is provided by Drizzle via the exported [`db`](src/drizzle/db.ts) with schema re-exports in [`src/drizzle/index.ts`](src/drizzle/index.ts).
- Environment validation and loading are centralized in [`src/config/env.ts`](src/config/env.ts).

## Key technologies

- Next.js 15 (App Router)
- React 19
- Better Auth (auth features and plugins)
- Drizzle ORM / drizzle-kit (Postgres)
- Tailwind CSS + shadcn-style UI primitives
- TypeScript
- Vitest + Testing Library
- ESLint, Prettier, Husky + lint-staged

## Repository layout (high level)

- src/
  - app/ — Next.js app routes and layouts ([`src/app/layout.tsx`](src/app/layout.tsx), [`src/app/page.tsx`](src/app/page.tsx))
  - lib/ — core utilities and auth configuration ([`src/lib/auth/auth.ts`](src/lib/auth/auth.ts), [`src/lib/auth/auth-client.ts`](src/lib/auth/auth-client.ts))
  - drizzle/ — schema and migration configuration ([`drizzle.config.ts`](drizzle.config.ts), [`src/drizzle/db.ts`](src/drizzle/db.ts))
  - services/email — email service and provider adapters ([`src/services/email/email-service.ts`](src/services/email/email-service.ts), [`src/services/email/providers/azure/azure-provider.ts`](src/services/email/providers/azure/azure-provider.ts))
  - components/ — UI primitives and component library (e.g., [`src/components/ui/dynamic-form.tsx`](src/components/ui/dynamic-form.tsx), [`src/components/ui/loading-swap.tsx`](src/components/ui/loading-swap.tsx))
  - emails/ — email templates (e.g. [`src/emails/verify-email.tsx`](src/emails/verify-email.tsx), [`src/emails/welcome-email.tsx`](src/emails/welcome-email.tsx))
- config and tooling: [`next.config.ts`](next.config.ts), [`tsconfig.json`](tsconfig.json), [`components.json`](components.json)

## Getting started

Prerequisites

- Node.js (recommended LTS)
- PostgreSQL (or compatible database)
- Environment variables configured (see [`env.example`](env.example))

Clone and install

```sh
git clone <repo-url>
cd nextjs-boilerplate-v2
npm install
```

Environment

Copy and populate environment variables from env.example:
Database: DATABASE*URL, DB*\*
Better Auth: BETTER_AUTH_SECRET, BETTER_AUTH_URL
Optional email provider settings (e.g., Azure) shown in env.example
Run locally

The default dev server runs on http://localhost:3000.

## Environment variables

A concrete example and recommended variables are provided at env.example. Environment schema and validation are implemented in src/config/env.ts. Ensure required variables such as DATABASE_URL and BETTER_AUTH_SECRET are present before starting the application.

## Authentication and email

Authentication is configured in src/lib/auth/auth.ts. The server-side API route adapter for Better Auth is implemented at src/app/api/auth/[...all]/route.ts.

Client integration is exposed through authClient.

Email sending uses the wrapper at src/services/email/email-service.ts. Provider implementations live under src/services/email/providers; an Azure provider is available at src/services/email/providers/azure/azure-provider.ts.

Email templates are React components under src/emails (e.g. src/emails/verify-email.tsx, src/emails/reset-password.tsx, src/emails/welcome-email.tsx, src/emails/otp-email.tsx) and are rendered and sent via utilities in src/lib/utils.

## Database and migrations

Drizzle configuration is in drizzle.config.ts. The database client export is db and schema exports are aggregated in src/drizzle/index.ts.

Common tasks:

Generate schema: npm script auth:generate (see package.json)
Migrate / generate: npm run db:migrate, npm run db:generate (see package.json)
Ensure DATABASE_URL is set before running migration tasks.

## Testing and linting

Unit and component tests use Vitest configured in vitest.config.mts with setup at vitest.setup.ts.
ESLint configuration is provided in eslint.config.mjs. Formatting is handled by Prettier with rules in .prettierrc.json.
Pre-commit checks run via Husky; see .husky/pre-commit and lint-staged config in package.json.
Run tests:

Run coverage:

Lint and format:

## UI components and patterns

UI primitives are implemented in src/components/ui. Examples:

Dynamic forms component: DynamicForm
Loading swap utility: LoadingSwap
Card, Badge, Button, and other primitives are available in the same directory and follow shadcn-inspired conventions configured in components.json.
Application layouts:

Global app layout: src/app/layout.tsx
Main application layout: src/app/(main)/layout.tsx
Auth layout: src/app/(auth)/layout.tsx
Home page: src/app/page.tsx

## Scripts and maintenance tasks

Primary scripts live in package.json. Important scripts:

npm run dev — start development server
npm run build — production build
npm run start — start production server
npm run db:migrate, db:generate, db:push — Drizzle tasks
npm run test — run vitest
Refer to the script section in package.json for full details.

## Contributing

Follow repository coding standards and linting rules.
Pre-commit hooks enforce formatting and linting via Husky and lint-staged (.husky/pre-commit and package.json).
For database schema changes, use drizzle-kit commands defined in package.json.
Add tests for new or changed features; Vitest is configured for both unit and DOM testing.
Troubleshooting
Server fails to start: verify environment variables using env.example and the validation in src/config/env.ts.
Auth issues: confirm Better Auth URL/secret and inspect server logs for the API route at src/app/api/auth/[...all]/route.ts.
Email delivery: check provider configuration and the selected provider in environment variables used by getEmailConfigFromEnv.

## References

Project manifest: package.json
Next config: next.config.ts
TypeScript config: tsconfig.json
ESLint config: eslint.config.mjs
Component registry: components.json
Drizzle DB export: src/drizzle/db.ts
Better Auth core: src/lib/auth/auth.ts
Client auth wrapper: src/lib/auth/auth-client.ts
Email service: src/services/email/email-service.ts
Azure email adapter: src/services/email/providers/azure/azure-provider.ts
Email templates: src/emails/verify-email.tsx, src/emails/welcome-email.tsx, src/emails/reset-password.tsx, src/emails/otp-email.tsx
Dynamic form utility: src/components/ui/dynamic-form.tsx
Loading swap UI helper: src/components/ui/loading-swap.tsx
App entry points: src/app/layout.tsx, src/app/page.tsx
Environment example: env.example
Vitest config: vitest.config.mts, vitest.setup.ts
For additional context, consult the source tree and the files referenced above.

## ESLint: file boundary rules

Purpose

- Enforce clear import boundaries between logical parts of the codebase (for example: app, components, services, lib).
- Reduce coupling and make architectural layers explicit and auditable by CI and local lint runs.

Where the rules live

- eslint.config.mjs — the repository’s ESLint configuration. Boundary rules are typically implemented with plugins such as eslint-plugin-boundaries (or equivalent) and configured in the rules section for the project's file patterns.

How the rules work (summary)

- Define element types by path patterns (for example: `src/app/**`, `src/components/**`, `src/lib/**`).
- Declare allowed import relationships — which element types may import from which other types.
- ESLint reports a violation when a file in one element type imports from a disallowed element type.
- Violations surface in local lint runs, CI, and pre-commit hooks.

Example configuration shape (inserted into eslint.config.mjs)

- This illustrates the structure used by boundary-style rules; adapt patterns and allow lists to match the repository layout.

  {
  files: ["src/**/*.{ts,tsx,js,jsx}"],
  plugins: {
  boundaries: await import("eslint-plugin-boundaries")
  },
  rules: {
  "boundaries/element-types": [
  "error",
  {
  default: "disallow",
  types: [
  { name: "app", pattern: "src/app/**" },
  { name: "components", pattern: "src/components/**" },
  { name: "lib", pattern: "src/lib/**" },
  { name: "services", pattern: "src/services/**" }
  ],
  rules: [
  { from: ["src/app/**"], allow: ["src/components/**", "src/lib/**", "src/services/**"] },
  { from: ["src/components/**"], allow: ["src/lib/**"] },
  { from: ["src/services/**"], allow: ["src/lib/**"] },
  { from: ["src/lib/**"], allow: ["src/lib/**"] }
  ]
  }
  ]
  }
  }

Validation and debugging

- Run the linter:
  - npm run lint
  - or npx eslint "src/\*_/_.{ts,tsx,js,jsx}"
- Test a specific file:
  - npx eslint src/path/to/file.tsx
- If a rule is too strict, update patterns or allow entries in eslint.config.mjs, then re-run the linter.

Recommendations for changes

- Keep element types coarse-grained and aligned to architectural boundaries (app, components, services, lib).
- Prefer "allow" lists that express intended dependencies rather than ad-hoc exceptions.
- Add unit tests or lint-staged checks if introducing new directories that should be subject to the boundary rules.

Reference

- See eslint.config.mjs in the repository for the exact rule names and patterns currently enforced.
