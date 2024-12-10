import { Response } from "@/types";
import { get } from "@/utils/api/api";

function favoriteQueriesCountQuery(organizationId: string) {
  const queryKey = ["get-favorite-queries-contracts-count", organizationId];

  const queryFn = async () =>
    await get<Response<number>>(
      `organizations/${organizationId}/favorite-queries-contracts-count`,
    );

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default favoriteQueriesCountQuery;
