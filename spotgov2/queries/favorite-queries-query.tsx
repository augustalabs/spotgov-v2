import { ContractsWithMatchTypeAndReasonPerQuery, Response } from "@/types";
import { get } from "@/utils/api/api";
import { keepPreviousData } from "@tanstack/react-query";

function favoriteQueriesQuery(
  organizationId: string,
  page: number,
  pageSize: number,
  searchTextInput?: string,
) {
  const queryKey = [
    "get-favorite-queries-contracts",
    organizationId,
    page,
    searchTextInput,
  ];

  const queryFn = async () =>
    await get<Response<ContractsWithMatchTypeAndReasonPerQuery>>(
      `organizations/${organizationId}/favorite-queries-contracts?page=${page}&pageSize=${pageSize}&search=${searchTextInput}`,
    );

  const placeholderData = keepPreviousData;

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled, placeholderData };
}

export default favoriteQueriesQuery;
