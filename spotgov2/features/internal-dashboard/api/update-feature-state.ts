import { Feature } from "@/database/schemas";

import { features } from "@/database/schemas";

import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { FeatureKey } from "../utils/feature-config";

async function updateFeatureState(
  organizationId: string,
  states: {
    featureKey: FeatureKey;
    enabled: boolean;
  },
): Promise<Feature[]> {
  return await db
    .update(features)
    .set({
      [states.featureKey]: states.enabled,
    })
    .where(eq(features.organizationId, organizationId))
    .returning();
}

export default updateFeatureState;
