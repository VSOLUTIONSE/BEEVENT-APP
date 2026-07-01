import { authRouter } from "./auth-router.js";
import { venueRouter } from "./venue-router.js";
import { bookingRouter } from "./booking-router.js";
import { calendarRouter } from "./calendar-router.js";
import { paymentRouter } from "./payment-router.js";
import { adminRouter } from "./admin-router.js";
import { createRouter, publicQuery } from "./middleware.js";

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
