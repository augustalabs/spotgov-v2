import { NextResponse } from "next/server";

import { Query } from "@/database/schemas";
import { isUserInOrganization } from "@/features/organizations/api";
import { getOrganizationQueries } from "@/features/queries/api";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { checkUserAuthentication } from "@/utils/api/helpers";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<Query[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserInOrganization(userOrResponse?.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const queries = await getOrganizationQueries(params.organizationId);

    if (!queries?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      {
        ...STATUS_OK,
        payload: queries,
      },
      {
        status: STATUS_OK.status,
      }
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
