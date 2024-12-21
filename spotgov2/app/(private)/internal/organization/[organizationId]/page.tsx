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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex flex-col gap-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/internal">Internal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> / </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {organization ? (
                organization.name
              ) : (
                <Skeleton className="h-4 w-24" />
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="space-y-6">
        <OrganizationDetails
          organization={organization as Organization}
          isLoading={orgLoading}
          isError={orgError}
        />
        <Separator />
        <OrganizationUsers
          organizationId={organization?.id || ""}
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
    </div>
  );
}
