import { InferSelectModel, sql } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import organizations from "./organizations";
import contracts from "./contracts";

export const deepdiveTemplates = pgTable("deepdive_templates", {
  templateId: uuid("template_id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }),
});

export const deepdiveVersions = pgTable(
  "deepdive_versions",
  {
    templateId: uuid("template_id").references(
      () => deepdiveTemplates.templateId
    ),
    templateVersionOrder: integer("template_version_order"),
    contractId: uuid("contract_id").references(() => contracts.id),
    templateArray: json("template_array"),
  },
  (t) => [
    primaryKey({
      columns: [t.templateId, t.contractId, t.templateVersionOrder],
    }),
  ]
);

export const deepdiveLatestTable = pgTable(
  "deepdive_latest_table",
  {
    organizationId: uuid("organization_id")
      .references(() => organizations.id)
      .notNull(),
    contractId: uuid("contract_id")
      .references(() => contracts.id)
      .notNull(),
    templateId: uuid("template_id")
      .references(() => deepdiveTemplates.templateId)
      .notNull(),
    rowHeader: text("row_header").notNull(),
    value: text("value"),
  },
  (t) => [
    primaryKey({
      columns: [t.organizationId, t.contractId, t.templateId, t.rowHeader],
    }),
  ]
);

export type DeepdiveTemplate = InferSelectModel<typeof deepdiveTemplates>;
export type DeepdiveVersion = InferSelectModel<typeof deepdiveVersions>;
export type DeepdiveLatestTable = InferSelectModel<typeof deepdiveLatestTable>;
