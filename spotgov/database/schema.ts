import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text()
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("created_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
