import { z } from "zod";
import { createRouter, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import {
  bookings,
  users,
  payments,
} from "@db/schema";
import { eq, desc, sql, count, and, gte } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    // Total revenue from successful payments
    const revenueResult = await db
      .select({ total: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments)
      .where(eq(payments.status, "successful"));

    // Total bookings count
    const bookingsCount = await db
      .select({ count: count() })
      .from(bookings);

    // Pending approval bookings
    const pendingCount = await db
      .select({ count: count() })
      .from(bookings)
      .where(eq(bookings.status, "pending_approval"));

    // Confirmed bookings (upcoming)
    const upcomingCount = await db
      .select({ count: count() })
      .from(bookings)
      .where(
        and(
          eq(bookings.status, "confirmed"),
          gte(bookings.eventStart, new Date())
        )
      );

    // Monthly revenue breakdown
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const monthlyRevenue = await db
      .select({
        month: sql<string>`to_char(${payments.initiatedAt}, 'YYYY-MM')`,
        total: sql<number>`COALESCE(SUM(${payments.amount}), 0)`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, "successful"),
          gte(payments.initiatedAt, sixMonthsAgo)
        )
      )
      .groupBy(sql`to_char(${payments.initiatedAt}, 'YYYY-MM')`);

    return {
      totalRevenue: revenueResult[0]?.total ?? 0,
      totalBookings: bookingsCount[0]?.count ?? 0,
      pendingApprovals: pendingCount[0]?.count ?? 0,
      upcomingEvents: upcomingCount[0]?.count ?? 0,
      monthlyRevenue,
    };
  }),

  bookings: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));
  }),

  approveBooking: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "confirmed" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  rejectBooking: adminQuery
    .input(z.object({ id: z.number(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "rejected" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  staff: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(users)
      .where(
        sql`${users.role} IN ('staff', 'manager', 'accountant', 'admin')`
      );
  }),

  updateStaffRole: adminQuery
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["user", "staff", "manager", "accountant", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.userId));
      return { success: true };
    }),
});
