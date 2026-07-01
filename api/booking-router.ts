import { z } from "zod";
import { createRouter, authedQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { bookings, bookingAddons, packages, addons } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `VH-${year}-${random}`;
}

export const bookingRouter = createRouter({
  create: authedQuery
    .input(
      z.object({
        eventName: z.string().min(1),
        eventType: z.enum([
          "wedding",
          "birthday",
          "conference",
          "church",
          "corporate",
          "seminar",
          "concert",
          "party",
          "other",
        ]),
        guestCount: z.number().min(1),
        packageId: z.number(),
        eventStart: z.string(),
        eventEnd: z.string(),
        specialRequests: z.string().optional(),
        addonIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const userId = ctx.user.id;

      // Get package price
      const pkg = await db
        .select()
        .from(packages)
        .where(eq(packages.id, input.packageId))
        .limit(1);

      if (!pkg[0]) {
        throw new Error("Package not found");
      }

      let subtotal = parseFloat(pkg[0].price);
      const addonPrices: { addonId: number; price: number }[] = [];

      // Calculate add-ons
      if (input.addonIds && input.addonIds.length > 0) {
        for (const addonId of input.addonIds) {
          const addon = await db
            .select()
            .from(addons)
            .where(eq(addons.id, addonId))
            .limit(1);
          if (addon[0]) {
            const price = parseFloat(addon[0].price);
            subtotal += price;
            addonPrices.push({ addonId, price: parseFloat(price.toFixed(2)) });
          }
        }
      }

      const bookingRef = generateBookingRef();

      const result = await db.insert(bookings).values({
        bookingRef,
        userId,
        eventName: input.eventName,
        eventType: input.eventType,
        guestCount: input.guestCount,
        packageId: input.packageId,
        eventStart: new Date(input.eventStart),
        eventEnd: new Date(input.eventEnd),
        setupStart: new Date(new Date(input.eventStart).getTime() - 2 * 60 * 60 * 1000),
        teardownEnd: new Date(new Date(input.eventEnd).getTime() + 2 * 60 * 60 * 1000),
        specialRequests: input.specialRequests,
        subtotal: subtotal.toFixed(2),
        total: subtotal.toFixed(2),
        status: "pending_payment",
      }).returning();

      const bookingId = result[0].id;

      // Insert booking add-ons
      for (const ao of addonPrices) {
        await db.insert(bookingAddons).values({
          bookingId,
          addonId: ao.addonId,
          price: ao.price.toFixed(2),
        });
      }

      return {
        bookingId,
        bookingRef,
        total: subtotal,
      };
    }),

  get: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, input.id))
        .limit(1);

      if (!result[0]) return null;

      // Check ownership or staff
      if (result[0].userId !== ctx.user.id && ctx.user.role === "user") {
        return null;
      }

      // Get add-ons
      const bAddons = await db
        .select()
        .from(bookingAddons)
        .where(eq(bookingAddons.bookingId, input.id));

      return { ...result[0], addons: bAddons };
    }),

  myBookings: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, ctx.user.id))
      .orderBy(desc(bookings.createdAt));
  }),

  cancel: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, input.id))
        .limit(1);

      if (!result[0] || result[0].userId !== ctx.user.id) {
        throw new Error("Booking not found");
      }

      await db
        .update(bookings)
        .set({ status: "cancelled_by_customer" })
        .where(eq(bookings.id, input.id));

      return { success: true };
    }),
});
