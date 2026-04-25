import { getDb } from "@/lib/db";

export type NewsMutationInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: string[];
  publishedAt: string;
  featured: boolean;
};

export type EventMutationInput = {
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate?: string;
};

export type TestimonialMutationInput = {
  title: string;
  quote: string;
  audience: "student" | "parent" | "alumni";
  isPublished: boolean;
};

export type PerformanceMutationInput = {
  year: number;
  meanGrade: number;
  transitionRate: number;
  note?: string;
};

function requireDb() {
  const db = getDb();

  if (!db) {
    throw new Error("Database is not configured.");
  }

  return db;
}

export async function upsertNewsPost(input: NewsMutationInput) {
  const db = requireDb();

  await db.query(
    `
      INSERT INTO news_posts (
        slug,
        title,
        category,
        excerpt,
        body,
        published_at,
        featured
      )
      VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7)
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        excerpt = EXCLUDED.excerpt,
        body = EXCLUDED.body,
        published_at = EXCLUDED.published_at,
        featured = EXCLUDED.featured
    `,
    [
      input.slug,
      input.title,
      input.category,
      input.excerpt,
      JSON.stringify(input.body),
      input.publishedAt,
      input.featured,
    ],
  );
}

export async function createEventRecord(input: EventMutationInput) {
  const db = requireDb();

  await db.query(
    `
      INSERT INTO events (
        title,
        location,
        description,
        start_date,
        end_date
      )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [
      input.title,
      input.location,
      input.description,
      input.startDate,
      input.endDate ?? null,
    ],
  );
}

export async function createTestimonialRecord(input: TestimonialMutationInput) {
  const db = requireDb();

  await db.query(
    `
      INSERT INTO testimonials (
        audience,
        quote,
        title,
        is_published
      )
      VALUES ($1, $2, $3, $4)
    `,
    [input.audience, input.quote, input.title, input.isPublished],
  );
}

export async function upsertPerformanceRecord(input: PerformanceMutationInput) {
  const db = requireDb();

  await db.query(
    `
      INSERT INTO kcse_performance (
        year,
        mean_grade,
        transition_rate,
        note
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (year)
      DO UPDATE SET
        mean_grade = EXCLUDED.mean_grade,
        transition_rate = EXCLUDED.transition_rate,
        note = EXCLUDED.note
    `,
    [input.year, input.meanGrade, input.transitionRate, input.note ?? null],
  );
}
