import { db } from "@/database/db";
import {
  contracts,
  contractsOrganizations,
  contractsQueries,
  queries,
} from "@/database/schemas";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { FavoriteContractsDataType } from "./type";

export async function getFavoriteQueriesData(
  organizationId: string,
  page: number = 1,
  pageSize: number = 8,
  searchTextInput: string = "",
): Promise<FavoriteContractsDataType> {
  const offset = (page - 1) * pageSize;

  const res = await db
    .select({
      contract: contracts,
      queryId: queries.id,
      matchTypeFull: contractsQueries.matchTypeFull,
      reason: contractsQueries.reason,
      saved: contractsOrganizations.saved,
      queryTitle: queries.title,
      totalCount: sql<number>`COUNT(*) OVER()`,
      distinctAdjudicators: sql<string>`array_agg(${contracts.issuerName}) OVER()`,
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
        or(
          ilike(contracts.title, `%${searchTextInput}%`),
          ilike(contracts.issuerName, `%${searchTextInput}%`),
        ),
      ),
    )
    .limit(pageSize)
    .offset(offset);

  const data = res.map((row) => ({
    ...row,
    totalCount: row.totalCount,
    distinctAdjudicators: Array.from(new Set(row.distinctAdjudicators)),
  }));

  return {
    paginatedContracts: data,
    totalCount: data[0]?.totalCount ?? 0,
    distinctAdjudicators: data[0]?.distinctAdjudicators ?? [],
  };
}
