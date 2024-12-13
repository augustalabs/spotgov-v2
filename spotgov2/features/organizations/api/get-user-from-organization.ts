"use server";

import { db } from "@/database/db";
import { UserOrganization, usersOrganizations } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function getUserFromOrganization(
  userId: string,
  organizationId: string,
): Promise<UserOrganization | undefined> {
  return await db.query.usersOrganizations.findFirst({
    where:
      eq(usersOrganizations.userId, userId) &&
      eq(usersOrganizations.organizationId, organizationId),
  });
}

export default getUserFromOrganization;
