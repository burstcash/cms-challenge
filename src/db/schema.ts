import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

/**
 * Starter schema. Deliberately minimal.
 *
 * This models a single piece of content and nothing else. It does NOT model
 * drafts, published versions, publishing, or scheduling. Designing that is
 * the exercise, and it is the first thing we read in your submission.
 *
 * Change this file. Add tables, drop this one, rename things. Then run
 * `npm run db:generate` to produce a migration and `npm run db:migrate` to
 * apply it. Nothing here is a constraint you have to work around.
 */
export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type ContentItem = typeof contentItems.$inferSelect;
export type NewContentItem = typeof contentItems.$inferInsert;
