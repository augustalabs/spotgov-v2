import { NextResponse } from "next/server";

import { Query } from "@/database/schemas";
import { isUserInOrganization } from "@/features/organizations/api";
import { getOrganizationQueries } from "@/features/queries/api";
import { createClient } from "@/lib/supabase/server";
import { Response } from "@/types";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<Query[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    if (!params.organizationId) return NextResponse.json(STATUS_BAD_REQUEST);

    if (!isUserInOrganization(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    const queries = await getOrganizationQueries(params.organizationId);

    if (!queries) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({
      ...STATUS_OK,
      payload: queries,
    });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
