# SORS Gold — B2B Platform for the Jewelry Industry

A full-stack B2B platform that digitises **wholesale gold-jewelry supply and turnkey jeweler setup**. It pairs a public marketing site and a multi-sector application/onboarding flow with a secure admin panel for managing applications, services and content — migrating fragmented, offline wholesale workflows into a structured relational system.

> **Stack:** Next.js (App Router) · TypeScript · Prisma · NextAuth · Tailwind CSS · shadcn/ui

---

## What it does

**Public site**
- Marketing pages — services, references, about, contact and blog
- A **gold-price calculator** tool for jewelers
- A multi-step **application/onboarding flow** by sector, with separate *new* and *renewal* journeys and result tracking

**Admin panel** (authenticated)
- Manage incoming **applications** with a detailed per-application view and structured question/answer records
- Manage **users, services, packages, blog content and FAQs**
- Configurable settings

## Architecture & technical highlights

- **Next.js App Router with route groups** — `(public)`, `(auth)` and `panel` cleanly separate the marketing site, authentication and the admin surface in a single codebase.
- **Relational domain model with Prisma** — `User`, `Sector`, `Service`, `Application`, `Question`, `Answer`, `Package` and `PackageItem`, with migrations and seed scripts (`db:migrate`, `db:seed`).
- **Secure authentication** — NextAuth with the Prisma adapter and `bcryptjs`-hashed credentials, protecting the admin routes.
- **Type-safe forms and validation** with Zod across the application flow.
- **Design system** built on shadcn/ui + Base UI + Tailwind CSS, with light/dark theming and toast notifications.
- **Transactional email** delivery via Resend.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (App Router), TypeScript |
| Database | Prisma ORM (relational) |
| Auth | NextAuth, Prisma adapter, bcryptjs |
| UI | Tailwind CSS, shadcn/ui, Base UI, next-themes, sonner |
| Validation | Zod |
| Email | Resend |

## Running locally

```bash
npm install
npm run db:generate    # generate Prisma client
npm run db:push        # sync schema to the database
npm run db:seed        # seed reference data
npm run dev            # http://localhost:3000
```

A `DATABASE_URL` and the NextAuth / Resend environment variables are required (see `.env.example` if present).

## Author

Designed and engineered by **Ozan Yılmaz** — Technical Founder, [Codeimo](https://codeimo.com).
Architecture, data modelling and full-stack implementation.
