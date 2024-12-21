import { Organization, features, Feature } from "@/database/schemas";

import { db } from "@/database/db";

import { eq } from "drizzle-orm";

async function getOrganizationFeatures(
  organizationId: string,
): Promise<Feature | null> {
  const result = await db
    .select()
    .from(features)
    .where(eq(features.organizationId, organizationId))
    .limit(1);

  return result[0] || null;
}

export default getOrganizationFeatures;
