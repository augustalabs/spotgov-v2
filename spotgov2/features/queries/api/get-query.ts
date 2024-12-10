"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { queries } from "@/database/schemas";

export async function getQueryById({ queryId }: { queryId: string }) {
    return await db
        .select()
        .from(queries)
        .where(eq(queries.id, queryId))
        .then((results) => results[0]);
}
