import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { Client } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function loadEnvFile(filename) {
  const filePath = path.join(rootDir, filename);

  try {
    const contents = await fs.readFile(filePath, "utf8");

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex < 0) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

await loadEnvFile(".env.local");
await loadEnvFile(".env");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local or your shell environment.");
  process.exit(1);
}

const seedPath = path.join(rootDir, "src", "lib", "content", "cms-seed.json");
const seed = JSON.parse(await fs.readFile(seedPath, "utf8"));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function tableCount(tableName) {
  const result = await client.query(`SELECT COUNT(*)::int AS count FROM ${tableName}`);
  return result.rows[0]?.count ?? 0;
}

try {
  await client.connect();
  await client.query("BEGIN");

  const newsCount = await tableCount("news_posts");
  if (newsCount === 0) {
    for (const [index, post] of seed.newsPosts.entries()) {
      await client.query(
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
        `,
        [
          post.slug,
          post.title,
          post.category,
          post.excerpt,
          JSON.stringify(post.body),
          post.publishedAt,
          index === 0,
        ],
      );
    }
  }

  const eventsCount = await tableCount("events");
  if (eventsCount === 0) {
    for (const event of seed.events) {
      await client.query(
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
          event.title,
          event.location,
          event.description,
          event.startDate,
          event.endDate ?? null,
        ],
      );
    }
  }

  const testimonialsCount = await tableCount("testimonials");
  if (testimonialsCount === 0) {
    for (const testimonial of seed.testimonials) {
      await client.query(
        `
          INSERT INTO testimonials (
            audience,
            quote,
            title,
            is_published
          )
          VALUES ($1, $2, $3, TRUE)
        `,
        [testimonial.audience, testimonial.quote, testimonial.title],
      );
    }
  }

  const performanceCount = await tableCount("kcse_performance");
  if (performanceCount === 0) {
    for (const point of seed.performanceData.series) {
      await client.query(
        `
          INSERT INTO kcse_performance (
            year,
            mean_grade,
            transition_rate,
            note
          )
          VALUES ($1, $2, $3, $4)
        `,
        [
          Number(point.year),
          point.meanGrade,
          point.transitionRate,
          seed.performanceData.note,
        ],
      );
    }
  }

  await client.query("COMMIT");
  console.log("Database content seeded successfully.");
} catch (error) {
  await client.query("ROLLBACK").catch(() => undefined);
  console.error("Failed to seed database content.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
