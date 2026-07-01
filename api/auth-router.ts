import { z } from "zod";
import * as cookie from "cookie";
import { eq } from "drizzle-orm";
import { Session } from "../contracts/constants.js";
import { createRouter, authedQuery, publicQuery } from "./middleware.js";
import { hashPassword, verifyPassword } from "./lib/password.js";
import { signSessionToken } from "./lib/session.js";
import { getDb } from "./queries/connection.js";
import { findUserByEmail, createUser } from "./queries/users.js";
import * as schema from "../db/schema.js";

export const authRouter = createRouter({
  signup: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await findUserByEmail(input.email);
      if (existing) {
        throw new Error("Email already registered");
      }

      const passwordHash = await hashPassword(input.password);
      const user = await createUser({
        email: input.email,
        passwordHash,
        name: input.name,
      });

      const token = await signSessionToken({ userId: user.id, email: user.email });
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize(Session.cookieName, token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: false,
          maxAge: Session.maxAgeMs / 1000,
        }),
      );

      return { user, token };
    }),

  login: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await findUserByEmail(input.email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const valid = await verifyPassword(input.password, user.passwordHash);
      if (!valid) {
        throw new Error("Invalid email or password");
      }

      await getDb()
        .update(schema.users)
        .set({ lastSignInAt: new Date() })
        .where(eq(schema.users.id, user.id));

      const token = await signSessionToken({ userId: user.id, email: user.email });
      ctx.resHeaders.append(
        "set-cookie",
        cookie.serialize(Session.cookieName, token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: false,
          maxAge: Session.maxAgeMs / 1000,
        }),
      );

      return { user, token };
    }),

  me: authedQuery.query((opts) => opts.ctx.user),

  logout: authedQuery.mutation(async ({ ctx }) => {
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
});