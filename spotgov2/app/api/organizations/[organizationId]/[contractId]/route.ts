import { ContractsOrganization } from "@/database/schemas";
import { updateContractSaved } from "@/features/favorite-queries/api";
import { getUserFromOrganization } from "@/features/organizations/api";
import { canSaveContract } from "@/features/organizations/permissions";
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

    const { saved } = await req.json();

    if (saved === undefined) {
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

    const contractsOrganization = await updateContractSaved(
      params.organizationId,
      params.contractId,
      saved,
    );

    if (!contractsOrganization?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: contractsOrganization[0] },
      { status: STATUS_OK.status },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
