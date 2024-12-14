"use client";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { organizationUsersQuery } from "@/features/organizations/services";
import { UserWithOrganizationInfo } from "@/types";

const CustomTable = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    organizationUsersQuery(currentOrganization?.organizationId as string),
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.payload as UserWithOrganizationInfo[]}
        isPending={isPending}
      />
    </div>
  );
};

export default CustomTable;
