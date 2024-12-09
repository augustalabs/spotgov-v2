import { NextResponse } from "next/server";

import {
  getOrganizationUsers,
  isUserAdmin,
} from "@/features/organizations/api";
import { createClient } from "@/lib/supabase/server";
import { Response, UserWithOrganizationInfo } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NO_CONTENT,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";
import { addUserToOrganization } from "@/features/organization-invitation/api";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<UserWithOrganizationInfo[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    if (!params.organizationId) return NextResponse.json(STATUS_BAD_REQUEST);

    if (!isUserAdmin(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    const users = await getOrganizationUsers(params.organizationId);

    if (!users) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({
      ...STATUS_OK,
      payload: users,
    });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<UserWithOrganizationInfo[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    if (!params.organizationId) return NextResponse.json(STATUS_BAD_REQUEST);

    const { email } = await req.json();

    if (!email) return NextResponse.json(STATUS_BAD_REQUEST);

    if (email !== data.user.email) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    await addUserToOrganization(params.organizationId, data.user.id);

    return NextResponse.json(STATUS_NO_CONTENT);
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
