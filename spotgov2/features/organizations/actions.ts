"use server";

import { db } from "@/database/db";
import * as z from "zod";
import { createOrganizationSchema } from "./schemas";
import { organizations } from "@/database/schema";

export const createOrganization = async (
  organization: z.infer<typeof createOrganizationSchema>
) => {
  return await db.insert(organizations).values(organization).returning();
};
