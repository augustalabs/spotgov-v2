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

type Params = {
  organizationId: string;
};

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
    const requiredFeatures = [
      'featureDeepdive',
      'featureMarketintel', 
      'featureNews',
      'featureEvents'
    ];

    const allFeaturesAreBoolean = requiredFeatures.every(
      feature => typeof requestBody[feature] === 'boolean'
    );

    if (!allFeaturesAreBoolean) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const {
      featureDeepdive,
      featureMarketintel,
      featureNews, 
      featureEvents
    } = requestBody;

   

    if (!user || !userIsSuperAdmin) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    // Update the feature states
    const features = await updateFeatureState(params.organizationId, {
      featureDeepdive,
      featureMarketintel,
      featureNews,
      featureEvents,
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
