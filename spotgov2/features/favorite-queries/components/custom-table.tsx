"use client";

import favoriteQueriesQuery from "@/queries/favorite-queries-query";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import favoriteQueriesCountQuery from "@/queries/favorite-queries-count-query";
import Filters from "./filters/filters";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";

const CustomTable = () => {
  const { searchTextInput } = useFavoriteQueriesFiltersStore();
  const { currentOrganization } = useCurrentOrganizationStore();
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const { data, isPending } = useQuery(
    favoriteQueriesQuery(
      currentOrganization?.organizationId as string,
      page,
      pageSize,
      searchTextInput,
    ),
  );

  const { data: countData } = useQuery(
    favoriteQueriesCountQuery(
      currentOrganization?.organizationId as string,
      searchTextInput,
    ),
  );

  const parsedData = data?.payload
    ? Object.values(data.payload).flatMap((value) => value.contracts)
    : [];

  useEffect(() => {
    setPage(1);
  }, [searchTextInput]);

  return (
    <>
      <Filters />
      <DataTable
        data={parsedData}
        isPending={isPending}
        columns={columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        totalItems={countData?.payload || 0}
      />
    </>
  );
};

export default CustomTable;
