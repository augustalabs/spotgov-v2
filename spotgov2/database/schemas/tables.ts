import { InferSelectModel, sql } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import contracts from "./contracts";

const tables = pgTable("contract_tables", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  contractId: uuid("contract_id").references(() => contracts.id),
  name: text("name"),
  columnName: text("column_name"),
  row: integer("row"),
  value: text("value"),
});

export type Table = InferSelectModel<typeof tables>;

export default tables;
