import { OrganizationWithUserInfo, Response } from "@/types";
import { get } from "@/utils/api/functions";

function organizationsQuery() {
  const queryKey = ["get-organizations"];

  const queryFn = async () =>
    await get<Response<OrganizationWithUserInfo[]>>({ url: "organizations" });

  return { queryKey, queryFn };
}

export default organizationsQuery;
