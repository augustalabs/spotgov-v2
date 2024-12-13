"use server";

import { db } from "@/database/db";
import { keywords as keywordsTable } from "@/database/schemas";

async function addKeywords({
  organizationId,
  keywords,
}: {
  organizationId: string;
  keywords: string[];
}) {
  const data = keywords.map((k) => ({
    organizationId,
    keyword: k,
    createdAt: new Date(),
  }));

  return await db.insert(keywordsTable).values(data);
}

export default addKeywords;
