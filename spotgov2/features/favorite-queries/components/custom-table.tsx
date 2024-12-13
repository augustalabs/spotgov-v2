"use client";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";

import Filters from "./filters/filters";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { favoriteQueriesQuery } from "../services";
import { DataTable } from "./data-table";
import { columns } from "./columns/columns";

const PAGE_SIZE = 8;

const CustomTable = () => {
  const {
    searchTextInput,
    adjudicatorsInput,
    adjudicatorsDefaultValues,
    setAdjudicatorsDefaultValues,
    queryTitlesInput,
    queryTitlesDefaultValues,
    setQueryTitlesDefaultValues,
    savedInput,
  } = useFavoriteQueriesFiltersStore();
  const { currentOrganization } = useCurrentOrganizationStore();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [searchTextInput, adjudicatorsInput]);

  const { data, isPending, isFetching } = useQuery(
    favoriteQueriesQuery(
      currentOrganization?.organizationId as string,
      page,
      PAGE_SIZE,
      searchTextInput,
      adjudicatorsInput,
      queryTitlesInput,
      savedInput,
    ),
  );

  // This is necessary to update the default values of the select components
  useEffect(() => {
    const payload = data?.payload;

    if (!isPending && payload) {
      const shouldSetAdjudicators =
        payload.distinctAdjudicators.length > adjudicatorsDefaultValues.length;

      const shouldSetQueryTitles =
        payload.distinctQueryTitles.length > queryTitlesDefaultValues.length;

      if (shouldSetAdjudicators) {
        setAdjudicatorsDefaultValues(payload.distinctAdjudicators);
      }

      if (shouldSetQueryTitles) {
        setQueryTitlesDefaultValues(payload.distinctQueryTitles);
      }
    }
  }, [isPending, data?.payload]);

  console.log(data);

  return (
    <div className="my-6">
      <Filters />
      <DataTable
        data={data?.payload?.paginatedContracts ?? []}
        isPending={isPending || isFetching}
        columns={columns}
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE}
        totalItems={data?.payload?.totalCount ?? 0}
      />
    </div>
  );
};

export default CustomTable;
