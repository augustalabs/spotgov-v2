"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Building2,
  CreditCard,
  Calendar,
  RefreshCw,
  Fingerprint,
  DollarSign,
  Pencil,
  Trash,
} from "lucide-react";
import { Organization } from "@/database/schemas";
import OrganizationDetailsSkeleton from "./organization-details-skeleton";
import InfoItem from "./info-item";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editOrganizationSchema } from "../../schemas/edit-organization-schema";
import { EditOrganizationSchema } from "../../schemas/edit-organization-schema";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { deleteOrganizationMutation } from "@/features/organizations/services";
import { updateInfoAndCreditsMutation } from "../../services";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getQueryClient } from "@/lib/react-query/client";
import { useRouter } from "next/navigation";
function OrganizationDetails({
  organization,
  isLoading,
  isError,
}: {
  organization: Organization;
  isLoading: boolean;
  isError: boolean;
}) {
  const queryClient = getQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const router = useRouter();

  const deleteMutation: UseMutationResult<any, unknown, undefined, unknown> =
    useMutation(deleteOrganizationMutation(organization?.id || ""));

  const updateInfoAndCreditsMutationResult = useMutation(
    updateInfoAndCreditsMutation(organization?.id || ""),
  );

  const form = useForm<EditOrganizationSchema>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues: {
      name: "",
      nif: "",
      deepDiveCurrency: 0,
      matchmakingCurrency: 0,
    },
  });

  useEffect(() => {
    if (organization) {
      form.reset({
        name: organization.name || "",
        nif: organization.nif || "",
        deepDiveCurrency: organization.deepDiveCurrency || 0,
        matchmakingCurrency: organization.matchmakingCurrency || 0,
      });
    }
  }, [organization, form]);

  const handleDeleteOrg = () => {
    if (organization) {
      deleteMutation.mutate(undefined, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["get-all-organizations"],
          });
          toast.success("Organization deleted successfully");
          router.push("/internal");
        },
        onError: (error) => {
          toast.error("Failed to delete the organization. Please try again.");
          console.error("Delete error:", error);
        },
        onSettled: () => {
          setDeleteDialogOpen(false);
        },
      });
    }
  };

  const handleEditOrg = (data: EditOrganizationSchema) => {
    if (organization) {
      updateInfoAndCreditsMutationResult.mutate(
        {
          deepDiveCurrency: data.deepDiveCurrency,
          matchmakingCurrency: data.matchmakingCurrency,
          name: data.name,
          nif: data.nif,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["get-organization-by-id", organization.id],
            });
            toast.success("Organization updated successfully");
          },
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

  return (
    <>
      {" "}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Organization Details
            </CardTitle>
            {organization && (
              <CardDescription>ID: {organization.id}</CardDescription>
            )}
          </div>
          {organization && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading && <OrganizationDetailsSkeleton />}
          {isError && (
            <Alert variant="destructive" className="animate-pulse">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
              <AlertDescription className="text-sm">
                Failed to load organization data. Please try again.
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !isError && organization && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={Building2}
                label="Name"
                value={organization.name}
              />
              <InfoItem
                icon={CreditCard}
                label="NIF"
                value={organization.nif || "N/A"}
              />

              <InfoItem
                icon={DollarSign}
                label="Deep Dive Currency"
                value={organization.deepDiveCurrency?.toString() || "N/A"}
              />
              <InfoItem
                icon={DollarSign}
                label="Matchmaking Currency"
                value={organization.matchmakingCurrency?.toString() || "N/A"}
              />
              <InfoItem
                icon={Calendar}
                label="Created At"
                value={
                  organization.createdAt
                    ? new Date(organization.createdAt).toLocaleString()
                    : "N/A"
                }
              />
              <InfoItem
                icon={RefreshCw}
                label="Updated At"
                value={
                  organization.updatedAt
                    ? new Date(organization.updatedAt).toLocaleString()
                    : "N/A"
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
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
    </>
  );
}

export default OrganizationDetails;
