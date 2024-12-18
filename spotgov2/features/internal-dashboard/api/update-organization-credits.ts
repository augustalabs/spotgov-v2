import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { organizations } from "@/database/schemas";

const updateOrganizationCredits = async (
  organizationId: string, 
  deepDiveCredits: number, 
  matchmakingCredits: number
) => {
  return await db
    .update(organizations)
    .set({
      deepDiveCurrency: deepDiveCredits,
        matchmakingCurrency: matchmakingCredits,
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, organizationId)).returning()
  
    
}

export default updateOrganizationCredits   