"use server";

import { db } from "@/database/db";
import { organizationsTable } from "@/database/schema";
import * as z from "zod";
import { createOrganizationSchema } from "./schemas";

export const createOrganization = async (
  organization: z.infer<typeof createOrganizationSchema>
) => {
  return await db.insert(organizationsTable).values(organization).returning();
};
