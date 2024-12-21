import { Organization } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function organizationByIdQuery(organizationId: string) {
  const queryKey = ["get-organization-by-id", organizationId];

  const queryFn = async () =>
    await get<Response<Organization>>({
      url: `organizations/${organizationId}`,
    });

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default organizationByIdQuery;