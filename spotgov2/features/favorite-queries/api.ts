import { db } from "@/database/db";
import {
  contracts,
  contractsOrganizations,
  contractsQueries,
  queries,
} from "@/database/schemas";
import { ContractsWithMatchTypeAndReasonPerQuery } from "@/types";
import { and, eq } from "drizzle-orm";

export async function getFavoriteQueriesContracts(organizationId: string) {
  const res = await db
    .select({
      matchTypeFull: contractsQueries.matchTypeFull,
      reason: contractsQueries.reason,
      queryId: queries.id,
      contracts: contracts,
      saved: contractsOrganizations.saved,
      queryTitle: queries.title,
    })
    .from(queries)
    .innerJoin(contractsQueries, eq(contractsQueries.queryId, queries.id))
    .innerJoin(contracts, eq(contracts.id, contractsQueries.contractId))
    .innerJoin(
      contractsOrganizations,
      eq(contractsOrganizations.contractId, contracts.id),
    )
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
      saved: r.saved,
      queryTitle: r.queryTitle,
      reason: r.reason,
    });
  });

  return contractsPerQuery;
}
