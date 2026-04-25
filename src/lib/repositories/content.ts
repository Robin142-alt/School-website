import { getDb } from "@/lib/db";
import {
  alumniVoices as fallbackTestimonials,
  events as fallbackEvents,
  getLatestNews as getStaticLatestNews,
  getNewsBySlug as getStaticNewsBySlug,
  newsPosts as fallbackNewsPosts,
  performanceData as fallbackPerformanceData,
} from "@/lib/content/site";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: string[];
  featured?: boolean;
};

export type EventItem = {
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
};

export type Testimonial = {
  title: string;
  quote: string;
  audience: "student" | "parent" | "alumni";
};

export type PerformancePoint = {
  year: string;
  meanGrade: number;
  transitionRate: number;
};

export type PerformanceDataset = {
  note: string;
  series: PerformancePoint[];
};

function coerceTextArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeDate(value: unknown) {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

export async function getLatestNewsFromStore(limit = 3): Promise<NewsPost[]> {
  const db = getDb();

  if (!db) {
    return getStaticLatestNews(limit);
  }

  try {
    const result = await db.query<{
      slug: string;
      title: string;
      excerpt: string;
      category: string;
      published_at: string | Date;
      body: unknown;
      featured: boolean;
    }>(
      `
        SELECT slug, title, excerpt, category, published_at, body, featured
        FROM news_posts
        ORDER BY published_at DESC
        LIMIT $1
      `,
      [limit],
    );

    if (result.rows.length === 0) {
      return getStaticLatestNews(limit);
    }

    return result.rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      publishedAt: normalizeDate(row.published_at),
      body: coerceTextArray(row.body),
      featured: row.featured,
    }));
  } catch {
    return getStaticLatestNews(limit);
  }
}

export async function getAllNewsFromStore(): Promise<NewsPost[]> {
  const db = getDb();

  if (!db) {
    return [...fallbackNewsPosts].sort(
      (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );
  }

  try {
    const result = await db.query<{
      slug: string;
      title: string;
      excerpt: string;
      category: string;
      published_at: string | Date;
      body: unknown;
      featured: boolean;
    }>(
      `
        SELECT slug, title, excerpt, category, published_at, body, featured
        FROM news_posts
        ORDER BY published_at DESC
      `,
    );

    if (result.rows.length === 0) {
      return [...fallbackNewsPosts].sort(
        (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
      );
    }

    return result.rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      publishedAt: normalizeDate(row.published_at),
      body: coerceTextArray(row.body),
      featured: row.featured,
    }));
  } catch {
    return [...fallbackNewsPosts].sort(
      (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );
  }
}

export async function getNewsBySlugFromStore(slug: string): Promise<NewsPost | undefined> {
  const db = getDb();

  if (!db) {
    return getStaticNewsBySlug(slug);
  }

  try {
    const result = await db.query<{
      slug: string;
      title: string;
      excerpt: string;
      category: string;
      published_at: string | Date;
      body: unknown;
      featured: boolean;
    }>(
      `
        SELECT slug, title, excerpt, category, published_at, body, featured
        FROM news_posts
        WHERE slug = $1
        LIMIT 1
      `,
      [slug],
    );

    const row = result.rows[0];

    if (!row) {
      return getStaticNewsBySlug(slug);
    }

    return {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      publishedAt: normalizeDate(row.published_at),
      body: coerceTextArray(row.body),
      featured: row.featured,
    };
  } catch {
    return getStaticNewsBySlug(slug);
  }
}

export async function getUpcomingEventsFromStore(limit = 3): Promise<EventItem[]> {
  const db = getDb();

  if (!db) {
    return [...fallbackEvents]
      .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
      .slice(0, limit);
  }

  try {
    const result = await db.query<{
      title: string;
      location: string;
      description: string;
      start_date: string | Date;
      end_date: string | Date | null;
    }>(
      `
        SELECT title, location, description, start_date, end_date
        FROM events
        ORDER BY start_date ASC
        LIMIT $1
      `,
      [limit],
    );

    if (result.rows.length === 0) {
      return [...fallbackEvents]
        .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
        .slice(0, limit);
    }

    return result.rows.map((row) => ({
      title: row.title,
      location: row.location,
      description: row.description,
      startDate: normalizeDate(row.start_date),
      endDate: row.end_date ? normalizeDate(row.end_date) : undefined,
    }));
  } catch {
    return [...fallbackEvents]
      .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
      .slice(0, limit);
  }
}

export async function getAllEventsFromStore(): Promise<EventItem[]> {
  const db = getDb();

  if (!db) {
    return [...fallbackEvents].sort(
      (a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)),
    );
  }

  try {
    const result = await db.query<{
      title: string;
      location: string;
      description: string;
      start_date: string | Date;
      end_date: string | Date | null;
    }>(
      `
        SELECT title, location, description, start_date, end_date
        FROM events
        ORDER BY start_date ASC
      `,
    );

    if (result.rows.length === 0) {
      return [...fallbackEvents].sort(
        (a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)),
      );
    }

    return result.rows.map((row) => ({
      title: row.title,
      location: row.location,
      description: row.description,
      startDate: normalizeDate(row.start_date),
      endDate: row.end_date ? normalizeDate(row.end_date) : undefined,
    }));
  } catch {
    return [...fallbackEvents].sort(
      (a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)),
    );
  }
}

export async function getTestimonialsFromStore(limit?: number): Promise<Testimonial[]> {
  const db = getDb();
  const fallback = limit ? fallbackTestimonials.slice(0, limit) : fallbackTestimonials;

  if (!db) {
    return fallback.map((item) => ({
      ...item,
      audience: item.title.toLowerCase().includes("parent")
        ? "parent"
        : item.title.toLowerCase().includes("student")
          ? "student"
          : "alumni",
    }));
  }

  try {
    const query = limit
      ? `
        SELECT title, quote, audience
        FROM testimonials
        WHERE is_published = TRUE
        ORDER BY title ASC
        LIMIT $1
      `
      : `
        SELECT title, quote, audience
        FROM testimonials
        WHERE is_published = TRUE
        ORDER BY title ASC
      `;

    const result = await db.query<{
      title: string;
      quote: string;
      audience: "student" | "parent" | "alumni";
    }>(query, limit ? [limit] : []);

    if (result.rows.length === 0) {
      return fallback.map((item) => ({
        ...item,
        audience: item.title.toLowerCase().includes("parent")
          ? "parent"
          : item.title.toLowerCase().includes("student")
            ? "student"
            : "alumni",
      }));
    }

    return result.rows;
  } catch {
    return fallback.map((item) => ({
      ...item,
      audience: item.title.toLowerCase().includes("parent")
        ? "parent"
        : item.title.toLowerCase().includes("student")
          ? "student"
          : "alumni",
    }));
  }
}

export async function getPerformanceDataFromStore(): Promise<PerformanceDataset> {
  const db = getDb();

  if (!db) {
    return fallbackPerformanceData;
  }

  try {
    const result = await db.query<{
      year: number;
      mean_grade: string | number;
      transition_rate: number;
      note: string | null;
    }>(
      `
        SELECT year, mean_grade, transition_rate, note
        FROM kcse_performance
        ORDER BY year ASC
      `,
    );

    if (result.rows.length === 0) {
      return fallbackPerformanceData;
    }

    return {
      note:
        result.rows.find((row) => row.note)?.note ??
        fallbackPerformanceData.note,
      series: result.rows.map((row) => ({
        year: String(row.year),
        meanGrade: Number(row.mean_grade),
        transitionRate: row.transition_rate,
      })),
    };
  } catch {
    return fallbackPerformanceData;
  }
}
