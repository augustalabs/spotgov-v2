import { db } from "@/database/db";
import { FeedCustomField, feedCustomFields } from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function editColumn(
  organizationId: string,
  fieldId: string,
  fieldName: string,
): Promise<FeedCustomField[]> {
  return db
    .update(feedCustomFields)
    .set({ fieldName })
    .where(
      and(
        eq(feedCustomFields.organizationId, organizationId),
        eq(feedCustomFields.id, fieldId),
      ),
    )
    .returning();
}

export default editColumn;
