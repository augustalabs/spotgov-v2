CREATE TYPE "public"."user_organization_role" AS ENUM('admin', 'member', 'viewer');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contract_lots" (
	"contract_id" uuid,
	"lot_number" text,
	"description" text,
	"base_price" numeric(20, 2),
	"cpvs" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contract_tables" (
	"contract_id" uuid,
	"name" text,
	"column_name" text,
	"row" integer,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"geoset" text,
	"contract_number" text,
	"user_uploaded" boolean,
	"base_price" numeric,
	"contract_type" text,
	"eu_funds" boolean,
	"execution_location" text,
	"issuer_name" text,
	"link_delivery" text,
	"link_dr" text,
	"publish_date" timestamp with time zone,
	"submission_deadline_date" timestamp with time zone,
	"summary" text,
	"deep_dive_available" boolean,
	"deepdive_unavailable_reason" text,
	"title" text,
	"award_criteria" json,
	"cpvs" text[],
	"documents" json,
	"dr_title" text,
	"execution_deadline_days" integer,
	"issuer_info" json,
	"dr_pdf_url" text,
	"renews" boolean,
	"review_body_info" json,
	"max_lots" integer,
	"max_lots_per_contestant" integer,
	"extra_data" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts_organizations" (
	"contract_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"saved" boolean,
	"comments" text,
	"labels" text[],
	CONSTRAINT "contracts_organizations_contract_id_organization_id_pk" PRIMARY KEY("contract_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contracts_queries" (
	"contract_id" uuid,
	"query_id" uuid,
	"match_type_full" boolean,
	"reason" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cpvs_list" (
	"full_name" text,
	"code" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deepdive_latest_table" (
	"organization_id" uuid NOT NULL,
	"contract_id" uuid NOT NULL,
	"template_id" uuid NOT NULL,
	"row_header" text NOT NULL,
	"value" text,
	CONSTRAINT "deepdive_latest_table_organization_id_contract_id_template_id_row_header_pk" PRIMARY KEY("organization_id","contract_id","template_id","row_header")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deepdive_templates" (
	"template_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"organization_id" uuid,
	"name" text,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deepdive_versions" (
	"template_id" uuid,
	"template_version_order" integer,
	"contract_id" uuid,
	"template_array" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feed_custom_fields" (
	"organization_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"field_name" text,
	"field_type" text,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feed_custom_fields_values" (
	"organization_id" uuid,
	"field_id" uuid,
	"contract_id" uuid,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "issuers_list" (
	"name" text,
	"nif" text,
	"total_value_closed" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_features" (
	"organization_id" uuid PRIMARY KEY NOT NULL,
	"feature_deepdive" boolean,
	"feature_marketintel" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_keywords" (
	"organization_id" uuid,
	"keyword" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_marketintel_favourites" (
	"organization_id" uuid,
	"nif" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"nif" text NOT NULL,
	"name" text NOT NULL,
	"deep_dive_currency" integer DEFAULT 3,
	"matchmaking_currency" integer DEFAULT 3,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "organizations_id_unique" UNIQUE("id"),
	CONSTRAINT "organizations_nif_unique" UNIQUE("nif")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pipeline_phase_contract" (
	"phase_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"contract_id" uuid NOT NULL,
	"order_in_phase" integer,
	CONSTRAINT "pipeline_phase_contract_phase_id_organization_id_contract_id_pk" PRIMARY KEY("phase_id","organization_id","contract_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pipeline_phases" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"organization_id" uuid,
	"phase_name" text,
	"phase_order" integer,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "queries" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"geoset" text,
	"organization_id" uuid,
	"starred" boolean,
	"title" text,
	"input_data" json,
	"created_at" timestamp with time zone,
	"status" text,
	"refresh_autorefresh" boolean,
	"refresh_autorefresh_email" boolean,
	"refresh_last_contract_date" timestamp with time zone,
	"refresh_last_contract_id" json,
	"extra_emails" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usage" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"action_type" text NOT NULL,
	"action_sub_type" text NOT NULL,
	"action_sub_sub_type" text NOT NULL,
	"action_value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usage_cost" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"usage_id" uuid NOT NULL,
	"cost_type" text NOT NULL,
	"cost_sub_type" text NOT NULL,
	"cost_value" numeric(20, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text,
	"email" text,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_organizations" (
	"user_id" uuid,
	"organization_id" uuid,
	"role" "user_organization_role" NOT NULL,
	"last_online" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contract_lots" ADD CONSTRAINT "contract_lots_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contract_tables" ADD CONSTRAINT "contract_tables_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts_organizations" ADD CONSTRAINT "contracts_organizations_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts_organizations" ADD CONSTRAINT "contracts_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts_queries" ADD CONSTRAINT "contracts_queries_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contracts_queries" ADD CONSTRAINT "contracts_queries_query_id_queries_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."queries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_latest_table" ADD CONSTRAINT "deepdive_latest_table_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_latest_table" ADD CONSTRAINT "deepdive_latest_table_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_latest_table" ADD CONSTRAINT "deepdive_latest_table_template_id_deepdive_templates_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."deepdive_templates"("template_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_templates" ADD CONSTRAINT "deepdive_templates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_versions" ADD CONSTRAINT "deepdive_versions_template_id_deepdive_templates_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."deepdive_templates"("template_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deepdive_versions" ADD CONSTRAINT "deepdive_versions_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feed_custom_fields" ADD CONSTRAINT "feed_custom_fields_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feed_custom_fields_values" ADD CONSTRAINT "feed_custom_fields_values_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feed_custom_fields_values" ADD CONSTRAINT "feed_custom_fields_values_field_id_feed_custom_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."feed_custom_fields"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feed_custom_fields_values" ADD CONSTRAINT "feed_custom_fields_values_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_features" ADD CONSTRAINT "organization_features_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_keywords" ADD CONSTRAINT "organization_keywords_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_marketintel_favourites" ADD CONSTRAINT "organization_marketintel_favourites_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pipeline_phase_contract" ADD CONSTRAINT "pipeline_phase_contract_phase_id_pipeline_phases_id_fk" FOREIGN KEY ("phase_id") REFERENCES "public"."pipeline_phases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pipeline_phase_contract" ADD CONSTRAINT "pipeline_phase_contract_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pipeline_phase_contract" ADD CONSTRAINT "pipeline_phase_contract_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pipeline_phases" ADD CONSTRAINT "pipeline_phases_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "queries" ADD CONSTRAINT "queries_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage" ADD CONSTRAINT "usage_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage" ADD CONSTRAINT "usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage_cost" ADD CONSTRAINT "usage_cost_usage_id_usage_id_fk" FOREIGN KEY ("usage_id") REFERENCES "public"."usage"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
