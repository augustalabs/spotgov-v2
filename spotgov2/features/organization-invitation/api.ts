import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { UserRoles } from "@/types";

export async function addUserToOrganization(
  organizationId: string,
  userId: string
) {
  await db.insert(usersOrganizations).values({
    organizationId,
    userId,
    role: UserRoles.Member,
    lastOnline: new Date(),
  });
}
