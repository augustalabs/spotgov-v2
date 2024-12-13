import { NextResponse } from "next/server";

import { isUserInOrganization } from "@/features/organizations/api";
import { deleteQuery, updateQueryTitle } from "@/features/queries/api";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { Query } from "@/database/schemas";
import { checkUserAuthentication } from "@/utils/api/helpers";

type Params = {
  queryId: string;
  organizationId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Query[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { title } = await req.json();

    if (!params.organizationId || !params.queryId || !title) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserInOrganization(userOrResponse.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const query = await updateQueryTitle(params.queryId, title);

    if (!query?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: query },
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
): Promise<NextResponse<Response<void>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId || !params.queryId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserInOrganization(userOrResponse.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const queries = await deleteQuery(params.queryId);

    if (!queries?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(STATUS_OK, {
      status: STATUS_OK.status,
    });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
