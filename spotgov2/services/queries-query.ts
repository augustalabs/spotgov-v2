import { Query } from "@/database/schemas";
import { Response } from "@/types";
import { get } from "@/utils/api/functions";

function queriesQuery(organizationId: string) {
  const queryKey = ["get-queries", organizationId];

  const queryFn = async () =>
    await get<Response<Query[]>>({ url: `queries/${organizationId}` });

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default queriesQuery;
