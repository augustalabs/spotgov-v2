"use server";

import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { OrganizationWithUserInfo } from "@/types";
import { eq } from "drizzle-orm";

async function getOrganizations(
  userId: string,
): Promise<OrganizationWithUserInfo[]> {
  return await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.userId, userId),
    with: {
      organization: true,
    },
  });
}

export default getOrganizations;
