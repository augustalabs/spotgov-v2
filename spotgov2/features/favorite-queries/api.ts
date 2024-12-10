import { db } from "@/database/db";
import {
  contracts,
  contractsOrganizations,
  contractsQueries,
  queries,
} from "@/database/schemas";
import { ContractsWithMatchTypeAndReasonPerQuery } from "@/types";
import { and, count, eq } from "drizzle-orm";

export async function getFavoriteQueriesContractsCount(organizationId: string) {
  const res = await db
    .select({
      count: count(contractsQueries.contractId),
    })
    .from(contractsQueries)
    .innerJoin(contracts, eq(contracts.id, contractsQueries.contractId))
    .innerJoin(queries, eq(queries.id, contractsQueries.queryId))
    .innerJoin(
      contractsOrganizations,
      and(
        eq(contractsOrganizations.contractId, contractsQueries.contractId),
        eq(contractsOrganizations.organizationId, organizationId),
      ),
    )
    .where(
      and(
        eq(queries.organizationId, organizationId),
        eq(queries.starred, true),
      ),
    );

  return res.map((value) => value.count)[0] || 0;
}

export async function getFavoriteQueriesContracts(
  organizationId: string,
  page: number = 1,
  pageSize: number = 10,
) {
  const offset = (page - 1) * pageSize;

  const res = await db
    .select({
      contracts: contracts,
      queryId: queries.id,
      matchTypeFull: contractsQueries.matchTypeFull,
      reason: contractsQueries.reason,
      saved: contractsOrganizations.saved,
      queryTitle: queries.title,
    })
    .from(contractsQueries)
    .innerJoin(contracts, eq(contracts.id, contractsQueries.contractId))
    .innerJoin(queries, eq(queries.id, contractsQueries.queryId))
    .innerJoin(
      contractsOrganizations,
      and(
        eq(contractsOrganizations.contractId, contractsQueries.contractId),
        eq(contractsOrganizations.organizationId, organizationId),
      ),
    )
    .where(
      and(
        eq(queries.organizationId, organizationId),
        eq(queries.starred, true),
      ),
    )
    .limit(pageSize)
    .offset(offset);

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
