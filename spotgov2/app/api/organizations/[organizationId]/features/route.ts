import { NextResponse } from "next/server";
import { Feature } from "@/database/schemas";
import { updateFeatureState } from "@/features/internal-dashboard/api";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { Response } from "@/types";
import { isSuperAdmin } from "@/features/internal-dashboard/utils/api";
import getOrganizationFeatures from "@/features/internal-dashboard/api/get-organization-features";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Feature | null>>> {
  const user = await checkUserAuthentication();
  if (user instanceof NextResponse) return user;
  const userIsSuperAdmin = isSuperAdmin(user);

  if (!user || !userIsSuperAdmin) {
    return NextResponse.json(STATUS_FORBIDDEN, {
      status: STATUS_FORBIDDEN.status,
    });
  }

  const features = await getOrganizationFeatures(params.organizationId);

  if (!features) {
    return NextResponse.json(STATUS_NOT_FOUND, {
      status: STATUS_NOT_FOUND.status,
    });
  }

  return NextResponse.json(
    { ...STATUS_OK, payload: features },
    { status: STATUS_OK.status },
  );
}

export async function PATCH(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Feature[]>>> {
  try {
    // Check user authentication
    const user = await checkUserAuthentication();
    if (user instanceof NextResponse) return user;
    const userIsSuperAdmin = isSuperAdmin(user);
    // Parse and validate the request body
    const requestBody = await req.json();

    const { featureKey, enabled } = requestBody;

    if (!user || !userIsSuperAdmin) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    // Update the feature states
    const features = await updateFeatureState(params.organizationId, {
      featureKey,
      enabled,
    });

    if (!features?.length) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: features },
      { status: STATUS_OK.status },
    );
  } catch (error) {
    console.error("Error updating feature states:", error);
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
