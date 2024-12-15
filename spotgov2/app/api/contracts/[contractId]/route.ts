import { NextResponse } from "next/server";
import { JoinedContractInOrganization, Response } from "@/types";
import { getContractById, getContractInOrganization, createContractInOrganization } from "@/features/contracts/api";
import { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_OK } from "@/utils/api/status-messages";
import { Contract } from "@/database/schemas";
import { checkUserAuthentication } from "@/utils/api/helpers";
import { createClient } from "@/lib/supabase/server";

type Params = {
  contractId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<JoinedContractInOrganization | Contract | null>>> {
  try {
    const { contractId } = params;
    const supabase = await createClient();

    // First, check user authentication
    const { data: user, error } = await supabase.auth.getUser();
    const currentOrganization = user?.user?.user_metadata.current_organization; 

    if (error) {
      return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
        status: STATUS_INTERNAL_SERVER_ERROR.status,
      });
    }

    if (user) {
      // If authenticated, fetch contract along with organization-specific data
      // TODO: get organizationId from user
      const contractWithOrg = await getContractInOrganization({
        contractId,
        organizationId: currentOrganization,
      });

      if (!contractWithOrg) {
        // Contract not found
        return NextResponse.json(STATUS_NOT_FOUND, {
          status: STATUS_NOT_FOUND.status,
        });
      }

      // If contracts_organizations record doesn't exist, create it asynchronously
      if (!contractWithOrg.contracts_organizations) {
        // Fire and forget: create the record without awaiting
        createContractInOrganization({
          contractId,
          organizationId: currentOrganization,
        }).catch((error) => {
          // Handle any errors to prevent unhandled promise rejections
          console.error("Error creating contracts_organizations record:", error);
        });

        // Include a default contracts_organizations object in the response
        contractWithOrg.contracts_organizations = {
          contractId,
          organizationId: currentOrganization,
          saved: false,       // default value
          comments: null,     // default value
          labels: [],         // default value
        };
      }

      // Return the extended contract to the user
      return NextResponse.json(
        {
          ...STATUS_OK,
          payload: contractWithOrg,
        },
        { status: STATUS_OK.status }
      );
    } else {
      // If not authenticated, fetch only the basic contract details
      const contract = await getContractById({ contractId });

      if (!contract) {
        // Contract not found
        return NextResponse.json(STATUS_NOT_FOUND, {
          status: STATUS_NOT_FOUND.status,
        });
      }

      // Return the basic contract
      return NextResponse.json(
        {
          ...STATUS_OK,
          payload: contract,
        },
        { status: STATUS_OK.status }
      );
    }
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return NextResponse.json(
      {
        ...STATUS_INTERNAL_SERVER_ERROR,
        payload: null,
      },
      { status: STATUS_INTERNAL_SERVER_ERROR.status }
    );
  }
}
