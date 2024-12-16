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
import { isBefore } from "date-fns";

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
    setBasePriceInput,
    basePriceDefaultValues,
    publishDateInput,
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
      selectedSortInput,
    ),
  );

  // This is necessary to update the default values of the multi select components
  useEffect(() => {
    const payload = data?.payload;

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

      // const shouldSetBasePrice =
      //   payload.basePriceRange[0] < (basePriceDefaultValues[0] as number) ||
      //   payload.basePriceRange[1] > (basePriceDefaultValues[1] as number);

      // if (shouldSetBasePrice) {
      //   setBasePriceDefaultValues(payload.basePriceRange);
      //   setBasePriceInput(payload.basePriceRange);
      // }
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
      <Filters />
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
