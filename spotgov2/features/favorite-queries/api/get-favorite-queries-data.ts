"use server";

import { db } from "@/database/db";
import {
  contracts,
  contractsOrganizations,
  contractsQueries,
  queries,
} from "@/database/schemas";
import { and, eq, gte, ilike, inArray, lte, or, SQL, sql } from "drizzle-orm";
import { FavoriteContractsDataType } from "../types";
import { OrderType } from "@/types";

function getSortOption(sort: OrderType): SQL {
  const sortOptions: Record<OrderType, SQL> = {
    "publish-date-desc": sql`${contracts.publishDate} DESC`,
    "publish-date-asc": sql`${contracts.publishDate} ASC`,
    "base-price-desc": sql`${contracts.basePrice} DESC`,
    "base-price-asc": sql`${contracts.basePrice} ASC`,
    "deadline-asc": sql`${contracts.submissionDeadlineDate} ASC`,
    "deadline-desc": sql`${contracts.submissionDeadlineDate} DESC`,
  };

  return sortOptions[sort];
}

async function getFavoriteQueriesData(
  organizationId: string,
  page: number = 1,
  pageSize: number = 8,
  searchTextInput: string = "",
  adjudicatorsInput: string[] = [],
  titlesInput: string[] = [],
  savedInput: string | null = null,
  cpvsInput: string[] = [],
  minPriceInput: number | null = null,
  maxPriceInput: number | null = null,
  minPublishDateInput: Date | null = null,
  maxPublishDateInput: Date | null = null,
  onlyPriceCriteriaInput: string = "false",
  sortInput: OrderType = "publish-date-desc",
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
      adjudicators: sql<string[]>`array_agg(${contracts.issuerName}) OVER()`,
      queryTitles: sql<string[]>`array_agg(${queries.title}) OVER()`,
      distinctCpvs: sql<string[]>`array_agg(cpv) OVER()`,
      minBasePrice: sql<string>`MIN(${contracts.basePrice}) OVER()`,
      maxBasePrice: sql<string>`MAX(${contracts.basePrice}) OVER()`,
      minPublishDate: sql<Date>`MIN(${contracts.publishDate}) OVER()`,
      maxPublishDate: sql<Date>`MAX(${contracts.publishDate}) OVER()`,
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
    .leftJoin(
      sql`(
          select distinct unnest(${contracts.cpvs}::text[]) as cpv, ${contracts.id} AS contract_id
          from ${contracts}
        ) as distinct_cpvs`,
      sql`contracts.id = distinct_cpvs.contract_id`,
    )
    .where(
      and(
        eq(queries.organizationId, organizationId),
        eq(queries.starred, true),
        or(
          ilike(contracts.title, `%${searchTextInput}%`),
          ilike(contracts.issuerName, `%${searchTextInput}%`),
        ),
        adjudicatorsInput.length > 0
          ? inArray(sql`LOWER(${contracts.issuerName})`, adjudicatorsInput)
          : sql`true`,
        titlesInput.length > 0
          ? inArray(sql`LOWER(${queries.title})`, titlesInput)
          : sql`true`,
        savedInput !== null
          ? eq(contractsOrganizations.saved, savedInput === "true")
          : sql`true`,
        cpvsInput.length > 0
          ? inArray(sql`LOWER(distinct_cpvs.cpv)`, cpvsInput)
          : sql`true`,
        minPriceInput !== null
          ? gte(contracts.basePrice, String(minPriceInput))
          : sql`true`,
        maxPriceInput !== null
          ? lte(contracts.basePrice, String(maxPriceInput))
          : sql`true`,
        minPublishDateInput !== null
          ? gte(contracts.publishDate, minPublishDateInput)
          : sql`true`,
        maxPublishDateInput !== null
          ? lte(contracts.publishDate, maxPublishDateInput)
          : sql`true`,
        onlyPriceCriteriaInput === "true"
          ? and(
              eq(
                sql`
              jsonb_array_length(
                COALESCE(
                  CASE 
                  WHEN jsonb_typeof(${contracts.awardCriteria}::jsonb) = 'array' 
                  THEN ${contracts.awardCriteria}::jsonb
                  ELSE '[]'::jsonb 
                  END, 
                  '[]'::jsonb
                  )
                  )`,
                1,
              ),
              eq(
                sql`
                  ${contracts.awardCriteria}::jsonb->0->>'Nome'`,
                "Preço",
              ),
            )
          : sql`true`,
      ),
    )
    .orderBy(getSortOption(sortInput))
    .limit(pageSize)
    .offset(offset);

  const data = res.map((row) => ({
    ...row,
    totalCount: row.totalCount,
    distinctAdjudicators: Array.from(new Set(row.adjudicators)),
    distinctQueryTitles: Array.from(new Set(row.queryTitles)),
    distinctCpvs: Array.from(new Set(row.distinctCpvs)),
    minBasePrice: row.minBasePrice,
    maxBasePrice: row.maxBasePrice,
  }));

  return {
    paginatedContracts: data,
    totalCount: data[0]?.totalCount ?? 0,
    distinctAdjudicators: data[0]?.distinctAdjudicators ?? [],
    distinctQueryTitles: data[0]?.distinctQueryTitles ?? [],
    distinctCpvs: data[0]?.distinctCpvs ?? [],
    basePriceRange: {
      min: parseFloat(data[0]?.minBasePrice) ?? 0,
      max: parseFloat(data[0]?.maxBasePrice) ?? 100000000,
    },
    publishDateRange: {
      from: data[0]?.minPublishDate ?? undefined,
      to: data[0]?.maxPublishDate ?? undefined,
    },
  };
}

export default getFavoriteQueriesData;
