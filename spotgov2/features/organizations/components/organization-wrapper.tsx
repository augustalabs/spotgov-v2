"use client";

import { NEW_SEARCH_ROUTE } from "@/routes";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { canViewOrganization } from "@/permissions";

const OrganizationWrapper = ({ children }: { children: ReactNode }) => {
  const { currentOrganization } = useCurrentOrganizationStore();

  useEffect(() => {
    if (currentOrganization && !canViewOrganization(currentOrganization.role)) {
      redirect(NEW_SEARCH_ROUTE);
    }
  }, [currentOrganization?.role]);

  return <div className="mx-auto w-full max-w-3xl">{children}</div>;
};

export default OrganizationWrapper;
