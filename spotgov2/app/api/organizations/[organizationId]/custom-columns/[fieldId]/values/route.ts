import { FeedCustomFieldValue } from "@/database/schemas";
import { updateColumnValue } from "@/features/radar/api";
import { canChangeFavoriteQueriesColumnValue } from "@/permissions";
import { Response, UserRoles } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
  fieldId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<FeedCustomFieldValue[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId || !params.fieldId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const { value, contractId } = await req.json();

    if (!value || !contractId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (
      !canChangeFavoriteQueriesColumnValue(userOrResponse.role as UserRoles)
    ) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const feedCustomFields = await updateColumnValue(
      params.organizationId,
      params.fieldId,
      contractId,
      value,
    );

    if (!feedCustomFields) {
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
