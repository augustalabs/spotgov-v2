"use server";

import { db } from "@/database/db";
import { cpvs } from "@/database/schemas";

export async function getCPVs() {
    return await db
        .selectDistinct({ fullName: cpvs.fullName })
        .from(cpvs)
}