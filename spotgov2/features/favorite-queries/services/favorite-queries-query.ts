import { FavoriteContractsDataType } from "@/features/favorite-queries/types";
import { OrderType, Response } from "@/types";
import { get } from "@/utils/api/functions";
import { keepPreviousData } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

function favoriteQueriesQuery(
  organizationId: string,
  page: number,
  pageSize: number,
  searchInputText: string,
  adjudicatorsInput: string[],
  titlesInput: string[],
  savedInput: boolean | null,
  cpvsInput: string[],
  basePriceInput: number[],
  publishDateInput: DateRange | undefined,
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
    cpvsInput,
    basePriceInput,
    publishDateInput,
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

    // We can't do !savedInput because savedInput is a boolean
    if (savedInput !== null) searchParams += `&saved=${savedInput}`;

    if (cpvsInput.length) {
      cpvsInput.forEach((cpv) => {
        if (cpv) searchParams += `&cpv=${cpv}`;
      });
    }

    if (selectedSortInput) searchParams += `&sort=${selectedSortInput}`;

    if (basePriceInput[0]) searchParams += `&minPrice=${basePriceInput[0]}`;

    if (basePriceInput[1]) searchParams += `&maxPrice=${basePriceInput[1]}`;

    if (publishDateInput?.from)
      searchParams += `&minPublishDate=${publishDateInput.from}`;

    if (publishDateInput?.to)
      searchParams += `&maxPublishDate=${publishDateInput.to}`;

    return await get<Response<FavoriteContractsDataType>>({
      url: `organizations/${organizationId}/favorite-queries${searchParams}`,
    });
  };

  const enabled = !!organizationId;

  const placeholderData = keepPreviousData;

  return { queryKey, queryFn, enabled, placeholderData };
}

export default favoriteQueriesQuery;
