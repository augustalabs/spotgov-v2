import React from 'react'

import { updateOrganizationCredits, getAllOrganizations, getAllUsers } from '@/features/internal-dashboard/api'
import { DataTable } from '@/features/internal-dashboard/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const InternalPage = async () => {
  const organizations = await getAllOrganizations()
  const users = await getAllUsers()



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Internal Dashboard</h1>
      <Tabs defaultValue="organizations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="organizations">
          <Card>
            <CardHeader>
              <CardTitle>Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable type="organizations" data={organizations} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable type="users" data={users} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
    </div>
  )
}

export default InternalPage
