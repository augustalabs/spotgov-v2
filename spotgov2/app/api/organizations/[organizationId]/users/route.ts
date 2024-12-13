import { NextResponse } from "next/server";

import { getUsers, isUserAdminOrOwner } from "@/features/organizations/api";
import { createClient } from "@/lib/supabase/server";
import { Response, UserWithOrganizationInfo } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { addUserToOrganization } from "@/features/organization-invitation/api";
import { checkUserAuthentication } from "@/utils/api/helpers";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<UserWithOrganizationInfo[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!isUserAdminOrOwner(userOrResponse.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const users = await getUsers(params.organizationId);

    if (!users?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      {
        ...STATUS_OK,
        payload: users,
      },
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
): Promise<NextResponse<Response<UserWithOrganizationInfo[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    if (!params.organizationId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (email !== userOrResponse.email) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const organizationWithUserInfo = (
      await addUserToOrganization(params.organizationId, userOrResponse.id)
    )[0];

    if (!organizationWithUserInfo) {
      return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
        status: STATUS_INTERNAL_SERVER_ERROR.status,
      });
    }

    const supabase = await createClient();
    await supabase.auth.updateUser({
      data: {
        current_organization: organizationWithUserInfo,
      },
    });

    return NextResponse.json(STATUS_OK, {
      status: STATUS_OK.status,
    });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
