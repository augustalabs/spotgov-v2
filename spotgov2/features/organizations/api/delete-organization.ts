"use server";

import { db } from "@/database/db";
import { organizations, Organization } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function deleteOrganization(
  organizationId: string,
): Promise<Organization[]> {
  return await db
    .delete(organizations)
    .where(eq(organizations.id, organizationId))
    
}

export default deleteOrganization;