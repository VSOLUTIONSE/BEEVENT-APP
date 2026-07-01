# BeeVelt Halls - Event Centre Booking

Built with Vite + React + Hono/tRPC + Drizzle ORM + Neon (Postgres)

## Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v3.4, shadcn/ui
- **Backend:** Hono (server), tRPC (API layer)
- **Database:** Neon (Postgres) via Drizzle ORM
- **Auth:** JWT-based (email + password)

## Setup
1. Copy `.env.example` to `.env` and fill in your Neon DATABASE_URL and JWT_SECRET
2. Run `npm run db:generate` to generate migrations
3. Run `npm run db:migrate` to apply migrations
4. Run `npm run dev` to start the dev server

## Structure
- `src/` — React frontend
- `api/` — Hono server + tRPC routers
- `db/` — Drizzle schema and migrations
- `contracts/` — Shared types and constants
