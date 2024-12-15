import { FeedCustomFieldWithValues, Response } from "@/types";
import { get } from "@/utils/api/functions";

function customFieldsWithValuesQuery(organizationId: string) {
  const queryKey = ["get-custom-fields-with-values", organizationId];

  const queryFn = async () =>
    await get<Response<FeedCustomFieldWithValues>>({
      url: `organizations/${organizationId}/custom-columns`,
    });

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default customFieldsWithValuesQuery;
