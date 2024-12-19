import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function columnLabelsForTypeLabelQuery(organizationId: string) {
  const queryKey = ["get-column-labels-for-type-label", organizationId];

  const queryFn = async () =>
    await get<Response<string[]>>({
      url: `organizations/${organizationId}/custom-columns/values`,
    });

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default columnLabelsForTypeLabelQuery;
