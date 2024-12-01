import { InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import organizations from "./organizations";

const queries = pgTable("queries", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text("geoset"),
  organizationId: uuid("organization_id").references(() => organizations.id),
  starred: boolean("starred"),
  title: text("title"),
  inputData: json("input_data"),
  createdAt: timestamp("created_at", { withTimezone: true }),
  status: text("status"),
  refreshAutorefresh: boolean("refresh_autorefresh"),
  refreshAutorefreshEmail: boolean("refresh_autorefresh_email"),
  refreshLastContractDate: timestamp("refresh_last_contract_date", {
    withTimezone: true,
  }),
  refreshLastContractId: text("refresh_last_contract_id"),
  refreshLastSentId: text("refresh_last_sent_id"),
  extraEmails: text("extra_emails").array(),
});

export type Query = InferSelectModel<typeof queries>;

export default queries;
