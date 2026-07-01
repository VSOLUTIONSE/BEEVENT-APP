import * as jose from "jose";
import { env } from "./env.js";

const JWT_ALG = "HS256";

export type SessionPayload = {
  userId: number;
  email: string;
};

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const secret = new TextEncoder().encode(env.jwtSecret);
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(env.jwtSecret);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: [JWT_ALG],
    });
    const { userId, email } = payload;
    if (!userId || !email) return null;
    return { userId: Number(userId), email: String(email) };
  } catch {
    return null;
  }
}