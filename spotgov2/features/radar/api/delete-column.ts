import { db } from "@/database/db";
import { FeedCustomField, feedCustomFields } from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function deleteColumn(
  organizationId: string,
  fieldId: string,
): Promise<FeedCustomField[]> {
  return db
    .delete(feedCustomFields)
    .where(
      and(
        eq(feedCustomFields.organizationId, organizationId),
        eq(feedCustomFields.id, fieldId),
      ),
    )
    .returning();
}

export default deleteColumn;
