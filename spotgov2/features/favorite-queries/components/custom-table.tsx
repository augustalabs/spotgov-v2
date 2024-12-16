"use client";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";

import Filters from "./filters/filters";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { favoriteQueriesQuery } from "../services";
import { DataTable } from "./data-table";
import { columns } from "./columns/columns";
import useCustomColumns from "../hooks/use-custom-columns";
import { PaginatedContractsType } from "../types";
import { ColumnDef } from "@tanstack/react-table";
import { getQueryClient } from "@/lib/react-query/client";

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
    cpvsInput,
    cpvsDefaultValues,
    setCpvsDefaultValues,
    basePriceInput,
    basePriceDefaultValues,
    setBasePriceDefaultValues,
    publishDateInput,
    onlyPriceCriteriaInput,
    selectedSortInput,
  } = useFavoriteQueriesFiltersStore();
  const { currentOrganization } = useCurrentOrganizationStore();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
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

  // This is necessary to update the default values of the multi select components and the dual range
  // base price slider
  useEffect(() => {
    const payload = data?.payload;

    // This is necessary to rerun the query to get the custom fields with values, otherwise the custom
    // columns values will not be updated in the table, and then it will show old values for different
    // contracts
    const invalidateCustomValues = async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "get-custom-fields-with-values",
          currentOrganization?.organizationId,
        ],
      });
    };

    if (!isPending && payload) {
      const shouldSetAdjudicators =
        payload.distinctAdjudicators.length > adjudicatorsDefaultValues.length;

      if (shouldSetAdjudicators) {
        setAdjudicatorsDefaultValues(payload.distinctAdjudicators);
      }

      const shouldSetQueryTitles =
        payload.distinctQueryTitles.length > queryTitlesDefaultValues.length;

      if (shouldSetQueryTitles) {
        setQueryTitlesDefaultValues(payload.distinctQueryTitles);
      }

      const shouldSetCpvs =
        payload.distinctCpvs.length > cpvsDefaultValues.length;

      if (shouldSetCpvs) {
        setCpvsDefaultValues(payload.distinctCpvs);
      }

      const shouldSetBasePrice = !basePriceDefaultValues;

      if (shouldSetBasePrice) {
        setBasePriceDefaultValues(payload.basePriceRange);
      }

      invalidateCustomValues();
    }
  }, [isPending, data?.payload]);

  const customColumns = useCustomColumns();

  const [allCustomColumns, setAllCustomColumns] = useState<
    ColumnDef<PaginatedContractsType>[]
  >([]);

  useEffect(() => {
    if (!customColumns.isPending) {
      setAllCustomColumns(customColumns.columns);
    }
  }, [customColumns.isPending]);

  return (
    <div className="my-6">
      <Filters queryIds={data?.payload?.distinctQueryIds as string[]} />
      <DataTable
        data={data?.payload?.paginatedContracts ?? []}
        isPending={isPending || isFetching}
        columns={[...columns, ...allCustomColumns]}
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE}
        totalItems={data?.payload?.totalCount ?? 0}
      />
    </div>
  );
};

export default CustomTable;
