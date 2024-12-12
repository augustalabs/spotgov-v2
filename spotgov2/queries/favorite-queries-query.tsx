import { FavoriteContractsDataType } from "@/features/favorite-queries/type";
import { Response } from "@/types";
import { get } from "@/utils/api/api";
import { keepPreviousData } from "@tanstack/react-query";

function favoriteQueriesQuery(
  organizationId: string,
  page: number,
  pageSize: number,
  searchInputText: string,
  adjudicatorsInput: string[],
  titlesInput: string[],
) {
  const queryKey = [
    "get-favorite-queries",
    organizationId,
    page,
    pageSize,
    searchInputText,
    adjudicatorsInput,
    titlesInput,
  ];

  const queryFn = async () => {
    let searchParams = `?page=${page}&pageSize=${pageSize}`;

    if (searchInputText) searchParams += `&search=${searchInputText}`;

    if (adjudicatorsInput.length) {
      adjudicatorsInput.forEach((adjudicator) => {
        if (adjudicator) searchParams += `&adjudicator=${adjudicator}`;
      });
    }

    if (titlesInput.length) {
      titlesInput.forEach((title) => {
        if (title) searchParams += `&title=${title}`;
      });
    }

    return await get<Response<FavoriteContractsDataType>>(
      `organizations/${organizationId}/favorite-queries${searchParams}`,
    );
  };

  const enabled = !!organizationId;

  const placeholderData = keepPreviousData;

  return { queryKey, queryFn, enabled, placeholderData };
}

export default favoriteQueriesQuery;
