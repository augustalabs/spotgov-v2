import { db } from "@/database/db";
import {
  feedCustomFieldsValues,
  FeedCustomFieldValue,
} from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function updateColumnValue(
  organizationId: string,
  fieldId: string,
  contractId: string,
  value: string,
): Promise<FeedCustomFieldValue[]> {
  return await db
    .update(feedCustomFieldsValues)
    .set({ value })
    .where(
      and(
        eq(feedCustomFieldsValues.organizationId, organizationId),
        eq(feedCustomFieldsValues.fieldId, fieldId),
        eq(feedCustomFieldsValues.contractId, contractId),
      ),
    )
    .returning();
}

export default updateColumnValue;
