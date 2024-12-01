import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import organizations from "./organizations";

const keywords = pgTable("organization_keywords", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  keyword: text("keyword"),
  createdAt: timestamp("created_at", { withTimezone: true }),
});

export type Keyword = InferSelectModel<typeof keywords>;

export default keywords;
