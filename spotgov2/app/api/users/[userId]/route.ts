import { NextResponse } from "next/server";

import { deleteUser } from "@/features/internal-dashboard/api";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { checkUserAuthentication } from "@/utils/api/helpers";
import { isSuperAdmin } from "@/features/internal-dashboard/utils/api";
import { createAdminClient } from "@/lib/supabase/admin";

type Params = {
  userId: string;
};

export async function DELETE(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<void>>> {
  try {
    const supabase = createAdminClient();
    const user = await checkUserAuthentication();
    if (user instanceof NextResponse) return user;

    const userIsSuperAdmin = isSuperAdmin(user);

    if (!params.userId) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    if (!user || !userIsSuperAdmin) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }
    await supabase.auth.admin.deleteUser(params.userId);
    const deletedUser = await deleteUser(params.userId);

    if (!deletedUser) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(STATUS_OK, { status: STATUS_OK.status });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
