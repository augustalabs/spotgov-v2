import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function isUserInOrganization(
  userId: string,
  organizationId: string,
): Promise<boolean> {
  return !!(await db.query.usersOrganizations.findFirst({
    where:
      eq(usersOrganizations.userId, userId) &&
      eq(usersOrganizations.organizationId, organizationId),
  }));
}

export default isUserInOrganization;
