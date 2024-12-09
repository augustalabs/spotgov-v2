"use server";

import { db } from "@/database/db";
import { keywords } from "@/database/schemas";
import { eq } from "drizzle-orm";

export async function getKeywords({ organizationId }: { organizationId: string }) {
    return await db
        .select({
            keyword: keywords.keyword,
            createdAt: keywords.createdAt
        })
        .from(keywords)
        .where(eq(keywords.organizationId, organizationId))
}