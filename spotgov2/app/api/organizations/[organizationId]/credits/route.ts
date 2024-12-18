import { NextResponse } from "next/server";
import { Organization } from "@/database/schemas";
import { updateOrganizationCredits } from "@/features/internal-dashboard/api";
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
): Promise<NextResponse<Response<Organization[]>>> {
  try {
      // Check user authentication

    const user = await checkUserAuthentication();
    if (user instanceof NextResponse) return user;
 
    const userIsSuperAdmin = isSuperAdmin(user);
   
    // Parse and validate the request body
    const { deepDiveCurrency, matchmakingCurrency } = await req.json();
   
      
    if (
      typeof deepDiveCurrency !== "number" ||
      typeof matchmakingCurrency !== "number"
    ) {

      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

   

    if (!user || !userIsSuperAdmin) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }
 
    // Update the organization's credits
    const organizations = await updateOrganizationCredits(params.organizationId, deepDiveCurrency, matchmakingCurrency);
 
    if (!organizations) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: organizations },
      { status: STATUS_OK.status },
    );
  } catch (error) {
    console.error("Error updating organization credits:", error);
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
