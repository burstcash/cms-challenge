import "dotenv/config";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "./data/cms.db";
mkdirSync(dirname(url), { recursive: true });

const sqlite = new Database(url);

// Write-ahead logging. Matters if you end up with a worker process and the web
// app talking to the same file at the same time.
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });
export { schema };
