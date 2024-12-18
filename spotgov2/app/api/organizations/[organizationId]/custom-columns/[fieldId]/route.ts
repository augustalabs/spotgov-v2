import { FeedCustomField } from "@/database/schemas";
import { deleteColumn, editColumn } from "@/features/favorite-queries/api";
import {
  canEditFavoriteQueriesColumn,
  canRemoveFavoriteQueriesColumn,
} from "@/permissions";
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
): Promise<NextResponse<Response<FeedCustomField[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const { fieldName } = await req.json();

    if (!fieldName) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!canEditFavoriteQueriesColumn(userOrResponse.role as UserRoles)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const feedCustomFields = await editColumn(
      params.organizationId,
      params.fieldId,
      fieldName,
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

export async function DELETE(
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

    if (!canRemoveFavoriteQueriesColumn(userOrResponse.role as UserRoles)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const feedCustomFields = await deleteColumn(
      params.organizationId,
      params.fieldId,
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
