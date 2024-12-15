"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { contracts } from "@/database/schemas";

async function getContractById({ contractId }: { contractId: string }) {
  return await db
    .select()
    .from(contracts)
    .where(eq(contracts.id, contractId))
    .then((results) => results[0]);
}

export default getContractById;
