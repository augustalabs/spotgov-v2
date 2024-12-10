import { db } from "@/database/db";
import { contractsQueries, queries, Query } from "@/database/schemas";
import { eq } from "drizzle-orm";

export async function getOrganizationQueries(
  organizationId: string
): Promise<Query[]> {
  return await db
    .select()
    .from(queries)
    .where(eq(queries.organizationId, organizationId));
}

// TODO: Handle errors
export async function updateQueryTitle(
  queryId: string,
  title: string
): Promise<Query[]> {
  return await db
    .update(queries)
    .set({ title })
    .where(eq(queries.id, queryId))
    .returning();
}

// TODO: Handle errors
export async function deleteQuery(queryId: string): Promise<void> {
  await db.delete(queries).where(eq(queries.id, queryId));
}