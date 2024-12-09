"use client";

import { NEW_SEARCH_ROUTE } from "@/routes";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { UserRoles } from "@/types";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

const OrganizationWrapper = ({ children }: { children: ReactNode }) => {
  const { currentOrganization } = useCurrentOrganizationStore();

  useEffect(() => {
    if (currentOrganization && currentOrganization.role !== UserRoles.Admin) {
      redirect(NEW_SEARCH_ROUTE);
    }
  }, [currentOrganization?.role]);

  return <div>{children}</div>;
};

export default OrganizationWrapper;
