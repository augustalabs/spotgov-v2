import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import organizations from "./organizations";

const marketintelFavourites = pgTable("organization_marketintel_favourites", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  nif: text("nif"),
});

export type MarketintelFavourite = InferSelectModel<
  typeof marketintelFavourites
>;

export default marketintelFavourites;
