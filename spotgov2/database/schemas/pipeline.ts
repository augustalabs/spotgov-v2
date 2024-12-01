import { InferSelectModel, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import organizations from "./organizations";
import contracts from "./contracts";

export const pipelinePhases = pgTable("pipeline_phases", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  organizationId: uuid("organization_id").references(() => organizations.id),
  phaseName: text("phase_name"),
  phaseOrder: integer("phase_order"),
  createdAt: timestamp("created_at", { withTimezone: true }),
});

export const pipelinePhaseContract = pgTable(
  "pipeline_phase_contract",
  {
    phaseId: uuid("phase_id")
      .references(() => pipelinePhases.id)
      .notNull(),
    organizationId: uuid("organization_id")
      .references(() => organizations.id)
      .notNull(),
    contractId: uuid("contract_id")
      .references(() => contracts.id)
      .notNull(),
    orderInPhase: integer("order_in_phase"),
  },
  (t) => [primaryKey({ columns: [t.phaseId, t.organizationId, t.contractId] })]
);

export type PipelinePhase = InferSelectModel<typeof pipelinePhases>;
export type PipelinePhaseContract = InferSelectModel<
  typeof pipelinePhaseContract
>;
