"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import allOrganizationsQuery from "@/features/internal-dashboard/services/all-organizations-query";
import allUsersQuery from "@/features/internal-dashboard/services/all-users-query";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OrganizationsTab } from "@/features/internal-dashboard/components/organizations-tab";
import { UsersTab } from "@/features/internal-dashboard/components/users-tab";

export default function InternalDashboard() {
  const {
    data: orgsData,
    isLoading: orgsLoading,
    isError: orgsError,
  } = useQuery(allOrganizationsQuery());

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(allUsersQuery());

  return (
    <div className="container mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Internal Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="organizations">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="organizations">
              <OrganizationsTab
                orgsData={orgsData?.payload}
                isLoading={orgsLoading}
                isError={orgsError}
              />
            </TabsContent>
            <TabsContent value="users">
              <UsersTab
                usersData={usersData?.payload}
                isLoading={usersLoading}
                isError={usersError}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
