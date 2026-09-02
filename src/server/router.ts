import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { publicProcedure, router } from "./trpc";

/**
 * Starter API. Plain CRUD, nothing more.
 *
 * There is no draft/live separation here, no publish, and no scheduling.
 * `update` is a last-write-wins overwrite, which is exactly the behaviour the
 * brief asks you to replace. Add, change or delete anything in this file.
 */
export const appRouter = router({
  list: publicProcedure.query(async () => {
    return db.select().from(contentItems).orderBy(desc(contentItems.updatedAt));
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const [item] = await db
        .select()
        .from(contentItems)
        .where(eq(contentItems.id, input.id))
        .limit(1);
      return item ?? null;
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), body: z.string().default("") }))
    .mutation(async ({ input }) => {
      const [item] = await db.insert(contentItems).values(input).returning();
      return item;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        title: z.string().min(1),
        body: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const [item] = await db
        .update(contentItems)
        .set({ title: input.title, body: input.body, updatedAt: new Date() })
        .where(eq(contentItems.id, input.id))
        .returning();
      return item;
    }),
});

export type AppRouter = typeof appRouter;
