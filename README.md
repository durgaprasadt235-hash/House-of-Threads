# House of Threads

House of Threads is one multi-brand commerce platform for **Elphino** and **The Walker Company**. Both brands share customer accounts, cart, checkout, orders, payments, inventory, rewards, administration, and analytics.

Phases 1 and 2 establish the application and database foundation. Storefront, authentication, checkout, admin, and loyalty features intentionally remain for later phases.

## Architecture

- One Next.js App Router application and one PostgreSQL database
- Server Components by default; Client Components only for browser interaction
- Brand relationships in data rather than hardcoded application forks
- Variant-level inventory with an append-only transaction model
- Server-authoritative order totals, rewards, puzzle unlocks, and QR redemption
- Domain services in `src/services`; reusable UI in `src/components`

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the domain model and trust boundaries.

## Tech stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- PostgreSQL on Neon and Prisma ORM
- Planned integrations: Clerk, Stripe, Cloudinary, Resend, Vercel
- Zod for boundary validation
- npm for package management

## Local setup

Prerequisites: Node.js 20.9 or newer, npm, Git, and a Neon PostgreSQL project.

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Do not run migration or seed commands until valid Neon URLs are present. `.env.local` is ignored by Git.

## Environment variables

| Variable | Phase | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | 1 | Canonical application URL |
| `DATABASE_URL` | 2 | Neon pooled runtime connection |
| `DATABASE_URL_UNPOOLED` | 2 | Neon direct migration connection |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | 4 | Clerk browser key |
| `CLERK_SECRET_KEY` | 4 | Clerk server key |
| `STRIPE_SECRET_KEY` | 5 | Stripe server API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 5 | Stripe browser key |
| `STRIPE_WEBHOOK_SECRET` | 5 | Stripe webhook signature verification |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | 8 | Cloudinary public cloud name |
| `CLOUDINARY_API_KEY` | 8 | Cloudinary server API key |
| `CLOUDINARY_API_SECRET` | 8 | Cloudinary server secret |
| `RESEND_API_KEY` | 8 | Transactional email server key |
| `EMAIL_FROM` | 8 | Verified sender address |

## Neon and Prisma

1. Create a Neon project, ideally through the Vercel Marketplace integration.
2. Put the pooled connection string in `DATABASE_URL` and the direct connection string in `DATABASE_URL_UNPOOLED`. Vercel's Neon integration provisions both automatically.
3. Run `npm run db:generate`.
4. For a development schema change, run `npm run db:migrate -- --name descriptive_name`.
5. Seed the two brands with `npm run db:seed`.
6. In production, apply committed migrations with `npm run db:deploy`—never `migrate dev`.

Useful commands: `npm run db:studio`, `npm run typecheck`, `npm run lint`, and `npm run build`.

## Clerk setup (Phase 4)

Create one Clerk application, add its two keys to Vercel environments, and pull them locally. Phase 4 will add sign-in/up routes, Clerk's Next.js proxy, user synchronization, account protection, and server-side admin authorization. A database `isAdmin` flag exists as a future application role, but no route currently trusts it.

## Stripe setup (Phase 5)

Create a Stripe account and webhook endpoint after the checkout routes exist. Keep the secret key and webhook secret server-side. The future checkout service must reload product prices from PostgreSQL, create orders idempotently, validate webhook signatures, and update inventory transactionally.

## Cloudinary and Resend setup (Phase 8)

Cloudinary will store brand, collection, product, and puzzle artwork. Only its cloud name is public. Resend will send order, payment, shipping, account, and reward messages from a verified domain. Neither SDK is installed until its implementation phase.

## GitHub workflow

- `main`: deployable production history
- `develop`: integration branch
- `feature/<short-name>`: isolated changes, merged into `develop` by pull request

Never commit `.env.local`, credentials, generated build output, or `.vercel`. Connect GitHub by creating an empty repository without generated files and adding the URL GitHub provides:

```bash
git remote add origin <github-repository-url>
git push -u origin main
git push -u origin develop
```

## Vercel deployment

Import the GitHub repository in Vercel or install and authenticate the Vercel CLI. Link the existing Vercel project before provisioning integrations or pulling environment values. Add every required variable separately for Development, Preview, and Production. Use `npm run build` as the build command and `npm run db:deploy` in a controlled deployment migration step.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

The current foundation can build without service credentials. Database generation also works with non-secret placeholder URLs, but migrations and seeding require a real Neon connection.
