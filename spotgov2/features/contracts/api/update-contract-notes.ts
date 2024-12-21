"use server";

import { eq, and } from "drizzle-orm";
import { db } from "@/database/db";
import { contracts, contractsOrganizations } from "@/database/schemas";

export default async function updateContractNotes({
  contractId,
  organizationId,
  notes,
}: {
  contractId: string;
  organizationId: string;
  notes: string;
}) {
  await db
    .update(contractsOrganizations)
    .set({ comments: notes })
    .where(
      and(
        eq(contractsOrganizations.contractId, contractId),
        eq(contractsOrganizations.organizationId, organizationId),
      ),
    );
}
