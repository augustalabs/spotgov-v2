"use server";

import { db } from "@/database/db";
import { queries, Query } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function deleteQuery(queryId: string): Promise<Query[]> {
  return await db.delete(queries).where(eq(queries.id, queryId)).returning();
}

export default deleteQuery;
