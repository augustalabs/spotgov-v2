"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { getQueryClient } from "@/lib/react-query/client";

import { FavoriteContractsDataType } from "../types";
import { favoriteQueriesQuery } from "../services";
import { useCustomColumns } from "../hooks/use-custom-columns";

import { DataTable } from "./data-table";
import { Filters } from "./filters/filters";
import { columns } from "./columns/columns";

const PAGE_SIZE = 8;

const CustomTable = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const {
    searchTextInput,
    adjudicatorsInput,
    setAdjudicatorsDefaultValues,
    queryTitlesInput,
    setQueryTitlesDefaultValues,
    savedInput,
    cpvsInput,
    setCpvsDefaultValues,
    basePriceInput,
    setBasePriceDefaultValues,
    publishDateInput,
    onlyPriceCriteriaInput,
    selectedSortInput,
  } = useFavoriteQueriesFiltersStore();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [
    searchTextInput,
    adjudicatorsInput,
    queryTitlesInput,
    savedInput,
    cpvsInput,
    basePriceInput,
    publishDateInput,
    selectedSortInput,
    onlyPriceCriteriaInput,
  ]);

  const { data, isPending, isFetching } = useQuery(
    favoriteQueriesQuery(
      currentOrganization?.organizationId as string,
      page,
      PAGE_SIZE,
      searchTextInput,
      adjudicatorsInput,
      queryTitlesInput,
      savedInput,
      cpvsInput,
      basePriceInput,
      publishDateInput,
      onlyPriceCriteriaInput,
      selectedSortInput,
    ),
  );

  const queryClient = getQueryClient();

  const updateDefaultValues = useCallback(
    (payload: FavoriteContractsDataType) => {
      if (payload.distinctAdjudicators.length > 0) {
        setAdjudicatorsDefaultValues(payload.distinctAdjudicators);
      }
      if (payload.distinctQueryTitles.length > 0) {
        setQueryTitlesDefaultValues(payload.distinctQueryTitles);
      }
      if (payload.distinctCpvs.length > 0) {
        setCpvsDefaultValues(payload.distinctCpvs);
      }
      if (payload.basePriceRange) {
        setBasePriceDefaultValues(payload.basePriceRange);
      }
    },
    [
      setAdjudicatorsDefaultValues,
      setQueryTitlesDefaultValues,
      setCpvsDefaultValues,
      setBasePriceDefaultValues,
    ],
  );

  const invalidateQuery = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        "get-custom-fields-with-values",
        currentOrganization?.organizationId,
      ],
    });
  }, [queryClient, currentOrganization?.organizationId]);

  useEffect(() => {
    if (!isPending && data?.payload) {
      updateDefaultValues(data.payload);
      invalidateQuery();
    }
  }, [
    isPending,
    data?.payload,
    updateDefaultValues,
    queryClient,
    currentOrganization?.organizationId,
  ]);

  const customColumns = useCustomColumns();

  const allColumns = useMemo(
    () => [...columns, ...customColumns.columns],
    [customColumns.columns],
  );

  return (
    <div className="my-6">
      <Filters queryIds={data?.payload?.distinctQueryIds as string[]} />
      <DataTable
        data={data?.payload?.paginatedContracts ?? []}
        isPending={isPending || isFetching}
        columns={allColumns}
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE}
        totalItems={data?.payload?.totalCount ?? 0}
      />
    </div>
  );
};

export default CustomTable;
