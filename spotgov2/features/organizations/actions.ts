"use server";

import { db } from "@/database/db";
import { usersOrganizations } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { OrganizationWithUserInfo } from "./types";

// TODO: Handle errors
export async function fetchUserOrganizations(
  userId: string
): Promise<OrganizationWithUserInfo[]> {
  return await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.userId, userId),
    with: {
      organization: true,
    },
  });
}
