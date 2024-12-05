import { NextResponse } from "next/server";

import { isUserInOrganization } from "@/features/organizations/api";
import { deleteQuery, updateQueryTitle } from "@/features/queries/api";
import { createClient } from "@/lib/supabase/server";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NO_CONTENT,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";
import { Query } from "@/database/schemas";

type Params = {
  queryId: string;
  organizationId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<Query[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    const { title } = await req.json();

    if (!params.organizationId || !params.queryId || !title) {
      return NextResponse.json(STATUS_BAD_REQUEST);
    }

    if (!isUserInOrganization(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    const query = await updateQueryTitle(params.queryId, title);

    if (!query) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({ ...STATUS_OK, payload: query });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<void>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    if (!params.organizationId || !params.queryId) {
      return NextResponse.json(STATUS_BAD_REQUEST);
    }

    if (!isUserInOrganization(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    await deleteQuery(params.queryId);

    return NextResponse.json(STATUS_NO_CONTENT);
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
