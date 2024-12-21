import { Organization } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function allOrganizationsQuery() {
  const queryKey = ["get-all-organizations"];

  const queryFn = async () =>
    await get<Response<Organization[]>>({
      url: `organizations/all-organizations`,
    });

  return { queryKey, queryFn };
}

export default allOrganizationsQuery;