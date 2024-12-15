"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { tables } from "@/database/schemas";
import { Table } from "@/database/schemas/tables";

async function getContractTables({ contractId }: { contractId: string }) {
  // Fetch all records with the given contractId
  const records = await db
    .select()
    .from(tables)
    .where(eq(tables.contractId, contractId));

  // Group records by 'name' and then by 'row'
  const groupedData = records.reduce((acc: any, record: Table) => {
    const { name, row, columnName, value } = record;

    if (!acc[name]) {
      acc[name] = {};
    }

    if (!acc[name][row]) {
      acc[name][row] = {};
    }

    acc[name][row][columnName as string] = value;

    return acc;
  }, {});

  return groupedData;
}

export default getContractTables;
