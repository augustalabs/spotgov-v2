import { ContractsOrganization } from "@/database/schemas";
import updateContractNotes from "@/features/contracts/api/update-contract-notes";

import { getUserFromOrganization } from "@/features/organizations/api";
import { canSaveContract } from "@/permissions";
import { Response } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
  contractId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<ContractsOrganization>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { notes } = await req.json();

    if (notes === undefined) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const user = await getUserFromOrganization(
      userOrResponse.id,
      params.organizationId,
    );

    if (!user || !canSaveContract(user.role)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const contractsOrganization = await updateContractNotes({
      contractId: params.contractId,
      organizationId: params.organizationId,
      notes,
    });

    return NextResponse.json(
      {
        ...STATUS_OK,
        payload: {
          contractId: params.contractId,
          organizationId: params.organizationId,
          comments: notes,
          saved: null,
          labels: null,
        },
      },
      { status: STATUS_OK.status },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
