import { Feature, Organization } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function organizationFeaturesQuery(organizationId: string) {
  const queryKey = ["get-organization-features"];

  const queryFn = async () =>
    await get<Response<Feature | null>>({
      url: `organizations/${organizationId}/features`,
    });

  return { queryKey, queryFn };
}

export default organizationFeaturesQuery;
