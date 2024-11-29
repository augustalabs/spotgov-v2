import { sql } from "drizzle-orm";
import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";

export const organizationsTable = pgTable("organizations", {
  id: uuid("id")
    .primaryKey()
    .unique()
    .default(sql`uuid_generate_v4()`),
  nif: text("nif").notNull().unique(),
  name: text("name").notNull(),
  deepDiveCurrency: integer("deep_dive_currency").default(3),
  matchmakingCurrency: integer("matchmaking_currency").default(3),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
