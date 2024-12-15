import { Table } from "@/database/schemas";
import { NextResponse } from "next/server";
import { Response } from "@/types";
import { getContractTables } from "@/features/contracts/api";
import { STATUS_NOT_FOUND, STATUS_OK } from "@/utils/api/status-messages";

type Params = {
  contractId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Table[]>>> {
  const { contractId } = params;

  const tables = await getContractTables({ contractId });

  if (!tables) {
    return NextResponse.json(STATUS_NOT_FOUND, {
      status: STATUS_NOT_FOUND.status,
    });
    }
    
  return NextResponse.json({ ...STATUS_OK, payload: tables }, {status: STATUS_OK.status});
}
