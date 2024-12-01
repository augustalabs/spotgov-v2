import { InferSelectModel, sql } from "drizzle-orm";
import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import contracts from "./contracts";

const lots = pgTable("contract_lots", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  contractId: uuid("contract_id").references(() => contracts.id),
  lotNumber: text("lot_number"),
  description: text("description"),
  basePrice: numeric("base_price", { precision: 20, scale: 2 }),
  cpvs: text("cpvs").array(),
});

export type Lot = InferSelectModel<typeof lots>;

export default lots;
