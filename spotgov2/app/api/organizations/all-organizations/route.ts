import { NextResponse } from "next/server";

import { getAllOrganizations } from "@/features/internal-dashboard/api";
import {  Response } from "@/types";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { checkUserAuthentication } from "@/utils/api/helpers";
import { Organization } from "@/database/schemas/organizations";

export async function GET(): Promise<
  NextResponse<Response<Organization[]>>
> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const organizations = await getAllOrganizations();

    if (!organizations?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: organizations },
      {
        status: STATUS_OK.status,
      },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}