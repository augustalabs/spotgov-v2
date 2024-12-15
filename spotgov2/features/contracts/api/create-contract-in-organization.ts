"use server";

import { db } from "@/database/db";
import contractsOrganizations from "@/database/schemas/contracts-organizations";

type CreateContractInOrganizationParams = {
  contractId: string;
  organizationId: string;
};

async function createContractInOrganization({
  contractId,
  organizationId,
}: CreateContractInOrganizationParams): Promise<void> {
  try {
    await db.insert(contractsOrganizations).values({
      contractId,
      organizationId,
      saved: false, // Or default values as per your schema
      comments: null,
      labels: [],
    }).onConflictDoNothing(); 
    console.log(`contracts_organizations record created for contractId ${contractId} and organizationId ${organizationId}`);
  } catch (error) {
    // Handle any errors that might occur during insertion
    console.error("Error inserting contracts_organizations record:", error);
    throw error; // Re-throw if needed
  }
}

export default createContractInOrganization;