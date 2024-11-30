ALTER TABLE "cpvs_list" ADD PRIMARY KEY ("code");--> statement-breakpoint
ALTER TABLE "cpvs_list" ALTER COLUMN "code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issuers_list" ADD PRIMARY KEY ("nif");--> statement-breakpoint
ALTER TABLE "issuers_list" ALTER COLUMN "nif" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts_queries" ADD CONSTRAINT "contracts_queries_contract_id_query_id_pk" PRIMARY KEY("contract_id","query_id");--> statement-breakpoint
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_user_id_organization_id_pk" PRIMARY KEY("user_id","organization_id");--> statement-breakpoint
ALTER TABLE "contract_lots" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_custom_fields_values" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_keywords" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_marketintel_favourites" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL;