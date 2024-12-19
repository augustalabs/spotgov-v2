import { db } from "@/database/db";
import { feedCustomFields } from "@/database/schemas";
import { and, eq } from "drizzle-orm";

async function getColumnLabelsForTypeLabel(
  organizationId: string,
): Promise<(string | null)[]> {
  const res = await db.query.feedCustomFields.findMany({
    where: and(
      eq(feedCustomFields.organizationId, organizationId),
      eq(feedCustomFields.fieldType, "label"),
    ),
    with: {
      feedCustomFieldsValues: true,
    },
  });

  return Array.from(
    new Set(res.flatMap((r) => r.feedCustomFieldsValues.map((v) => v.value))),
  );
}

export default getColumnLabelsForTypeLabel;
