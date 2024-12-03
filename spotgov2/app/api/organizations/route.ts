import { getUserOrganizations } from "@/features/organizations/api";
import { createClient } from "@/lib/supabase/server";
import { OrganizationWithUserInfo, Response } from "@/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<Response<OrganizationWithUserInfo[]>>
> {
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

    const organizations = await getUserOrganizations(data.user.id);

    if (!organizations) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Resource not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      payload: organizations,
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
