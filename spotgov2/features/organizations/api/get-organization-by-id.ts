import { Organization } from "@/database/schemas";

import { db } from "@/database/db";

import { organizations } from "@/database/schemas";

import { eq } from "drizzle-orm";

async function getOrganizationById(organizationId: string): Promise<Organization | null> {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  
  return result[0] || null;
}

export default getOrganizationById;