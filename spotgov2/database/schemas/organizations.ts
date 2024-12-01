import { InferSelectModel, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const organizations = pgTable("organizations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  nif: text("nif").unique(),
  name: text("name").notNull(),
  deepDiveCurrency: integer("deep_dive_currency").default(3),
  matchmakingCurrency: integer("matchmaking_currency").default(3),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`now()`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => sql`now()`
  ),
});

export type Organization = InferSelectModel<typeof organizations>;

export default organizations;
