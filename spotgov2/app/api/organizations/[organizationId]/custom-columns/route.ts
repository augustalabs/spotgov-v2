import { FeedCustomField } from "@/database/schemas";
import { addColumn, getCustomColumns } from "@/features/radar/api";
import { canAddFavoriteQueriesColumn } from "@/permissions";
import { FeedCustomFieldWithValues, Response, UserRoles } from "@/types";
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
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<FeedCustomFieldWithValues>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const feedCustomFieldsWithValues = await getCustomColumns({
      organizationId: params.organizationId,
    });

    if (!feedCustomFieldsWithValues) {
      return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
        status: STATUS_INTERNAL_SERVER_ERROR.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: feedCustomFieldsWithValues },
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

export async function POST(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<FeedCustomField[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const { fieldName, fieldType } = await req.json();

    if (!fieldName || !fieldType) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!canAddFavoriteQueriesColumn(userOrResponse.role as UserRoles)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const feedCustomFields = await addColumn(
      params.organizationId,
      fieldName,
      fieldType,
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
