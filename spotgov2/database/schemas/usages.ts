import { InferSelectModel, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import organizations from "./organizations";
import users from "./users";

const usages = pgTable("usage", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  actionType: text("action_type").notNull(),
  actionSubType: text("action_sub_type").notNull(),
  actionSubSubType: text("action_sub_sub_type").notNull(),
  actionValue: text("action_value").notNull(),
});

export type Usage = InferSelectModel<typeof usages>;

export default usages;
