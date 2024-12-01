import { InferSelectModel } from "drizzle-orm";
import { numeric, pgTable, text } from "drizzle-orm/pg-core";

const issuers = pgTable("issuers_list", {
  nif: text("nif").primaryKey(),
  name: text("name"),
  totalValueClosed: numeric("total_value_closed"),
});

export type Issuer = InferSelectModel<typeof issuers>;

export default issuers;
