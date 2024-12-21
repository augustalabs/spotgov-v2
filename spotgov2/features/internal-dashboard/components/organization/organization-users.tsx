import { UserWithOrganizationInfo } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import UsersSkeleton from "./users-skeleton";

function OrganizationUsers({
  users,
  isLoading,
  isError,
}: {
  users: UserWithOrganizationInfo[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Organization Users</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <UsersSkeleton />}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load users. Please try again.
            </AlertDescription>
          </Alert>
        )}
        {!isLoading && !isError && users.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Users</AlertTitle>
            <AlertDescription>
              No users found for this organization.
            </AlertDescription>
          </Alert>
        )}
        {!isLoading && !isError && users.length > 0 && (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableCaption>All users in this organization</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Online</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user?.user?.id}>
                    <TableCell>{user?.user?.email}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>
                      {user?.lastOnline
                        ? new Date(user.lastOnline).toLocaleString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

export default OrganizationUsers;
