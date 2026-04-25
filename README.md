# St. Clare's Maragoli Girls School

Production-style Next.js website concept for a Kenyan secondary school, designed around trust, clarity, student pride, and parent usability.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Node.js server actions and route handlers
- PostgreSQL-ready data layer

## What is included

- Distinctive mobile-first brand system
- Home, academics, student life, admissions, community, contact, and dynamic news routes
- Parent-friendly admissions, contact, and alumni forms
- SEO, sitemap, robots, manifest, and Open Graph image generation
- PostgreSQL schema for inquiries, news, events, testimonials, and KCSE performance
- Product documentation in [`docs/product-architecture.md`](/C:/Users/user/Desktop/PROJECTS/School%20web/docs/product-architecture.md)

## Local development

```bash
npm install
npm run dev
```

Set environment variables in `.env.local` if you want PostgreSQL persistence:

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_ACCESS_KEY=choose-a-strong-local-key
```

Without `DATABASE_URL`, form submissions fall back to an in-memory store so the experience still works in local development.

To provision the database tables:

```bash
npm run db:push
```

To seed the current curated stories, events, testimonials, and KCSE demo data into PostgreSQL:

```bash
npm run db:seed
```

## Staff portal

- Visit `/portal` to access the protected content portal.
- The portal uses `ADMIN_ACCESS_KEY` from `.env.local`.
- News, events, testimonials, and KCSE updates are written straight to PostgreSQL and trigger public-page revalidation.

## Useful routes

- `/`
- `/academics`
- `/student-life`
- `/admissions`
- `/community`
- `/contact`
- `/news/[slug]`
- `/api/feed`

## Database

Run the SQL in [`src/db/schema.sql`](/C:/Users/user/Desktop/PROJECTS/School%20web/src/db/schema.sql) against PostgreSQL to provision the base tables.
