import { InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const contracts = pgTable("contracts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text("geoset"),
  contractNumber: text("contract_number"),
  userUploaded: boolean("user_uploaded"),
  basePrice: numeric("base_price"),
  contractType: text("contract_type"),
  euFunds: boolean("eu_funds"),
  executionLocation: text("execution_location"),
  issuerName: text("issuer_name"),
  linkDelivery: text("link_delivery"),
  linkDr: text("link_dr"),
  publishDate: timestamp("publish_date", { withTimezone: true }),
  submissionDeadlineDate: timestamp("submission_deadline_date", {
    withTimezone: true,
  }),
  summary: text("summary"),
  deepDiveAvailable: boolean("deep_dive_available"),
  deepdiveUnavailableReason: text("deepdive_unavailable_reason"),
  title: text("title"),
  awardCriteria: json("award_criteria"),
  cpvs: text("cpvs").array(),
  documents: json("documents"),
  executionDeadlineDays: integer("execution_deadline_days"),
  issuerInfo: json("issuer_info"),
  drPdfUrl: text("dr_pdf_url"),
  renews: boolean("renews"),
  reviewBodyInfo: json("review_body_info"),
  maxLots: integer("max_lots"),
  maxLotsPerContestant: integer("max_lots_per_contestant"),
  extraData: json("extra_data"),
});

export type Contract = InferSelectModel<typeof contracts>;

export default contracts;
