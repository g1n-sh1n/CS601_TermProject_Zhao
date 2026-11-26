import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy server/.env.example to server/.env and fill it in.");
}

// Hosted databases (Neon, Render) need SSL; a local Postgres usually does not.
const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);

export const pool = new pg.Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
  max: 5
});

// Create the table the first time the server starts.
export async function initDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(200)  NOT NULL,
      topic       VARCHAR(30)   NOT NULL,
      message     VARCHAR(2000) NOT NULL,
      token_hash  CHAR(64)      NOT NULL,
      created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
    );
  `);
}
