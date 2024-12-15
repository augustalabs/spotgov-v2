import { NextResponse } from "next/server";
import { Response } from "@/types";
import { getContractById } from "@/features/contracts/api";
import { STATUS_NOT_FOUND, STATUS_OK } from "@/utils/api/status-messages";
import { Contract } from "@/database/schemas";

type Params = {
  contractId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Contract>>> {
  const { contractId } = params;

  const contract = await getContractById({ contractId });

  if (!contract) {
    return NextResponse.json(STATUS_NOT_FOUND, {
      status: STATUS_NOT_FOUND.status,
    });
    }
    
  return NextResponse.json({ ...STATUS_OK, payload: contract }, {status: STATUS_OK.status});
}
