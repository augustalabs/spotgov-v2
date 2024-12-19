import { User } from "@/database/schemas";

import { db } from "@/database/db";

import { users } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function deleteUser(userId: string): Promise<User[]> {
  return await db.delete(users).where(eq(users.id, userId));
}

export default deleteUser;
