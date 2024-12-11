import { db } from "@/database/db";
import { users } from "@/database/schemas";
import { eq } from "drizzle-orm";

export async function doesUserExist(email: string): Promise<boolean> {
  return !!(await db.select().from(users).where(eq(users.email, email)));
}
