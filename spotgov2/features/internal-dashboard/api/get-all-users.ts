import { User } from "@/database/schemas";
import { db } from "@/database/db";
import { users } from "@/database/schemas";

async function getAllUsers(): Promise<User[]> {
  return await db.select().from(users);
}

export default getAllUsers; 