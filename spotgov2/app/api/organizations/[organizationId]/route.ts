import { Organization, organizations } from "@/database/schemas";
import { isSuperAdmin } from "@/features/internal-dashboard/utils/api";
import {
  getUserFromOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationById,
} from "@/features/organizations/api";

import { canEditOrganization } from "@/permissions";
import { Response } from "@/types";
import { checkUserAuthentication } from "@/utils/api/helpers";
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
  STATUS_OK,
} from "@/utils/api/status-messages";
import { NextResponse } from "next/server";

type Params = {
  organizationId: string;
};

export async function GET(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Organization | null>>> {
  const user = await checkUserAuthentication();
  if (user instanceof NextResponse) return user;

  if (!user) {
    return NextResponse.json(STATUS_FORBIDDEN, {
      status: STATUS_FORBIDDEN.status,
    });
  }

  const organization = await getOrganizationById(params.organizationId);

  if (!organization) {
    return NextResponse.json(STATUS_NOT_FOUND, {
      status: STATUS_NOT_FOUND.status,
    });
  }

  return NextResponse.json(
    { ...STATUS_OK, payload: organization },
    { status: STATUS_OK.status },
  );
}

export async function PATCH(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Organization[]>>> {
  try {
    const userOrResponse = await checkUserAuthentication();
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { name, nif } = await req.json();

    if (!name || !nif) {
      return NextResponse.json(STATUS_BAD_REQUEST, {
        status: STATUS_BAD_REQUEST.status,
      });
    }

    const user = await getUserFromOrganization(
      userOrResponse.id,
      params.organizationId,
    );

    if (!user || !canEditOrganization(user.role)) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    const organizations = await updateOrganization(
      params.organizationId,
      name,
      nif,
    );

    if (!organizations) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: organizations },
      { status: STATUS_OK.status },
    );
  } catch {
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params },
): Promise<NextResponse<Response<Organization[]>>> {
  try {
    // Check user authentication
    console.log("DELETE request received");
    const user = await checkUserAuthentication();
    if (user instanceof NextResponse) return user;
    console.log("User authenticated");
    // Check if user has permission to delete the organization
    console.log("Checking if user has permission to delete the organization");
    const userIsSuperAdmin = isSuperAdmin(user);
    if (!user || !userIsSuperAdmin) {
      return NextResponse.json(STATUS_FORBIDDEN, {
        status: STATUS_FORBIDDEN.status,
      });
    }

    // Delete the organization
    console.log("Deleting the organization");
    const organization = await deleteOrganization(params.organizationId);
    console.log("Organization deleted");
    if (!organization) {
      return NextResponse.json(STATUS_NOT_FOUND, {
        status: STATUS_NOT_FOUND.status,
      });
    }

    return NextResponse.json(
      { ...STATUS_OK, payload: organization },
      { status: STATUS_OK.status },
    );
  } catch (error) {
    console.error("Error deleting organization", error);
    return NextResponse.json(STATUS_INTERNAL_SERVER_ERROR, {
      status: STATUS_INTERNAL_SERVER_ERROR.status,
    });
  }
}
