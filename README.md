# BeeVelt Halls — Event Centre Booking Platform

A full-stack event venue booking platform for managing reservations, packages, add-on services, payments, and staff operations.

## Features

- **Venue showcase** — Home page with hero, venue details, packages, and availability calendar
- **Multi-step booking** — Select a date, choose a package, add extras, and pay — all in one flow
- **User authentication** — JWT-based email/password signup and login
- **User dashboard** — View your bookings, check status, and manage profile settings
- **Admin dashboard** — Oversee all bookings, approve or reject requests, view revenue analytics and monthly trends
- **Staff management** — Assign roles (staff, manager, accountant, admin) and track activity
- **Payment integration** — Paystack-powered payments with secure SSL encryption
- **Calendar management** — View availability, manage blocked dates
- **Add-on services** — Optional extras (decor, AV, power backup) per booking
- **File uploads** — S3 presigned URL support for event briefs and media

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS v3, shadcn/ui (Radix Primitives) |
| Animation | GSAP, Framer Motion, Lenis |
| Backend | Hono (HTTP server), tRPC (type-safe API layer) |
| Database | Neon (Serverless Postgres) via Drizzle ORM |
| Auth | JWT (email + password, jose) |
| Payments | Paystack |
| File storage | AWS S3 (presigned URLs) |
| Validation | Zod, React Hook Form |
| Charts | Recharts |
| Build | Vite, esbuild |

## Getting started

```
npm install
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npm run db:generate
npm run db:migrate
npm run dev
```

## Project structure

```
src/         — React frontend (pages, components, design tokens)
api/         — Hono server + tRPC routers (auth, venue, booking, payment, admin, calendar)
db/          — Drizzle schema, relations, migrations, seed data
contracts/   — Shared types, constants, and error definitions
public/      — Static assets
```
