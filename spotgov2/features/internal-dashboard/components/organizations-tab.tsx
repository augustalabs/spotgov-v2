"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DataTable } from "@/features/internal-dashboard/components/data-table";
import { Organization } from "@/database/schemas";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteOrganizationMutation } from "@/features/organizations/services";
import { updateInfoAndCreditsMutation } from "@/features/internal-dashboard/services";
import {
  editOrganizationSchema,
  EditOrganizationSchema,
} from "@/features/internal-dashboard/schemas/edit-organization-schema";

interface OrganizationsTabProps {
  orgsData: Organization[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetchOrgs: () => Promise<any>;
}

export function OrganizationsTab({
  orgsData,
  isLoading,
  isError,
  refetchOrgs,
}: OrganizationsTabProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);

  const deleteMutation: UseMutationResult<any, unknown, undefined, unknown> =
    useMutation(deleteOrganizationMutation(currentOrg?.id || ""));

  const updateInfoAndCreditsMutationResult = useMutation(
    updateInfoAndCreditsMutation(currentOrg?.id || ""),
  );

  const form = useForm<EditOrganizationSchema>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues: {
      name: currentOrg?.name || "",
      nif: currentOrg?.nif || "",
      deepDiveCurrency: currentOrg?.deepDiveCurrency || 0,
      matchmakingCurrency: currentOrg?.matchmakingCurrency || 0,
    },
  });

  const handleDeleteOrg = () => {
    if (currentOrg) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success(`${currentOrg.name} has been successfully deleted.`);
          setDeleteDialogOpen(false);
          refetchOrgs();
        },
        onError: (error) => {
          toast.error("Failed to delete the organization. Please try again.");
          console.error("Delete error:", error);
        },
      });
    }
  };

  const handleEditOrg = (data: EditOrganizationSchema) => {
    if (currentOrg) {
      updateInfoAndCreditsMutationResult.mutate(
        {
          deepDiveCurrency: data.deepDiveCurrency,
          matchmakingCurrency: data.matchmakingCurrency,
          name: data.name,
          nif: data.nif,
        },
        {
          onError: (error) => {
            toast.error("Failed to update the organization. Please try again.");
            console.error("Update error:", error);
          },
          onSettled: () => {
            setEditDialogOpen(false);
          },
        },
      );
    }
  };

  const columns: ColumnDef<Organization>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Name</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "nif",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>NIF</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "deepDiveCurrency",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Deep Dive Currency</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "matchmakingCurrency",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Matchmaking Currency</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Created At</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return <div>{new Date(date).toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Updated At</span>
          <ArrowUpDown
            className="h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as string;
        return <div>{new Date(date).toLocaleString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const org = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(org.id)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy organization ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setCurrentOrg(org);
                  form.reset({
                    name: org.name,
                    nif: org.nif || "",
                    deepDiveCurrency: org.deepDiveCurrency || 0,
                    matchmakingCurrency: org.matchmakingCurrency || 0,
                  });
                  setEditDialogOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit organization
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCurrentOrg(org);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const initialColumnVisibility = {
    nif: false,
    updatedAt: false,
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-red-500">
        Failed to load organizations.
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={orgsData || []}
        initialColumnVisibility={initialColumnVisibility}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this organization?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              organization and remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrg}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditOrg)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIF</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deepDiveCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deep Dive Currency</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matchmakingCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matchmaking Currency</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={updateInfoAndCreditsMutationResult.isPending}
                >
                  {updateInfoAndCreditsMutationResult.isPending
                    ? "Saving..."
                    : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
