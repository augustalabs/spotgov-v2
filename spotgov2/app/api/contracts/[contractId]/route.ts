import { NextResponse } from "next/server";
import { JoinedContractInOrganization, Response } from "@/types";
import { getContractById, getContractInOrganization } from "@/features/contracts/api";
import { STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_OK } from "@/utils/api/status-messages";
import { Contract } from "@/database/schemas";
import { checkUserAuthentication } from "@/utils/api/helpers";

type Params = {
  contractId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<JoinedContractInOrganization | Contract | null>>> {
  try {
    const { contractId } = params;

    // First, check user authentication
    const user = await checkUserAuthentication();

    if (user) {
      // If authenticated, fetch contract along with organization-specific data
      // TODO: get organizationId from user
      const contractWithOrg = await getContractInOrganization({
        contractId,
        organizationId: user.organizationId,
      });

      if (!contractWithOrg) {
        // Contract not found
        return NextResponse.json(STATUS_NOT_FOUND, {
          status: STATUS_NOT_FOUND.status,
        });
      }

      // Return the extended contract
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
