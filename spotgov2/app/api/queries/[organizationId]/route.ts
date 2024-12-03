import { Query } from "@/database/schemas";
import { isUserInOrganization } from "@/features/organizations/api";
import { getOrganizationQueries } from "@/features/queries/api";
import { createClient } from "@/lib/supabase/server";
import { Response } from "@/types";
import { NextResponse } from "next/server";

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

    if (error) {
      return NextResponse.json({
        success: false,
        status: 500,
        error: error.message,
      });
    }

    if (!data?.user) {
      return NextResponse.json({
        success: false,
        status: 401,
        error: "Unauthorized",
      });
    }

    if (!params.organizationId) {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Bad request",
      });
    }

    if (!isUserInOrganization(data.user.id, params.organizationId)) {
      return NextResponse.json({
        success: false,
        status: 403,
        error: "Forbidden",
      });
    }

    const queries = await getOrganizationQueries(params.organizationId);

    if (!queries) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Resource not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      payload: queries,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
}
