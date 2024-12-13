"use server";

import { db } from "@/database/db";
import { queries, Query } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function getOrganizationQueries(
  organizationId: string,
): Promise<Query[]> {
  return await db
    .select()
    .from(queries)
    .where(eq(queries.organizationId, organizationId));
}

export default getOrganizationQueries;
