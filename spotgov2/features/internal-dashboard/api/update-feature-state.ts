import { Feature } from "@/database/schemas";

import { features } from "@/database/schemas";

import { db } from "@/database/db";
import { eq } from "drizzle-orm";

async function updateFeatureState(
  organizationId: string,
  states: {
    featureDeepdive: boolean;
    featureMarketintel: boolean;
    featureNews: boolean;
    featureEvents: boolean;
  },
): Promise<Feature[]> {
    return await db.update(features).set({
        featureDeepdive: states.featureDeepdive,
        featureMarketintel: states.featureMarketintel
    }).where(eq(features.organizationId, organizationId)).returning();
}

export default updateFeatureState;