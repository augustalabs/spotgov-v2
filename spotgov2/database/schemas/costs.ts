import { InferSelectModel, sql } from "drizzle-orm";
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import usages from "./usages";

const costs = pgTable("usage_cost", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  usageId: uuid("usage_id")
    .references(() => usages.id)
    .notNull(),
  costType: text("cost_type").notNull(),
  costSubType: text("cost_sub_type").notNull(),
  costValue: numeric("cost_value", { precision: 20, scale: 2 }).notNull(),
});

export type Cost = InferSelectModel<typeof costs>;

export default costs;
