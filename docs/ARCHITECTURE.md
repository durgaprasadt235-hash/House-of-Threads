# House of Threads architecture

## System shape

```text
House of Threads (one Next.js application)
├── Elphino (Brand)
├── The Walker Company (Brand)
├── Shared commerce
│   ├── catalog and collections
│   ├── variant inventory and transactions
│   ├── carts, coupons, checkout, orders, and payments
│   └── customer accounts and addresses
└── Shared loyalty
    ├── rewards
    ├── puzzle collections and pieces
    └── secure QR codes and redemption
```

There is one application, one deployment topology, and one database. `Brand` is a first-class model; brand-specific styling and routes become presentation concerns rather than separate systems.

## Commerce and catalog

Products belong to a brand and category and may belong to many collections. A product has multiple variants identified by SKU, size, and color. Images are ordered records and include storage-provider IDs for later Cloudinary lifecycle management.

Prices use PostgreSQL decimal values. Future cart and checkout services must calculate prices on the server from current product/variant records. Browser-submitted prices are display hints only and are never authoritative.

## Inventory

Inventory exists exactly once per `ProductVariant`. `quantity` and `reserved` provide the current projection while `InventoryTransaction` records purchase, sale, return, adjustment, restock, reservation, and release events. Checkout will use a database transaction and optimistic `version` field to prevent overselling.

## Orders and payments

Orders preserve product, SKU, variant, unit-price, and address snapshots so history does not change with the catalog. Payments are separate provider records designed for Stripe Checkout or Payment Intents, asynchronous webhooks, failures, and partial/full refunds.

Order creation and payment webhook processing must be idempotent. Only a verified server-side payment event may confirm an order and initiate puzzle unlocks.

## Puzzle system

A `PuzzleCollection` belongs to a merchandise collection and has separate final artwork. Individual `PuzzlePiece` records have unique positions and images. `ProductPuzzleMapping` associates qualifying products with pieces.

After a confirmed order, a server service will inspect purchased items and create `CustomerPuzzleProgress` records. The unique `(userId, pieceId)` constraint prevents duplicate unlocks. Each unlock references its source `OrderItem` for auditability. No public endpoint will accept an instruction to unlock a piece directly.

## QR system

QR records store a hash of a cryptographically random token, not a predictable ID or plaintext secret. Codes can reference products, pieces, and orders and track activation, redemption identity, and expiry. Future redemption will hash the submitted token, lock the matching row, validate state and ownership rules, and complete the update transactionally.

## Rewards

Rewards are user-owned records with explicit lifecycle states. Puzzle completion can issue a reward from a server transaction once all required unique pieces exist. Codes, if used, are unique and are not generated sequentially.

## Authentication and authorization

Clerk will provide identity in Phase 4. The application will map `clerkId` to `User`; protected server operations will load that user on every request. Admin authorization is a server-side role check, not a hidden link or client-side flag. Until Clerk is integrated, no account or admin route is exposed.

## Folder responsibilities

- `src/app`: routes, layouts, route handlers, loading/error boundaries
- `src/components`: shared presentation components
- `src/lib`: infrastructure clients and environment validation
- `src/services`: server-only domain workflows and transaction boundaries
- `prisma`: schema, migrations, and idempotent seeds

## Delivery phases

1. Foundation and environment contract — complete
2. PostgreSQL schema and brand seed — complete; migration awaits Neon credentials
3. Storefront and catalog UI
4. Clerk authentication and customer accounts
5. Cart, Stripe checkout, orders, and payment webhooks
6. Admin products, inventory, customers, and orders
7. Puzzle collections, QR redemption, and rewards
8. Cloudinary, Resend, analytics, SEO, and production hardening
