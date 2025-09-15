# Next.js RBAC Example

This example demonstrates a basic RBAC (Role Based Access Control) setup using:

- Next.js 15 App Router
- Auth.js (NextAuth) with credential authentication and JWT sessions
- Prisma ORM
- Simple shadcn-style UI components

## Setup

```bash
pnpm install
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

- Visit `/register` to create a user (default `USER` role).
- Login via `/login`.
- Admin panel is available at `/admin` for users with the `ADMIN` role.

## Docker

A development docker-compose setup is provided:

```bash
docker compose -f docker-compose.dev.yml up
```

## Tests

```bash
pnpm test
```
