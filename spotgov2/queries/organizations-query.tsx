import { OrganizationWithUserInfo, Response } from "@/types";
import { get } from "@/utils/api/api";

function organizationsQuery() {
  const queryKey = ["get-organizations"];

  const queryFn = async () =>
    await get<Response<OrganizationWithUserInfo[]>>("organizations");

  return { queryKey, queryFn };
}

export default organizationsQuery;
