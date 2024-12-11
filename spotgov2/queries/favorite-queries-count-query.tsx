import { Response } from "@/types";
import { get } from "@/utils/api/api";

function favoriteQueriesCountQuery(
  organizationId: string,
  searchTextInput: string,
) {
  const queryKey = [
    "get-favorite-queries-contracts-count",
    organizationId,
    searchTextInput,
  ];

  const queryFn = async () =>
    await get<Response<number>>(
      `organizations/${organizationId}/favorite-queries-contracts-count?search=${searchTextInput}`,
    );

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default favoriteQueriesCountQuery;
