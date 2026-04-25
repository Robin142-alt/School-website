# St. Clare's Maragoli Girls School Product Architecture

## 1. Full system architecture

### Experience layer
- Next.js App Router handles all public routes for home, academics, student life, admissions, community, contact, and dynamic news stories.
- Tailwind CSS v4 is used for responsive layout, theme tokens, and reusable visual patterns.
- Server Components deliver the majority of content for fast loads and reduced JavaScript.
- Client Components are limited to forms so the core site remains lightweight on lower-end mobile devices.

### Application layer
- `src/lib/content/site.ts` contains structured content models for branding, pathways, parent guidance, news, events, and alumni engagement.
- `src/lib/content/cms-seed.json` stores the curated starter editorial dataset used both as a runtime fallback and as seed material for PostgreSQL.
- `src/lib/metadata.ts`, `sitemap.ts`, `robots.ts`, `manifest.ts`, and `opengraph-image.tsx` provide SEO and sharing infrastructure.
- `src/lib/actions.ts` uses validated Server Actions for admissions, contact, and alumni submissions.
- `src/app/portal/page.tsx` provides a protected staff content portal backed by `ADMIN_ACCESS_KEY`.
- `src/lib/portal-actions.ts` and `src/lib/portal-auth.ts` handle portal authentication, mutations, and cache revalidation.
- `src/lib/repositories/content.ts` abstracts database-backed reads for news, events, testimonials, and KCSE performance while gracefully falling back to local seed content.
- `src/app/api/feed/route.ts` exposes a JSON feed for future integrations such as school apps or digital noticeboards.

### Data layer
- PostgreSQL is the primary persistence target for inquiries and future CMS-style content tables.
- `src/lib/db.ts` lazily initializes the database client to keep builds safe when `DATABASE_URL` is not configured.
- `src/lib/repositories/inquiries.ts` writes to PostgreSQL when available and falls back to an in-memory store during local development.
- `scripts/apply-schema.mjs` provisions the database schema and `scripts/seed-content.mjs` loads the starter content into PostgreSQL.
- `src/db/schema.sql` defines tables for inquiries, news posts, events, testimonials, and KCSE performance records.

## 2. Page-by-page breakdown

### `/`
- Hero with emotional positioning, trust cards, and clear calls to action.
- About, mission, vision, and values to strengthen identity and parental trust.
- Academic pathway previews with a KCSE dashboard block.
- Student-life showcase with clubs and gallery structure.
- Parent-experience section for fees, communication, and reassurance.
- Alumni and community sections for social proof and re-engagement.
- Live news and events previews to keep the homepage fresh.

### `/academics`
- CBC pathway explanations with subject clusters and future opportunities.
- Department visibility to show academic depth beyond a single exam.
- KCSE visualization area and academic support pillars.

### `/student-life`
- Clubs, societies, sports, and culture-driven gallery structure.
- Campus rhythm framing to show daily student experience and wellbeing.

### `/admissions`
- Four-step admissions journey.
- Requirements checklist, fee structure summary, FAQs, and admissions portal form.

### `/community`
- Parent communication model, dynamic news, event cards, and alumni system.
- Alumni mentorship form and explanation of the feed API.

### `/contact`
- Direct call and WhatsApp actions, map embed, and inquiry form.

### `/news/[slug]`
- Dynamic story page with related articles and a reusable editorial layout.

## 3. UI/UX explanation

### Psychological strategy
- Trust: leadership voice, map visibility, structured cards, and clear next steps reduce uncertainty.
- Pride: editorial typography, bold color direction, and student-life storytelling elevate school identity.
- Clarity: five-item navigation, short copy blocks, and chunked cards make the site feel approachable on mobile.
- Familiarity: phone and WhatsApp actions mirror the communication channels parents already trust.
- Social proof: news, events, alumni, pathways, and results areas make the school feel active and credible.

### Visual system
- Warm cream, forest green, gold, and sunset tones reflect dignity, optimism, and local warmth.
- Fraunces creates a confident editorial tone for headlines while Manrope keeps body copy highly legible.
- Rounded panels and soft depth cues make the interface feel calm rather than bureaucratic.

## 4. Database design

### Primary tables
- `inquiries`: stores contact, admissions, and alumni form submissions with metadata for flexible follow-up.
- `news_posts`: stores dynamic updates and editorial content for the news system.
- `events`: stores upcoming campus and community events.
- `testimonials`: stores publishable student, parent, and alumni quotes.
- `kcse_performance`: stores official performance history for the academic dashboard.

### Scaling path
- Add admin-authenticated CRUD for content managers.
- Replace starter seeded content with verified school-managed updates as workflows mature.
- Connect inquiry flows to email, WhatsApp automation, or CRM tools later.

## 5. Feature list

- Mobile-first five-item navigation
- Emotionally differentiated home experience
- CBC pathways and department storytelling
- KCSE results visualization zone
- Student-life and gallery showcase
- Admissions portal with FAQs and form
- Parent-experience communication and fee structure sections
- News and events system with dynamic detail pages
- Alumni mentorship and support intake
- Contact system with map, phone, and WhatsApp actions
- Protected staff portal for updating public content
- Inquiry inbox preview for admissions, alumni, and contact submissions
- SEO, sitemap, manifest, Open Graph image, and JSON feed
