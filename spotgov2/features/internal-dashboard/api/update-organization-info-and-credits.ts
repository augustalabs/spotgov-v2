import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { organizations } from "@/database/schemas";

const updateOrganizationInfoAndCredits = async (
  organizationId: string,
  deepDiveCredits: number,
  matchmakingCredits: number,
  name: string,
  nif: string,
) => {
  return await db
    .update(organizations)
    .set({
      deepDiveCurrency: deepDiveCredits,
      matchmakingCurrency: matchmakingCredits,
      updatedAt: new Date(),
      name,
      nif,
    })
    .where(eq(organizations.id, organizationId))
    .returning();
};

export default updateOrganizationInfoAndCredits;
