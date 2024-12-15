"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import {  lots } from "@/database/schemas";

async function getContractLots({ contractId }: { contractId: string }) {
  return await db.select().from(lots).where(eq(lots.contractId, contractId));
}

export default getContractLots;
