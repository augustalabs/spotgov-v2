CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"nif" text NOT NULL,
	"name" text NOT NULL,
	"deep_dive_currency" integer DEFAULT 3,
	"matchmaking_currency" integer DEFAULT 3,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"updated_at" text,
	CONSTRAINT "organizations_id_unique" UNIQUE("id"),
	CONSTRAINT "organizations_nif_unique" UNIQUE("nif")
);
