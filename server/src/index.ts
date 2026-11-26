import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { initDatabase } from "./db.js";
import messagesRouter from "./routes/messages.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

// Only the listed front-end origins may call this API from a browser
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set("trust proxy", 1); // Render sits behind a proxy; needed for correct client IPs
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));

// Basic spam protection: at most 20 write requests per IP every 15 minutes
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) => req.method === "GET",
  message: { error: "Too many requests, please try again later." }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/messages", writeLimiter, messagesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

// Express 5 passes errors from async route handlers here automatically
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err: unknown) => {
    console.error("Could not connect to the database:", err);
    process.exit(1);
  });
