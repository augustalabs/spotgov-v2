"use server";

import { db } from "@/database/db";
import { contracts, contractsQueries, Query } from "@/database/schemas";
import { desc, eq } from "drizzle-orm";

/**
 * TODO:
 *   - Handle errors
 *   - Return type
 */

// Orderer by publishDate
async function getQueryContracts({ queryId }: { queryId: Query["id"] }) {
  return await db
    .select({
      contract: contracts,
      matchTypeFull: contractsQueries.matchTypeFull,
      reason: contractsQueries.reason,
    })
    .from(contractsQueries)
    .innerJoin(contracts, eq(contractsQueries.contractId, contracts.id))
    .where(eq(contractsQueries.queryId, queryId))
    .orderBy(desc(contracts.publishDate))
    .then((results) =>
      results.map((row) => ({
        ...row.contract,
        matchTypeFull: row.matchTypeFull,
        reason: row.reason,
      })),
    );
}

export default getQueryContracts;
