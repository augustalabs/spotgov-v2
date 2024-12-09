import { NextResponse } from "next/server";

import { getUserOrganizations } from "@/features/organizations/api";
import { OrganizationWithUserInfo, Response } from "@/types";
import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { checkUserAuthentication } from "@/utils/api/helpers";

export async function GET(): Promise<
  NextResponse<Response<OrganizationWithUserInfo[]>>
> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const organizations = await getUserOrganizations(userOrResponse.id);

    if (!organizations) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: organizations },
      {
        status: STATUS_OK.status,
      }
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
