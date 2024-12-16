import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import organizations from "./organizations";
import { InferSelectModel, relations, sql } from "drizzle-orm";
import contracts from "./contracts";

export const feedCustomFields = pgTable("feed_custom_fields", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  fieldName: text("field_name"),
  fieldType: text("field_type"),
  createdAt: timestamp("created_at", { withTimezone: true }),
});

export const feedCustomFieldsValues = pgTable("feed_custom_fields_values", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  fieldId: uuid("field_id").references(() => feedCustomFields.id),
  contractId: uuid("contract_id").references(() => contracts.id),
  value: text("value"),
});

export type FeedCustomField = InferSelectModel<typeof feedCustomFields>;
export type FeedCustomFieldValue = InferSelectModel<
  typeof feedCustomFieldsValues
>;

export const feedCustomFieldsRelations = relations(
  feedCustomFields,
  ({ many }) => ({
    feedCustomFieldsValues: many(feedCustomFieldsValues),
  }),
);

export const feedCustomFieldsValuesRelations = relations(
  feedCustomFieldsValues,
  ({ one }) => ({
    feedCustomField: one(feedCustomFields, {
      fields: [feedCustomFieldsValues.fieldId],
      references: [feedCustomFields.id],
    }),
  }),
);
