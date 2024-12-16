import { FeedCustomFieldValue } from "@/database/schemas";
import { deleteColumnValue } from "@/features/favorite-queries/api";
import { Response } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
  columnId: string;
  contractId: string;
};

export async function DELETE(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<FeedCustomFieldValue[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId || !params.columnId || !params.contractId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const feedCustomFields = await deleteColumnValue(
      params.organizationId,
      params.columnId,
      params.contractId,
    );

    if (!feedCustomFields?.length) {
      return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
        status: STATUS_INTERNAL_SERVER_ERROR.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: feedCustomFields },
      {
        status: STATUS_OK.status,
      },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
