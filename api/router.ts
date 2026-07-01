import { authRouter } from "./auth-router";
import { venueRouter } from "./venue-router";
import { bookingRouter } from "./booking-router";
import { calendarRouter } from "./calendar-router";
import { paymentRouter } from "./payment-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  venue: venueRouter,
  booking: bookingRouter,
  calendar: calendarRouter,
  payment: paymentRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
