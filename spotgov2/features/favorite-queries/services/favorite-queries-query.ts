import { FavoriteContractsDataType } from "@/features/favorite-queries/types";
import { OrderType, Response } from "@/types";
import { get } from "@/utils/api/functions";
import { keepPreviousData } from "@tanstack/react-query";

function favoriteQueriesQuery(
  organizationId: string,
  page: number,
  pageSize: number,
  searchInputText: string,
  adjudicatorsInput: string[],
  titlesInput: string[],
  savedInput: boolean | null,
  selectedSortInput: OrderType,
) {
  const queryKey = [
    "get-favorite-queries",
    organizationId,
    page,
    pageSize,
    searchInputText,
    adjudicatorsInput,
    titlesInput,
    savedInput,
    selectedSortInput,
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

    if (savedInput !== null) searchParams += `&saved=${savedInput}`;

    if (selectedSortInput) searchParams += `&sort=${selectedSortInput}`;

    return await get<Response<FavoriteContractsDataType>>({
      url: `organizations/${organizationId}/favorite-queries${searchParams}`,
    });
  };

  const enabled = !!organizationId;

  const placeholderData = keepPreviousData;

  return { queryKey, queryFn, enabled, placeholderData };
}

export default favoriteQueriesQuery;
