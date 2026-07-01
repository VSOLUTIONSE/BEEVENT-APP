import { z } from "zod";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings, blockedDates } from "@db/schema";
import { eq, and, gte, lte, notInArray } from "drizzle-orm";

export const calendarRouter = createRouter({
  events: authedQuery
    .input(
      z.object({
        month: z.number(),
        year: z.number(),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const startOfMonth = new Date(input.year, input.month - 1, 1);
      const endOfMonth = new Date(input.year, input.month, 0, 23, 59, 59);

      const bookingEvents = await db
        .select()
        .from(bookings)
        .where(
          and(
            notInArray(bookings.status, [
              "cancelled_by_customer",
              "cancelled_by_staff",
              "rejected",
            ]),
            lte(bookings.eventStart, endOfMonth),
            gte(bookings.eventEnd, startOfMonth)
          )
        );

      const blocked = await db
        .select()
        .from(blockedDates)
        .where(
          and(
            lte(blockedDates.blockStart, endOfMonth),
            gte(blockedDates.blockEnd, startOfMonth)
          )
        );

      return {
        bookings: bookingEvents,
        blocked,
      };
    }),

  blockDate: adminQuery
    .input(
      z.object({
        blockStart: z.string(),
        blockEnd: z.string(),
        reason: z.string().optional(),
        showAsUnavailable: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.insert(blockedDates).values({
        blockStart: new Date(input.blockStart),
        blockEnd: new Date(input.blockEnd),
        reason: input.reason,
        showAsUnavailable: input.showAsUnavailable,
        createdBy: ctx.user.id,
      });
      return { success: true };
    }),

  unblockDate: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(blockedDates).where(eq(blockedDates.id, input.id));
      return { success: true };
    }),
});
