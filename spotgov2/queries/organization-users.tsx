import { Response, UserWithOrganizationInfo } from "@/types";
import { get } from "@/utils/api/api";

function organizationUsersQuery(organizationId: string) {
  const queryKey = ["get-organization-users", organizationId];

  const queryFn = async () =>
    await get<Response<UserWithOrganizationInfo[]>>({
      url: `organizations/${organizationId}/users`,
    });

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default organizationUsersQuery;
