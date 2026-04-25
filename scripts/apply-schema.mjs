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

const schemaPath = path.join(rootDir, "src", "db", "schema.sql");
const schemaSql = await fs.readFile(schemaPath, "utf8");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();
  await client.query(schemaSql);
  console.log("Database schema applied successfully.");
} catch (error) {
  console.error("Failed to apply schema.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
