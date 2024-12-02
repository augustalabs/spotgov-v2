import { db } from "@/database/db";
import {
  Organization,
  UserOrganization,
  usersOrganizations,
} from "@/database/schemas";
import { eq } from "drizzle-orm";

type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

// TODO: Handle errors
export async function fetchUserOrganizations(
  userId: string
): Promise<OrganizationWithUserInfo[]> {
  const response = await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.userId, userId),
    with: {
      organization: true,
    },
  });

  return response;
}
