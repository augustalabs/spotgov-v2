import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("created_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
