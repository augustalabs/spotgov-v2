import { Organization } from "@/database/schemas";
import { isUserAdmin, updateOrganization } from "@/features/organizations/api";
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
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: Params }
): Promise<NextResponse<Response<Organization[]>>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);

    if (!data?.user) return NextResponse.json(STATUS_UNAUTHORIZED);

    const { name, nif } = await req.json();

    if (!name) return NextResponse.json(STATUS_BAD_REQUEST);

    if (!isUserAdmin(data.user.id, params.organizationId)) {
      return NextResponse.json(STATUS_FORBIDDEN);
    }

    const organizations = await updateOrganization(
      params.organizationId,
      name,
      nif
    );

    if (!organizations) return NextResponse.json(STATUS_NOT_FOUND);

    return NextResponse.json({ ...STATUS_OK, payload: organizations });
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR);
  }
}
