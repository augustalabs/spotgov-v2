import { boolean, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import contracts from "./contracts";
import organizations from "./organizations";
import { InferSelectModel } from "drizzle-orm";

const contractsOrganizations = pgTable(
  "contracts_organizations",
  {
    contractId: uuid("contract_id")
      .references(() => contracts.id)
      .notNull(),
    organizationId: uuid("organization_id")
      .references(() => organizations.id)
      .notNull(),
    saved: boolean("saved"),
    comments: text("comments"),
    labels: text("labels").array(),
  },
  (t) => [primaryKey({ columns: [t.contractId, t.organizationId] })]
);
export type ContractsOrganizations = InferSelectModel<typeof contractsOrganizations>;
export default contractsOrganizations;
