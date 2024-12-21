import { Organization } from "@/database/schemas";

import { db } from "@/database/db";

import { organizations } from "@/database/schemas";

async function getAllOrganizations(): Promise<Organization[]> {
  return await db.select().from(organizations);
}

export default getAllOrganizations;
