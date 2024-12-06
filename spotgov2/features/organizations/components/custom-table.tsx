"use client";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import organizationUsersQuery from "@/queries/organization-users";
import { UserWithOrganizationInfo } from "@/types";

const CustomTable = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    organizationUsersQuery(currentOrganization?.organizationId as string)
  );

  return (
    <div>
      {!isPending && (
        <DataTable
          columns={columns}
          data={data?.payload as UserWithOrganizationInfo[]}
        />
      )}
    </div>
  );
};

export default CustomTable;
