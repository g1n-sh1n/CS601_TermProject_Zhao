import { Router } from "express";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { pool } from "../db.js";
import { cleanEmail, cleanText, parseId } from "../validate.js";

// Contact messages = full CRUD from the Contact page:
//   POST   /api/messages       send a message        (Create)
//   GET    /api/messages/:id   view your message     (Read)
//   PUT    /api/messages/:id   edit your message     (Update)
//   DELETE /api/messages/:id   withdraw your message (Delete)
//
// There are no user accounts. When a visitor sends a message, the server returns
// a random "edit token". The browser keeps it in localStorage and sends it back
// in the X-Edit-Token header to prove the message is theirs.
// Only a SHA-256 hash of the token is stored in the database.
//
// I read all messages in the Neon SQL editor:
//   SELECT * FROM contact_messages ORDER BY created_at DESC;

const router = Router();

const topics = ["general", "job", "project"];
const publicColumns = "id, name, email, topic, message, created_at, updated_at";

const hash = (token: string) => createHash("sha256").update(token).digest("hex");

function tokenMatches(token: unknown, storedHash: string): boolean {
  if (typeof token !== "string" || token.length === 0) return false;
  const a = Buffer.from(hash(token));
  const b = Buffer.from(storedHash);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Validates the request body; returns null if something is wrong
function readBody(body: Record<string, unknown> | undefined) {
  const name = cleanText(body?.name, 2, 100);
  const email = cleanEmail(body?.email);
  const message = cleanText(body?.message, 10, 2000);
  const topic = typeof body?.topic === "string" && topics.includes(body.topic) ? body.topic : "general";
  if (!name || !email || !message) return null;
  return { name, email, topic, message };
}

const badBody = { error: "Please provide a name, a valid email, and a message of at least 10 characters." };

// Looks up a message and checks the edit token. Returns true if the request may continue.
async function checkOwner(id: number | null, token: unknown): Promise<{ status: number; error: string } | null> {
  if (!id) return { status: 400, error: "Invalid id." };
  const found = await pool.query("SELECT token_hash FROM contact_messages WHERE id = $1", [id]);
  if (found.rowCount === 0) return { status: 404, error: "Message not found." };
  if (!tokenMatches(token, found.rows[0].token_hash)) return { status: 403, error: "You can only access your own messages." };
  return null;
}

router.post("/", async (req, res) => {
  const data = readBody(req.body);
  if (!data) {
    res.status(400).json(badBody);
    return;
  }

  const editToken = randomBytes(24).toString("hex");
  const result = await pool.query(
    `INSERT INTO contact_messages (name, email, topic, message, token_hash)
     VALUES ($1, $2, $3, $4, $5) RETURNING ${publicColumns}`,
    [data.name, data.email, data.topic, data.message, hash(editToken)]
  );

  res.status(201).json({ message: result.rows[0], editToken });
});

router.get("/:id", async (req, res) => {
  const id = parseId(req.params.id);
  const problem = await checkOwner(id, req.get("X-Edit-Token"));
  if (problem) {
    res.status(problem.status).json({ error: problem.error });
    return;
  }

  const result = await pool.query(`SELECT ${publicColumns} FROM contact_messages WHERE id = $1`, [id]);
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const id = parseId(req.params.id);
  const data = readBody(req.body);
  if (!data) {
    res.status(400).json(badBody);
    return;
  }
  const problem = await checkOwner(id, req.get("X-Edit-Token"));
  if (problem) {
    res.status(problem.status).json({ error: problem.error });
    return;
  }

  const result = await pool.query(
    `UPDATE contact_messages SET name = $1, email = $2, topic = $3, message = $4, updated_at = NOW()
     WHERE id = $5 RETURNING ${publicColumns}`,
    [data.name, data.email, data.topic, data.message, id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const id = parseId(req.params.id);
  const problem = await checkOwner(id, req.get("X-Edit-Token"));
  if (problem) {
    res.status(problem.status).json({ error: problem.error });
    return;
  }

  await pool.query("DELETE FROM contact_messages WHERE id = $1", [id]);
  res.status(204).end();
});

export default router;
