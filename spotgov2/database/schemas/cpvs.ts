import { InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

const cpvs = pgTable("cpvs_list", {
  code: text("code").primaryKey(),
  fullName: text("full_name"),
  name: text("name"),
});

export type Cpv = InferSelectModel<typeof cpvs>;

export default cpvs;
