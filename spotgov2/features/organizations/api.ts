"use server";

import { db } from "@/database/db";
import {
  Organization,
  organizations,
  UserOrganization,
  usersOrganizations,
} from "@/database/schemas";
import {
  OrganizationWithUserInfo,
  UserRoles,
  UserWithOrganizationInfo,
} from "@/types";
import { and, eq } from "drizzle-orm";

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
  const userOrganization = await db.query.usersOrganizations.findFirst({
    where:
      eq(usersOrganizations.userId, userId) &&
      eq(usersOrganizations.organizationId, organizationId),
  });

  return userOrganization?.role === UserRoles.Admin;
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

export async function updateUserRole(
  userId: string,
  organizationId: string,
  role: UserRoles
): Promise<UserOrganization[]> {
  return await db
    .update(usersOrganizations)
    .set({ role })
    .where(
      and(
        eq(usersOrganizations.userId, userId),
        eq(usersOrganizations.organizationId, organizationId)
      )
    )
    .returning();
}

export async function deleteUser(
  userId: string,
  organizationId: string
): Promise<UserOrganization[]> {
  return await db
    .delete(usersOrganizations)
    .where(
      and(
        eq(usersOrganizations.userId, userId),
        eq(usersOrganizations.organizationId, organizationId)
      )
    )
    .returning();
}
