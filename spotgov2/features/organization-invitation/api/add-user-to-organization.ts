import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { OrganizationWithUserInfo, UserRoles } from "@/types";
import { and, eq } from "drizzle-orm";

async function addUserToOrganization(
  organizationId: string,
  userId: string,
): Promise<OrganizationWithUserInfo[]> {
  await db.insert(usersOrganizations).values({
    organizationId,
    userId,
    role: UserRoles.Viewer,
    lastOnline: new Date(),
  });

  return await db.query.usersOrganizations.findMany({
    where: and(
      eq(usersOrganizations.userId, userId),
      eq(usersOrganizations.organizationId, organizationId),
    ),
    with: {
      organization: true,
    },
  });
}

export default addUserToOrganization;
