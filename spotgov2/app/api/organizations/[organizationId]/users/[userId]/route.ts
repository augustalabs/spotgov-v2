import { NextResponse } from "next/server";

import {
  //   deleteUser,
  isUserAdmin,
  isUserInOrganization,
  updateUserRole,
} from "@/features/organizations/api";
import { createClient } from "@/lib/supabase/server";
import { Response, UserRoles } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NO_CONTENT,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";
import { UserOrganization } from "@/database/schemas";

type Params = {
  organizationId: string;
  userId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<UserOrganization[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    const { role } = await req.json();

    if (!params.organizationId || !params.userId || !role) {
      return NextResponse.json(STATUS_BAD_REQUEST);
    }

    if (!isUserAdmin(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    const userOrganization = await updateUserRole(
      params.userId,
      params.organizationId,
      role
    );

    if (!userOrganization) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({ ...STATUS_OK, payload: userOrganization });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: Params }
// ): Promise<NextResponse<Response<void>>> {
//   try {
//     const supabase = await createClient();
//     const { data, error } = await supabase.auth.getUser();

//     if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

//     if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

//     if (!params.organizationId || !params.userId) {
//       return NextResponse.json(STATUS_BAD_REQUEST);
//     }

//     if (!isUserAdmin(data.user.id, params.organizationId)) {
//       return NextResponse.json(STATUS_FORBIDDEN);
//     }

//     await deleteUser(params.userId, params.organizationId);

//     return NextResponse.json(STATUS_NO_CONTENT);
//   } catch {
//     return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
//   }
// }
