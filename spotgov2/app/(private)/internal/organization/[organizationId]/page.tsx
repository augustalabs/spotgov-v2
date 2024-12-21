"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  organizationByIdQuery,
  organizationUsersQuery,
} from "@/features/organizations/services";
import { organizationFeaturesQuery } from "@/features/internal-dashboard/services";
import { Separator } from "@/components/ui/separator";
import { Organization } from "@/database/schemas";
import OrganizationUsers from "@/features/internal-dashboard/components/organization/organization-users";
import OrganizationDetails from "@/features/internal-dashboard/components/organization/organization-details";
import OrganizationFeatures from "@/features/internal-dashboard/components/organization/organization-features";

export default function OrganizationPage() {
  const { organizationId } = useParams();

  const {
    data: orgData,
    isLoading: orgLoading,
    isError: orgError,
  } = useQuery(organizationByIdQuery(organizationId as string));

  const {
    data: orgUsersData,
    isLoading: orgUsersLoading,
    isError: orgUsersError,
  } = useQuery(organizationUsersQuery(organizationId as string));

  const {
    data: orgFeaturesData,
    isLoading: orgFeaturesLoading,
    isError: orgFeaturesError,
  } = useQuery(organizationFeaturesQuery(organizationId as string));

  const organization = orgData?.payload;
  const users = orgUsersData?.payload || [];
  const features = orgFeaturesData?.payload || null;

  return (
    <main className="space-y-6 p-4">
      <OrganizationDetails
        organization={organization as Organization}
        isLoading={orgLoading}
        isError={orgError}
      />
      <Separator />
      <OrganizationUsers
        users={users}
        isLoading={orgUsersLoading}
        isError={orgUsersError}
      />
      <Separator />
      <OrganizationFeatures
        organizationId={organization?.id || ""}
        features={features}
        isLoading={orgFeaturesLoading}
        isError={orgFeaturesError}
      />
    </main>
  );
}
