import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { UserWithOrganizationInfo } from "@/types";
import { eq } from "drizzle-orm";

async function getUsers(
  organizationId: string,
): Promise<UserWithOrganizationInfo[]> {
  return await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.organizationId, organizationId),
    with: {
      user: true,
    },
  });
}

export default getUsers;
