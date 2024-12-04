import { NextResponse } from "next/server";

import { getUserOrganizations } from "@/features/organizations/api";
import { createClient } from "@/lib/supabase/server";
import { OrganizationWithUserInfo, Response } from "@/types";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "@/utils/api/status-messages";

export async function GET(): Promise<
  NextResponse<Response<OrganizationWithUserInfo[]>>
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    const organizations = await getUserOrganizations(data.user.id);

    if (!organizations) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({ ...STATUS_OK, payload: organizations });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
