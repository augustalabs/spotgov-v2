import { ContractsWithMatchTypeAndReasonPerQuery, Response } from "@/types";
import { get } from "@/utils/api/api";
import { keepPreviousData } from "@tanstack/react-query";

function favoriteQueriesQuery(
  organizationId: string,
  page: number,
  pageSize: number,
) {
  const queryKey = ["get-favorite-queries-contracts", organizationId, page];

  const queryFn = async () =>
    await get<Response<ContractsWithMatchTypeAndReasonPerQuery>>(
      `organizations/${organizationId}/favorite-queries-contracts?page=${page}&pageSize=${pageSize}`,
    );

  const placeholderData = keepPreviousData;

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled, placeholderData };
}

export default favoriteQueriesQuery;
