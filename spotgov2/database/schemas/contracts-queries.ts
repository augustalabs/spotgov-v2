import { boolean, json, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import contracts from "./contracts";
import queries from "./queries";
import { InferSelectModel } from "drizzle-orm";

const contractsQueries = pgTable(
  "contracts_queries",
  {
    contractId: uuid("contract_id").references(() => contracts.id),
    queryId: uuid("query_id").references(() => queries.id),
    matchTypeFull: boolean("match_type_full"),
    reason: json("reason"),
  },
  (t) => [primaryKey({ columns: [t.contractId, t.queryId] })]
);

export type ContractQuery = InferSelectModel<typeof contractsQueries>;

export default contractsQueries;
