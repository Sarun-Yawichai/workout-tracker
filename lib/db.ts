import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import os from "os";

// Keep the connection on globalThis so Next.js dev-mode hot reload
// doesn't try to re-open the same file and throw "database is locked".
declare global {
  // eslint-disable-next-line no-var
  var __workoutDb: Database.Database | null | undefined;
}

// On serverless platforms (e.g. Vercel) the project folder is read-only —
// only /tmp is writable, and /tmp does NOT persist across deployments or
// cold starts. That's fine for a demo: data just resets sometimes, it
// doesn't crash the app. Locally, or on a host with a real disk (Railway,
// Render, your own VPS), we use a ./data folder so it actually persists.
const DB_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "workout-tracker-data")
  : path.join(process.cwd(), "data");

const DB_PATH = path.join(DB_DIR, "workouts.db");

function createConnection(): Database.Database | null {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });

    const db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");

    db.exec(`
      CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,              -- ISO date string, e.g. 2026-09-16
        exercise_type TEXT NOT NULL,     -- e.g. 'running', 'weights', 'yoga', 'swimming'
        duration_minutes INTEGER NOT NULL,
        calories INTEGER,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    return db;
  } catch (err) {
    // Couldn't open/create the DB file for whatever reason (locked-down
    // filesystem, out of space, etc). Don't crash the app — the pages that
    // call getDb() are written to handle a null connection by just showing
    // an empty state instead.
    console.error("Could not open SQLite database, falling back to empty state:", err);
    return null;
  }
}

/** Returns the shared connection, or null if the DB couldn't be opened. */
export function getDb(): Database.Database | null {
  if (global.__workoutDb === undefined) {
    global.__workoutDb = createConnection();
  }
  return global.__workoutDb;
}
