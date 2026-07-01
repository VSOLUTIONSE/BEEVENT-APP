import { z } from "zod";
import { createRouter, authedQuery, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { payments, bookings } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const paymentRouter = createRouter({
  initiate: authedQuery
    .input(z.object({ bookingId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();

      // Verify booking belongs to user
      const booking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, input.bookingId))
        .limit(1);

      if (!booking[0] || booking[0].userId !== ctx.user.id) {
        throw new Error("Booking not found");
      }

      const providerRef = `PAY-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      await db.insert(payments).values({
        bookingId: input.bookingId,
        provider: "paystack",
        providerRef,
        amount: booking[0].total,
        currency: "NGN",
        status: "initiated",
      });

      return {
        providerRef,
        amount: booking[0].total,
        authorizationUrl: `/api/payments/mock-callback?ref=${providerRef}`,
      };
    }),

  verify: publicQuery
    .input(z.object({ reference: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(payments)
        .where(eq(payments.providerRef, input.reference))
        .limit(1);

      if (!result[0]) {
        return { status: "not_found" };
      }

      return { status: result[0].status, payment: result[0] };
    }),

  myPayments: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(payments)
      .innerJoin(bookings, eq(payments.bookingId, bookings.id))
      .where(eq(bookings.userId, ctx.user.id))
      .orderBy(desc(payments.initiatedAt));
  }),

  // Mock webhook for demo
  mockCallback: publicQuery
    .input(z.object({ ref: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(payments)
        .where(eq(payments.providerRef, input.ref))
        .limit(1);

      if (result[0]) {
        await db
          .update(payments)
          .set({ status: "successful", completedAt: new Date() })
          .where(eq(payments.id, result[0].id));

        // Update booking status
        await db
          .update(bookings)
          .set({ status: "confirmed" })
          .where(eq(bookings.id, result[0].bookingId));

        return { success: true, message: "Payment verified" };
      }

      return { success: false, message: "Payment not found" };
    }),
});
