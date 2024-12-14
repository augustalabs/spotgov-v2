"use server";

import { db } from "@/database/db";
import { cpvs } from "@/database/schemas";

async function getCpvs() {
  return await db.selectDistinct({ fullName: cpvs.fullName }).from(cpvs);
}

export default getCpvs;
