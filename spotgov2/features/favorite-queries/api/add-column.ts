import { db } from "@/database/db";
import { FeedCustomField, feedCustomFields } from "@/database/schemas";

async function addColumn(
  organizationId: string,
  fieldName: string,
  fieldType: string,
): Promise<FeedCustomField[]> {
  return await db
    .insert(feedCustomFields)
    .values({
      organizationId,
      fieldName,
      fieldType,
    })
    .returning();
}

export default addColumn;
