import { db } from "@/database/db";
import { Organization, organizations } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function updateOrganization(
  organizationId: string,
  name: string,
  nif: string,
): Promise<Organization[]> {
  return await db
    .update(organizations)
    .set({ name, nif, updatedAt: new Date() })
    .where(eq(organizations.id, organizationId))
    .returning();
}

export default updateOrganization;
