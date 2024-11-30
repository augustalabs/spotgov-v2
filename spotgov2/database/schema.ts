import { InferSelectModel, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  integer,
  numeric,
  boolean,
  timestamp,
  json,
  PgArray,
} from "drizzle-orm/pg-core";

// TODO: Organizar esta merda

export const organizations = pgTable("organizations", {
  id: uuid("id")
    .primaryKey()
    .unique()
    .default(sql`uuid_generate_v4()`),
  nif: text("nif").notNull().unique(),
  name: text("name").notNull(),
  deepDiveCurrency: integer("deep_dive_currency").default(3),
  matchmakingCurrency: integer("matchmaking_currency").default(3),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type Organization = InferSelectModel<typeof organizations>;

// TABELA DE FILES NO CONTRATO ACHO
export const contractTablesTable = pgTable("contract_tables", {
  contractId: uuid("contractId"),
  name: text("name"),
  column: text("column"),
  row: integer("row"),
  value: text("value"),
});

export type ContractTable = InferSelectModel<typeof contractTablesTable>;

// CONTRATO
export const contractsTable = pgTable("contracts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text("geoset"),
  contractNumber: text("contractNumber"),
  userUploaded: boolean("userUploaded"),
  basePrice: numeric("basePrice"),
  contractType: text("contractType"),
  euFunds: boolean("euFunds"),
  executionLocation: text("executionLocation"),
  issuerName: text("issuerName"),
  linkDelivery: text("linkDelivery"),
  linkDr: text("linkDr"),
  publishDate: timestamp("publishDate", { withTimezone: true }),
  submissionDeadlineDate: timestamp("submissionDeadlineDate", {
    withTimezone: true,
  }),
  summary: text("summary"),
  deepDiveAvailable: boolean("deepDiveAvailable"),
  title: text("title"),
  awardCriteria: json("awardCriteria"),
  cpvs: text("cpvs").array(),
  documents: json("documents"),
  drTitle: text("drTitle"),
  executionDeadlineDays: integer("executionDeadlineDays"),
  issuerInfo: json("issuerInfo"),
  drPdfUrl: text("drPdfUrl"),
  renews: boolean("renews"),
  reviewBodyInfo: json("reviewBodyInfo"),
});

export type Contract = InferSelectModel<typeof contractsTable>;

// RELAÇÃO CONTRATO ORGANIZAÇÃO
export const contractsOrganizationsTable = pgTable("contracts_organizations", {
  contractId: uuid("contractId"),
  organizationId: uuid("organizationId"),
  saved: boolean("saved"),
  comments: text("comments"),
  labels: text("labels").array(),
});

export type ContractsOrganization = InferSelectModel<
  typeof contractsOrganizationsTable
>;

// RELAÇÃO CONTRATO QUERY
export const contractsQueriesTable = pgTable("contracts_queries", {
  contractId: uuid("contractId"),
  queryId: uuid("queryId"),
  matchTypeFull: boolean("matchTypeFull"),
  reason: json("reason"),
});

export type ContractsQuery = InferSelectModel<typeof contractsQueriesTable>;

// COSTS, ISTO É DO VASCO ACHO
export const costsTable = pgTable("costs", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: text("organizationId"),
  userId: uuid("userId"),
  costType: text("costType"),
  actionType: text("actionType"),
  actionSubType: text("actionSubType"),
  value: numeric("value"),
});

export type Cost = InferSelectModel<typeof costsTable>;

// CPVS
export const cpvsListTable = pgTable("cpvsList", {
  fullName: text("fullName"),
  code: text("code"),
  name: text("name"),
});

export type CpvsList = InferSelectModel<typeof cpvsListTable>;

// DEEP DIVE LATEST
export const deepdiveLatestTable = pgTable("deepdive_latest_table", {
  organizationId: uuid("organizationId"),
  contractId: uuid("contractId"),
  templateId: uuid("templateId"),
  rowHeader: text("rowHeader"),
  value: text("value"),
});

export type DeepdiveLatest = InferSelectModel<typeof deepdiveLatestTable>;

// DEEP DIVE TEMPLATES
export const deepdiveTemplatesTable = pgTable("deepdive_templates", {
  templateId: uuid("templateId")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organizationId"),
  name: text("name"),
  createdAt: timestamp("createdAt", { withTimezone: true }),
});

export type DeepdiveTemplate = InferSelectModel<typeof deepdiveTemplatesTable>;

// DEEP DIVE VERSIONS (ISTO É DO VASCO)
export const deepdiveVersionsTable = pgTable("deepdive_versions", {
  templateId: uuid("templateId"),
  templateVersionOrder: integer("templateVersionOrder"),
  contractId: uuid("contractId"),
  templateArray: json("templateArray"),
});

export type DeepdiveVersion = InferSelectModel<typeof deepdiveVersionsTable>;

// FEED CUSTOM FIELDS
export const feedCustomFieldsTable = pgTable("feed_custom_fields", {
  organizationId: uuid("organizationId"),
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  fieldName: text("fieldName"),
  fieldType: text("fieldType"),
  createdAt: timestamp("createdAt", { withTimezone: true }),
});

export type FeedCustomField = InferSelectModel<typeof feedCustomFieldsTable>;

// FEED CUSTOM FIELDS VALUES
export const feedCustomFieldsValuesTable = pgTable(
  "feed_custom_fields_values",
  {
    organizationId: uuid("organizationId"),
    fieldId: uuid("fieldId"),
    contractId: uuid("contractId"),
    value: text("value"),
  }
);

export type FeedCustomFieldValue = InferSelectModel<
  typeof feedCustomFieldsValuesTable
>;

// ADJUDICANTES
export const issuersListTable = pgTable("issuersList", {
  name: text("name"),
  nif: text("nif"),
});

export type IssuersList = InferSelectModel<typeof issuersListTable>;

// TABELA DE LIGAR/DESLIGAR FEATURES DE CADA ORGANIZAÇÃO
export const organizationFeaturesTable = pgTable("organization_features", {
  organizationId: uuid("organizationId").primaryKey(),
  feature_deepdive: boolean("feature_deepdive"),
  feature_marketintel: boolean("feature_marketintel"),
});

export type OrganizationFeature = InferSelectModel<
  typeof organizationFeaturesTable
>;

// KEYWORDS DA ORGANIZAÇÃO
export const organizationKeywordsTable = pgTable("organization_keywords", {
  organizationId: uuid("organizationId"),
  keyword: text("keyword"),
});

export type OrganizationKeyword = InferSelectModel<
  typeof organizationKeywordsTable
>;

// EMPRESAS FAVORITAS DO MARKETINTEL DA ORGANIZAÇÃO
export const organizationMarketintelFavouritesTable = pgTable(
  "organization_marketintel_favourites",
  {
    organizationId: uuid("organizationId"),
    nif: text("nif"),
  }
);

export type OrganizationMarketintelFavourite = InferSelectModel<
  typeof organizationMarketintelFavouritesTable
>;

// FASE DO PIPELINE
export const pipelinePhaseContractTable = pgTable("pipeline_phase_contract", {
  phaseId: uuid("phaseId"),
  organizationId: uuid("organizationId"),
  contractId: uuid("contractId"),
  orderInPhase: integer("orderInPhase"),
});

export type PipelinePhaseContract = InferSelectModel<
  typeof pipelinePhaseContractTable
>;

// AS VÁRIAS FASES DO PIPELINE
export const pipelinePhasesTable = pgTable("pipeline_phases", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organizationId"),
  phaseName: text("phaseName"),
  phaseOrder: integer("phaseOrder"),
  createdAt: timestamp("createdAt", { withTimezone: true }),
});

export type PipelinePhase = InferSelectModel<typeof pipelinePhasesTable>;

// QUERIES
export const queriesTable = pgTable("queries", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text("geoset"),
  organizationId: uuid("organizationId"),
  starred: boolean("starred"),
  title: text("title"),
  inputData: json("inputData"),
  createdAt: timestamp("createdAt", { withTimezone: true }),
  status: text("status"),
  refresh_autoRefresh: boolean("refresh_autoRefresh"),
  refresh_autoRefreshEmail: boolean("refresh_autoRefreshEmail"),
  refresh_lastContractDate: timestamp("refresh_lastContractDate", {
    withTimezone: true,
  }),
  refresh_lastContractId: json("refresh_lastContractId"),
  extraEmails: text("extraEmails").array(),
});

export type Query = InferSelectModel<typeof queriesTable>;

// USERS
export const usersTable = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text("name"),
  email: text("email"),
});

export type User = InferSelectModel<typeof usersTable>;

export const usersOrganizationsTable = pgTable("users_organizations", {
  userId: uuid("userId"),
  organizationId: uuid("organizationId"),
  role: text("role"),
  lastOnline: timestamp("lastOnline", { withTimezone: true }),
});

export type UsersOrganization = InferSelectModel<
  typeof usersOrganizationsTable
>;
