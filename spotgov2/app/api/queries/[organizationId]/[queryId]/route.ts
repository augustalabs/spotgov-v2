import { isUserInOrganization } from "@/features/organizations/api";
import { deleteQuery, updateQueryTitle } from "@/features/queries/api";
import { createClient } from "@/lib/supabase/server";
import { Response } from "@/types";
import { NextResponse } from "next/server";

type Params = {
  queryId: string;
  organizationId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<void>>> {
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

    const { title } = await req.json();

    if (!params.organizationId || !params.queryId || !title) {
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

    await updateQueryTitle(params.queryId, title);

    return NextResponse.json({
      success: true,
      status: 200,
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

export async function DELETE(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<void>>> {
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

    if (!params.organizationId || !params.queryId) {
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

    await deleteQuery(params.queryId);

    return NextResponse.json({
      success: true,
      status: 200,
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
