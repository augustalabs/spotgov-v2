import { db } from "@/database/db";

import { Organization } from "@/database/schemas";

import { organizations } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function updateOrganizationCredits(
  organizationId: string,
    credits: {
        deepDiveCurrency: number;
        matchmakingCurrency: number;
  }
): Promise<Organization[]> {
  return await db.update(organizations).set({
    
      deepDiveCurrency: credits.deepDiveCurrency,
      matchmakingCurrency: credits.matchmakingCurrency,
    
  }).where(eq(organizations.id, organizationId)).returning();
}

export default updateOrganizationCredits;   