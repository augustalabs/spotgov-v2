import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { UserRoles } from "@/types";
import { eq } from "drizzle-orm";

async function isUserAdminOrOwner(
  userId: string,
  organizationId: string,
): Promise<boolean> {
  const userOrganization = await db.query.usersOrganizations.findFirst({
    where:
      eq(usersOrganizations.userId, userId) &&
      eq(usersOrganizations.organizationId, organizationId),
  });

  return (
    userOrganization?.role === UserRoles.Admin ||
    userOrganization?.role === UserRoles.Owner
  );
}

export default isUserAdminOrOwner;
