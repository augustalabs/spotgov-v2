import { db } from "@/database/db";
import {
  feedCustomFieldsValues,
  FeedCustomFieldValue,
} from "@/database/schemas";

async function addColumnValue(
  organizationId: string,
  fieldId: string,
  contractId: string,
  value: string,
): Promise<FeedCustomFieldValue[]> {
  return await db
    .insert(feedCustomFieldsValues)
    .values({
      organizationId,
      fieldId,
      contractId,
      value,
    })
    .returning();
}

export default addColumnValue;
