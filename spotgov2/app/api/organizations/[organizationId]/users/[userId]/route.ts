import { NextResponse } from "next/server";

import {
  deleteUser,
  isUserAdminOrOwner,
  updateUserRole,
} from "@/features/organizations/api";
import { Response, UserRoles } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { UserOrganization } from "@/database/schemas";
import { checkUserAuthentication } from "@/utils/api/helpers";

type Params = {
  organizationId: string;
  userId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<UserOrganization[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { role } = await req.json();

    if (!params.organizationId || !params.userId || !role) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserAdminOrOwner(userOrResponse.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    if (role === UserRoles.Owner) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const userOrganization = await updateUserRole(
      params.userId,
      params.organizationId,
      role
    );

    if (!userOrganization?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: userOrganization },
      { status: STATUS_OK.status }
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<void>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId || !params.userId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserAdminOrOwner(userOrResponse.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const deletedUser = await deleteUser(params.userId, params.organizationId);

    if (!deletedUser?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(STATUS_OK, { status: STATUS_OK.status });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
