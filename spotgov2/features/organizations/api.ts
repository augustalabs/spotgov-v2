"use server";

import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { OrganizationWithUserInfo } from "@/types";
import { eq } from "drizzle-orm";

// TODO: Handle errors
export async function getUserOrganizations(
  userId: string
): Promise<OrganizationWithUserInfo[]> {
  return await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.userId, userId),
    with: {
      organization: true,
    },
  });
}
