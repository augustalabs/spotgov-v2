"use server";

import { db } from "@/database/db";
import { queries, Query } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function updateQueryTitle(
  queryId: string,
  title: string,
): Promise<Query[]> {
  return await db
    .update(queries)
    .set({ title })
    .where(eq(queries.id, queryId))
    .returning();
}

export default updateQueryTitle;
