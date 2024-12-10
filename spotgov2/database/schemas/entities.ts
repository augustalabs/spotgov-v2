import { InferSelectModel } from "drizzle-orm";
import { boolean, numeric, pgTable, text } from "drizzle-orm/pg-core";

const entities = pgTable("entities_list", {
  nif: text("nif").primaryKey(),
  name: text("name"),
  altName: text("alt_name"),
  totalValueClosed: numeric("total_value_closed"),
  isAdjudicante: boolean("is_adjudicante"),
});

export type Entity = InferSelectModel<typeof entities>;

export default entities;
