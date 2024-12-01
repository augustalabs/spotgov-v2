import { boolean, json, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import contracts from "./contracts";
import queries from "./queries";

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

export default contractsQueries;
