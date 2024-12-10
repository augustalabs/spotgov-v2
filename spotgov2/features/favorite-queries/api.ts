import { db } from "@/database/db";
import {
  Contract,
  contracts,
  contractsQueries,
  queries,
} from "@/database/schemas";
import { and, eq } from "drizzle-orm";

type ContractsWithMatchTypeAndReasonPerQuery = {
  [queryId: string]: {
    contracts: (Contract & {
      matchTypeFull: boolean | null;
      // TODO: Check why this is unknown
      reason: unknown;
    })[];
  };
};

export async function getFavoriteQueriesContracts(organizationId: string) {
  const res = await db
    .select({
      matchTypeFull: contractsQueries.matchTypeFull,
      reason: contractsQueries.reason,
      queryId: queries.id,
      contracts: contracts,
    })
    .from(queries)
    .innerJoin(contractsQueries, eq(contractsQueries.queryId, queries.id))
    .innerJoin(contracts, eq(contracts.id, contractsQueries.contractId))
    .where(
      and(
        eq(queries.organizationId, organizationId),
        eq(queries.starred, true),
      ),
    );

  let contractsPerQuery = {} as ContractsWithMatchTypeAndReasonPerQuery;

  res.map((r) => {
    if (!contractsPerQuery[r.queryId]) {
      contractsPerQuery[r.queryId] = {
        contracts: [],
      };
    }

    contractsPerQuery[r.queryId].contracts.push({
      ...r.contracts,
      matchTypeFull: r.matchTypeFull,
      reason: r.reason,
    });
  });

  return contractsPerQuery;
}
