"use server";

import { db } from "@/database/db";
import { entities } from "@/database/schemas";
import { eq } from "drizzle-orm";

export async function getAdjudicatingEntities() {
    return await db
        .selectDistinct()
        .from(entities)
        .where(eq(entities.isAdjudicante, true));
}