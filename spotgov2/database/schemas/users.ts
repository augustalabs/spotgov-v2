import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  email: text("email").unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => sql`now()`
  ),
});

export type User = InferSelectModel<typeof users>;

export default users;
