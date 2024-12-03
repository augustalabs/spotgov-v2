import { db } from "@/database/db";
import { queries, Query } from "@/database/schemas";
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
): Promise<void> {
  await db.update(queries).set({ title }).where(eq(queries.id, queryId));
}

// TODO: Handle errors
export async function deleteQuery(queryId: string): Promise<void> {
  try {
    await db.delete(queries).where(eq(queries.id, queryId));
  } catch (error) {
    console.error(error);
  }
}
