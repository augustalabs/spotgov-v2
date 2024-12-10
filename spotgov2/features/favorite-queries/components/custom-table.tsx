"use client";

import favoriteQueriesQuery from "@/queries/favorite-queries-query";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState } from "react";
import favoriteQueriesCountQuery from "@/queries/favorite-queries-count-query";

const CustomTable = () => {
  const { currentOrganization } = useCurrentOrganizationStore();
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const { data, isPending } = useQuery(
    favoriteQueriesQuery(
      currentOrganization?.organizationId as string,
      page,
      pageSize,
    ),
  );

  const { data: countData } = useQuery(
    favoriteQueriesCountQuery(currentOrganization?.organizationId as string),
  );

  const parsedData = data?.payload
    ? Object.values(data.payload).flatMap((value) => value.contracts)
    : [];

  return (
    <DataTable
      data={parsedData}
      isPending={isPending}
      columns={columns}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
      totalItems={countData?.payload || 0}
    />
  );
};

export default CustomTable;
