import { eq } from "drizzle-orm";
import * as schema from "../../db/schema.js";
import type { InsertUser } from "../../db/schema.js";
import { getDb } from "./connection.js";

export async function findUserByEmail(email: string) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);
  return rows.at(0);
}

export async function findUserById(id: number) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1);
  return rows.at(0);
}

export async function createUser(data: InsertUser) {
  const result = await getDb()
    .insert(schema.users)
    .values(data)
    .returning();
  return result[0];
}
