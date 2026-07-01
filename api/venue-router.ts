import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { venue, packages, addons, bookings, blockedDates } from "@db/schema";
import { eq, and, gte, lte, notInArray } from "drizzle-orm";

export const venueRouter = createRouter({
  get: publicQuery.query(async () => {
    const db = getDb();
    const result = await db.select().from(venue).limit(1);
    return result[0] ?? null;
  }),

  packages: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(packages)
      .where(eq(packages.isActive, true));
  }),

  addons: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(addons)
      .where(eq(addons.isActive, true));
  }),

  checkAvailability: publicQuery
    .input(
      z.object({
        start: z.string(),
        end: z.string(),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const startDate = new Date(input.start);
      const endDate = new Date(input.end);

      // Check for conflicting bookings
      const conflicts = await db
        .select()
        .from(bookings)
        .where(
          and(
            notInArray(bookings.status, [
              "cancelled_by_customer",
              "cancelled_by_staff",
              "rejected",
            ]),
            lte(bookings.eventStart, endDate),
            gte(bookings.eventEnd, startDate)
          )
        )
        .limit(1);

      // Check for blocked dates
      const blocks = await db
        .select()
        .from(blockedDates)
        .where(
          and(
            lte(blockedDates.blockStart, endDate),
            gte(blockedDates.blockEnd, startDate)
          )
        )
        .limit(1);

      return {
        available: conflicts.length === 0 && blocks.length === 0,
        conflicts: conflicts.length > 0,
        blocked: blocks.length > 0,
      };
    }),
});
