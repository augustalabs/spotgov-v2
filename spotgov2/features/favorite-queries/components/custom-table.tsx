"use client";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";

import Filters from "./filters/filters";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import favoriteQueriesQuery from "@/queries/favorite-queries-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const PAGE_SIZE = 8;

const CustomTable = () => {
  const { searchTextInput } = useFavoriteQueriesFiltersStore();
  const { currentOrganization } = useCurrentOrganizationStore();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [searchTextInput]);

  const { data, isPending, isFetching } = useQuery(
    favoriteQueriesQuery(
      currentOrganization?.organizationId as string,
      page,
      PAGE_SIZE,
      searchTextInput,
    ),
  );

  return (
    <>
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
    </>
  );
};

export default CustomTable;
