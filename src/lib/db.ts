import { Pool } from "pg";

let pool: Pool | null | undefined;

export function getDb() {
  if (pool !== undefined) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    pool = null;
    return pool;
  }

  // Respect SSL settings embedded in the connection string, which is
  // required for managed providers such as Neon.
  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

  return pool;
}
