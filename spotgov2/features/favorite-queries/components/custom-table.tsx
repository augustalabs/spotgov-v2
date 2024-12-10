"use client";

import favoriteQueriesQuery from "@/queries/favorite-queries-query";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const CustomTable = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    favoriteQueriesQuery(currentOrganization?.organizationId as string),
  );

  if (isPending) return <div>Loading...</div>;

  const parsedData = data?.payload
    ? Object.values(data.payload)[0].contracts
    : [];

  return <DataTable data={parsedData} columns={columns} />;
};

export default CustomTable;
