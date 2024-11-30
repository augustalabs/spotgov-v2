import { InferSelectModel, sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  uuid,
  integer,
  numeric,
  boolean,
  timestamp,
  json,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';

// TODO: Organizar esta merda

export const organizations = pgTable('organizations', {
  id: uuid('id')
    .primaryKey()
    .unique()
    .default(sql`uuid_generate_v4()`),
  nif: text('nif').notNull().unique(),
  name: text('name').notNull(),
  deep_dive_currency: integer('deep_dive_currency').default(3),
  matchmaking_currency: integer('matchmaking_currency').default(3),
  created_at: timestamp('created_at', { withTimezone: true }).default(
    sql`now()`
  ),
  updated_at: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`
  ),
});

export type Organization = InferSelectModel<typeof organizations>;

// CONTRATO
export const contracts = pgTable('contracts', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text('geoset'),
  contract_number: text('contract_number'),
  user_uploaded: boolean('user_uploaded'),
  base_price: numeric('base_price'),
  contract_type: text('contract_type'),
  eu_funds: boolean('eu_funds'),
  execution_location: text('execution_location'),
  issuer_name: text('issuer_name'),
  link_delivery: text('link_delivery'),
  link_dr: text('link_dr'),
  publish_date: timestamp('publish_date', { withTimezone: true }),
  submission_deadline_date: timestamp('submission_deadline_date', {
    withTimezone: true,
  }),
  summary: text('summary'),
  deep_dive_available: boolean('deep_dive_available'),
  deepdive_unavailable_reason: text('deepdive_unavailable_reason'),
  title: text('title'),
  award_criteria: json('award_criteria'),
  cpvs: text('cpvs').array(),
  documents: json('documents'),

  execution_deadline_days: integer('execution_deadline_days'),
  issuer_info: json('issuer_info'),
  dr_pdf_url: text('dr_pdf_url'),
  renews: boolean('renews'),
  review_body_info: json('review_body_info'),
  max_lots: integer('max_lots'),
  max_lots_per_contestant: integer('max_lots_per_contestant'),
  extra_data: json('extra_data'),
});

export type Contract = InferSelectModel<typeof contracts>;

export const contract_lots = pgTable('contract_lots', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  contract_id: uuid('contract_id').references(() => contracts.id),
  lot_number: text('lot_number'),
  description: text('description'),
  base_price: numeric('base_price', { precision: 20, scale: 2 }),
  cpvs: text('cpvs').array(),
});

export type ContractLot = InferSelectModel<typeof contract_lots>;

// TABELA DE FILES NO CONTRATO ACHO
export const contract_tables = pgTable('contract_tables', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  contract_id: uuid('contract_id').references(() => contracts.id),
  name: text('name'),
  column_name: text('column_name'),
  row: integer('row'),
  value: text('value'),
});

export type ContractTable = InferSelectModel<typeof contract_tables>;

// RELAÇÃO CONTRATO ORGANIZAÇÃO
export const contracts_organizations = pgTable(
  'contracts_organizations',
  {
    contract_id: uuid('contract_id')
      .references(() => contracts.id)
      .notNull(),
    organization_id: uuid('organization_id')
      .references(() => organizations.id)
      .notNull(),
    saved: boolean('saved'),
    comments: text('comments'),
    labels: text('labels').array(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.contract_id, table.organization_id],
      }),
    };
  }
);

export type ContractsOrganization = InferSelectModel<
  typeof contracts_organizations
>;

// RELAÇÃO CONTRATO QUERY
export const contracts_queries = pgTable(
  'contracts_queries',
  {
    contract_id: uuid('contract_id').references(() => contracts.id),
    query_id: uuid('query_id').references(() => queries.id),
    match_type_full: boolean('match_type_full'),
    reason: json('reason'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.contract_id, table.query_id] }),
  })
);

export type ContractsQuery = InferSelectModel<typeof contracts_queries>;

// COSTS, ISTO É DO VASCO ACHO
export const usage = pgTable('usage', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organization_id: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  action_type: text('action_type').notNull(),
  action_sub_type: text('action_sub_type').notNull(),
  action_sub_sub_type: text('action_sub_sub_type').notNull(),
  action_value: text('action_value').notNull(),
});

export type Usage = InferSelectModel<typeof usage>;

export const usage_cost = pgTable('usage_cost', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  usage_id: uuid('usage_id')
    .references(() => usage.id)
    .notNull(),
  cost_type: text('cost_type').notNull(),
  cost_sub_type: text('cost_sub_type').notNull(),
  cost_value: numeric('cost_value', { precision: 20, scale: 2 }).notNull(),
});

export type UsageCost = InferSelectModel<typeof usage_cost>;

// CPVS
export const cpvs_list = pgTable('cpvs_list', {
  code: text('code').primaryKey(),
  full_name: text('full_name'),
  name: text('name'),
});

export type CpvsList = InferSelectModel<typeof cpvs_list>;

// DEEP DIVE LATEST
export const deepdive_latest_table = pgTable(
  'deepdive_latest_table',
  {
    organization_id: uuid('organization_id')
      .references(() => organizations.id)
      .notNull(),
    contract_id: uuid('contract_id')
      .references(() => contracts.id)
      .notNull(),
    template_id: uuid('template_id')
      .references(() => deepdive_templates.template_id)
      .notNull(),
    row_header: text('row_header').notNull(),
    value: text('value'),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [
          table.organization_id,
          table.contract_id,
          table.template_id,
          table.row_header,
        ],
      }),
    };
  }
);

export type DeepdiveLatest = InferSelectModel<typeof deepdive_latest_table>;

// DEEP DIVE TEMPLATES
export const deepdive_templates = pgTable('deepdive_templates', {
  template_id: uuid('template_id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organization_id: uuid('organization_id').references(() => organizations.id),
  name: text('name'),
  created_at: timestamp('created_at', { withTimezone: true }),
});

export type DeepdiveTemplate = InferSelectModel<typeof deepdive_templates>;

// DEEP DIVE VERSIONS (ISTO É DO VASCO)
export const deepdive_versions = pgTable(
  'deepdive_versions',
  {
    template_id: uuid('template_id').references(
      () => deepdive_templates.template_id
    ),
    template_version_order: integer('template_version_order'),
    contract_id: uuid('contract_id').references(() => contracts.id),
    template_array: json('template_array'),
  },
  (table) => ({
    pk: primaryKey({
      columns: [
        table.template_id,
        table.contract_id,
        table.template_version_order,
      ],
    }),
  })
);

export type DeepdiveVersion = InferSelectModel<typeof deepdive_versions>;

// FEED CUSTOM FIELDS
export const feed_custom_fields = pgTable('feed_custom_fields', {
  organization_id: uuid('organization_id').references(() => organizations.id),
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  field_name: text('field_name'),
  field_type: text('field_type'),
  created_at: timestamp('created_at', { withTimezone: true }),
});

export type FeedCustomField = InferSelectModel<typeof feed_custom_fields>;

// FEED CUSTOM FIELDS VALUES
export const feed_custom_fields_values = pgTable('feed_custom_fields_values', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organization_id: uuid('organization_id').references(() => organizations.id),
  field_id: uuid('field_id').references(() => feed_custom_fields.id),
  contract_id: uuid('contract_id').references(() => contracts.id),
  value: text('value'),
});

export type FeedCustomFieldValue = InferSelectModel<
  typeof feed_custom_fields_values
>;

// ADJUDICANTES
export const issuers_list = pgTable('issuers_list', {
  nif: text('nif').primaryKey(),
  name: text('name'),
  total_value_closed: numeric('total_value_closed'),
});

export type IssuersList = InferSelectModel<typeof issuers_list>;

// TABELA DE LIGAR/DESLIGAR FEATURES DE CADA ORGANIZAÇÃO
export const organization_features = pgTable('organization_features', {
  organization_id: uuid('organization_id')
    .primaryKey()
    .references(() => organizations.id),
  feature_deepdive: boolean('feature_deepdive'),
  feature_marketintel: boolean('feature_marketintel'),
  //TODO ADD ALL FEATURES
});

export type OrganizationFeature = InferSelectModel<
  typeof organization_features
>;

// KEYWORDS DA ORGANIZAÇÃO
export const organization_keywords = pgTable('organization_keywords', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organization_id: uuid('organization_id').references(() => organizations.id),
  keyword: text('keyword'),
});

export type OrganizationKeyword = InferSelectModel<
  typeof organization_keywords
>;

// EMPRESAS FAVORITAS DO MARKETINTEL DA ORGANIZAÇÃO
export const organization_marketintel_favourites = pgTable(
  'organization_marketintel_favourites',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    organization_id: uuid('organization_id').references(() => organizations.id),
    nif: text('nif'),
  }
);

export type OrganizationMarketintelFavourite = InferSelectModel<
  typeof organization_marketintel_favourites
>;

// FASE DO PIPELINE
export const pipeline_phase_contract = pgTable(
  'pipeline_phase_contract',
  {
    phase_id: uuid('phase_id')
      .references(() => pipeline_phases.id)
      .notNull(),
    organization_id: uuid('organization_id')
      .references(() => organizations.id)
      .notNull(),
    contract_id: uuid('contract_id')
      .references(() => contracts.id)
      .notNull(),
    order_in_phase: integer('order_in_phase'),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.phase_id, table.organization_id, table.contract_id],
      }),
    };
  }
);

export type PipelinePhaseContract = InferSelectModel<
  typeof pipeline_phase_contract
>;

// AS VÁRIAS FASES DO PIPELINE
export const pipeline_phases = pgTable('pipeline_phases', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organization_id: uuid('organization_id').references(() => organizations.id),
  phase_name: text('phase_name'),
  phase_order: integer('phase_order'),
  created_at: timestamp('created_at', { withTimezone: true }),
});

export type PipelinePhase = InferSelectModel<typeof pipeline_phases>;

// QUERIES
export const queries = pgTable('queries', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  geoset: text('geoset'),
  organization_id: uuid('organization_id').references(() => organizations.id),
  starred: boolean('starred'),
  title: text('title'),
  input_data: json('input_data'),
  created_at: timestamp('created_at', { withTimezone: true }),
  status: text('status'),
  refresh_autorefresh: boolean('refresh_autorefresh'),
  refresh_autorefresh_email: boolean('refresh_autorefresh_email'),
  refresh_last_contract_date: timestamp('refresh_last_contract_date', {
    withTimezone: true,
  }),
  refresh_last_contract_id: json('refresh_last_contract_id'),
  extra_emails: text('extra_emails').array(),
});

export type Query = InferSelectModel<typeof queries>;

// USERS
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text('name'),
  email: text('email').unique(),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at', { withTimezone: true }).default(
    sql`now()`
  ),
  updated_at: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`
  ),
});

export type User = InferSelectModel<typeof users>;

export const userOrganizationRoleEnum = pgEnum('user_organization_role', [
  'admin',
  'member',
  'viewer',
]);
export const users_organizations = pgTable(
  'users_organizations',
  {
    user_id: uuid('user_id').references(() => users.id),
    organization_id: uuid('organization_id').references(() => organizations.id),
    role: userOrganizationRoleEnum('role').notNull(),
    last_online: timestamp('last_online', { withTimezone: true }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.organization_id] }),
  })
);

export type UsersOrganization = InferSelectModel<typeof users_organizations>;
