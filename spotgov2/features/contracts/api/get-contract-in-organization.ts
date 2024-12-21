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
      and(
        eq(contracts.id, contractsOrganizations.contractId),
        eq(contractsOrganizations.organizationId, organizationId)
      ),
    )
    .where(eq(contracts.id, contractId))
    .then((results) => results[0]);

  if (!result) return null;

  return {
    ...result.contracts,
    contractsOrganization: result.contracts_organizations ?? null
  };
}

export default getContractInOrganization;
