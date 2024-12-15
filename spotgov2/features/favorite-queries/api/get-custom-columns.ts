import { db } from "@/database/db";
import { feedCustomFields, feedCustomFieldsValues } from "@/database/schemas";
import { FeedCustomFieldWithValues } from "@/types";
import { eq } from "drizzle-orm";

async function getCustomColumns({
  organizationId,
}: {
  organizationId: string;
}): Promise<FeedCustomFieldWithValues[]> {
  return await db
    .select({
      feedCustomFields,
      feedCustomFieldsValues,
    })
    .from(feedCustomFields)
    .leftJoin(
      feedCustomFieldsValues,
      eq(feedCustomFields.id, feedCustomFieldsValues.fieldId),
    )
    .where(eq(feedCustomFields.organizationId, organizationId));
}

export default getCustomColumns;
