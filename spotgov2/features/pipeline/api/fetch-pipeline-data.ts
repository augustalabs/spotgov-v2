"use server";

import { db } from "@/database/db";
import { pipelinePhaseContract, pipelinePhases } from "@/database/schemas";
import contracts from "@/database/schemas/contracts";
import { eq } from "drizzle-orm";

export async function fetchPipelineData({ organizationId }: { organizationId: string }) {
    const result = await db
        .select({
            ppc: pipelinePhaseContract,
            pp: pipelinePhases,
            c: contracts,
        })
        .from(pipelinePhaseContract)
        .innerJoin(
            pipelinePhases,
            eq(pipelinePhaseContract.phaseId, pipelinePhases.id)
        )
        .innerJoin(
            contracts,
            eq(pipelinePhaseContract.contractId, contracts.id)
        )
        .where(eq(pipelinePhaseContract.organizationId, organizationId))
        .execute();

    return result;
}
