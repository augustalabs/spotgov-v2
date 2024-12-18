import { Lot } from "@/database/schemas";
import { NextResponse } from "next/server";
import { Response } from "@/types";
import { getContractLots } from "@/features/contracts/api";
import { STATUS_NOT_FOUND, STATUS_OK } from "@/utils/api/status-messages";

type Params = {
  contractId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Lot[]>>> {
  const { contractId } = params;

  const lots = await getContractLots({ contractId });

    
  return NextResponse.json({ ...STATUS_OK, payload: lots || [] }, {status: STATUS_OK.status});
}
