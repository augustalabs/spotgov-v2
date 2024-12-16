import { db } from "@/database/db";
import {
  feedCustomFieldsValues,
  FeedCustomFieldValue,
} from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function deleteColumnValue(
  organizationId: string,
  fieldId: string,
  contractId: string,
): Promise<FeedCustomFieldValue[]> {
  return await db
    .delete(feedCustomFieldsValues)
    .where(
      and(
        eq(feedCustomFieldsValues.organizationId, organizationId),
        eq(feedCustomFieldsValues.fieldId, fieldId),
        eq(feedCustomFieldsValues.contractId, contractId),
      ),
    )
    .returning();
}

export default deleteColumnValue;
