"use server";

import { db } from "@/database/db";
import {
  ContractsOrganization,
  contractsOrganizations,
} from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function updateContractSaved(
  organizationId: string,
  contractId: string,
  saved: boolean,
): Promise<ContractsOrganization[]> {
  return await db
    .update(contractsOrganizations)
    .set({
      saved,
    })
    .where(
      and(
        eq(contractsOrganizations.contractId, contractId),
        eq(contractsOrganizations.organizationId, organizationId),
      ),
    )
    .returning();
}

export default updateContractSaved;
