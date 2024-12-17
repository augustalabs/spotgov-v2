import { db } from "@/database/db";
import {
  FeedCustomField,
  feedCustomFields,
  feedCustomFieldsValues,
} from "@/database/schemas";
import { FeedCustomFieldWithValues } from "@/types";
import { asc, eq } from "drizzle-orm";

async function getCustomColumns({
  organizationId,
}: {
  organizationId: string;
}): Promise<FeedCustomFieldWithValues> {
  const result = await db
    .select({
      feedCustomFields,
      feedCustomFieldsValues,
    })
    .from(feedCustomFields)
    .leftJoin(
      feedCustomFieldsValues,
      eq(feedCustomFields.id, feedCustomFieldsValues.fieldId),
    )
    .where(eq(feedCustomFields.organizationId, organizationId))
    .orderBy(asc(feedCustomFields.createdAt));

  let customValuesPerField: FeedCustomFieldWithValues = {};

  result.forEach((field) => {
    if (!customValuesPerField[field.feedCustomFields.id]) {
      customValuesPerField[field.feedCustomFields.id] = {
        feedCustomFields: field.feedCustomFields as FeedCustomField,
        feedCustomFieldsValues: [],
      };
    }

    if (field.feedCustomFieldsValues?.fieldId === field.feedCustomFields.id) {
      customValuesPerField[
        field.feedCustomFields.id
      ].feedCustomFieldsValues.push(field.feedCustomFieldsValues);
    }
  });

  return customValuesPerField;
}

export default getCustomColumns;
