"use server";

import { eq, and } from "drizzle-orm";
import { db } from "@/database/db";
import { contracts, contractsOrganizations } from "@/database/schemas";
import { JoinedContractInOrganization } from "@/types";

async function getContractInOrganization({ contractId, organizationId }: { contractId: string, organizationId: string }): Promise<JoinedContractInOrganization | null> {
  const result = await db
    .select()
    .from(contracts)
    .leftJoin(
      contractsOrganizations,
      eq(contracts.id, contractsOrganizations.contractId),
    )
    .where(and(eq(contracts.id, contractId), eq(contractsOrganizations.organizationId, organizationId)))
    .then((results) => results[0]);

  if (!result) return null;

  // Transform the result to the desired structure
  return {
    ...result.contracts,
    contracts_organizations: result.contracts_organizations ?? null
  };
}

export default getContractInOrganization;
