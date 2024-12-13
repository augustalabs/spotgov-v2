"use server";

import { db } from "@/database/db";
import { UserOrganization, usersOrganizations } from "@/database/schemas";
import { UserRoles } from "@/types";
import { and, eq, ne } from "drizzle-orm";

async function deleteUser(
  userId: string,
  organizationId: string,
): Promise<UserOrganization[]> {
  return await db
    .delete(usersOrganizations)
    .where(
      and(
        eq(usersOrganizations.userId, userId),
        eq(usersOrganizations.organizationId, organizationId),
        ne(usersOrganizations.role, UserRoles.Owner),
      ),
    )
    .returning();
}

export default deleteUser;
