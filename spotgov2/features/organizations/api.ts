"use server";

import { db } from "@/database/db";
import {
  Organization,
  organizations,
  usersOrganizations,
} from "@/database/schemas";
import {
  OrganizationWithUserInfo,
  UserRoles,
  UserWithOrganizationInfo,
} from "@/types";
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

export async function isUserInOrganization(
  userId: string,
  organizationId: string
): Promise<boolean> {
  return !!(await db.query.usersOrganizations.findFirst({
    where:
      eq(usersOrganizations.userId, userId) &&
      eq(usersOrganizations.organizationId, organizationId),
  }));
}

export async function isUserAdmin(
  userId: string,
  organizationId: string
): Promise<boolean> {
  return (
    (
      await db.query.usersOrganizations.findFirst({
        where:
          eq(usersOrganizations.userId, userId) &&
          eq(usersOrganizations.organizationId, organizationId),
      })
    )?.role === UserRoles.Admin
  );
}

export async function updateOrganization(
  organizationId: string,
  name: string,
  nif: string
): Promise<Organization[]> {
  return await db
    .update(organizations)
    .set({ name, nif, updatedAt: new Date() })
    .where(eq(organizations.id, organizationId));
}

export async function getOrganizationUsers(
  organizationId: string
): Promise<UserWithOrganizationInfo[]> {
  return await db.query.usersOrganizations.findMany({
    where: eq(usersOrganizations.organizationId, organizationId),
    with: {
      user: true,
    },
  });
}
