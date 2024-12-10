import { ContractsWithMatchTypeAndReasonPerQuery, Response } from "@/types";
import { get } from "@/utils/api/api";

function favoriteQueriesQuery(organizationId: string) {
  const queryKey = ["get-favorite-queries-contracts"];

  const queryFn = async () => {
    console.log(organizationId);
    return await get<Response<ContractsWithMatchTypeAndReasonPerQuery>>(
      `organizations/${organizationId}/favorite-queries-contracts`,
    );
  };

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default favoriteQueriesQuery;
