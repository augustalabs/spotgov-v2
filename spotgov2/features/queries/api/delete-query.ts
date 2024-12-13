import { db } from "@/database/db";
import { queries } from "@/database/schemas";
import { eq } from "drizzle-orm";

async function deleteQuery(queryId: string): Promise<void> {
  await db.delete(queries).where(eq(queries.id, queryId));
}

export default deleteQuery;
