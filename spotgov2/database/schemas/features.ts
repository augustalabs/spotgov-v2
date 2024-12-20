import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import organizations from "./organizations";
import { InferSelectModel } from "drizzle-orm";

const features = pgTable("organization_features", {
  organizationId: uuid("organization_id")
    .primaryKey()
    .references(() => organizations.id),
  featureDeepdive: boolean("feature_deepdive"),
  featureMarketintel: boolean("feature_marketintel"),
  //TODO ADD ALL FEATURES
});

export type Feature = InferSelectModel<typeof features>;

export default features;
