"use client";

import { Edit, Loader, MoreVertical, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Query } from "@/database/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import updateQueryTitleMutation from "@/mutations/update-query-title-mutation";
import { toast } from "sonner";
import deleteQueryMutation from "@/mutations/delete-query-mutation";
import { cn } from "@/utils/utils";

type SidebarHistoryActionsProps = {
  query: Query;
};

const updateQueryTitleSchema = z.object({
  title: z.string().min(3, {
    message: "O título é inválido.",
  }),
});

const SidebarHistoryActions = ({ query }: SidebarHistoryActionsProps) => {
  const currentOrganizationStore = useCurrentOrganizationStore();

  const form = useForm<z.infer<typeof updateQueryTitleSchema>>({
    resolver: zodResolver(updateQueryTitleSchema),
    defaultValues: {
      title: query.title as string,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const updateMutation = useMutation(
    updateQueryTitleMutation(
      currentOrganizationStore.currentOrganization?.organizationId as string
    )
  );

  const handleUpdate = async (
    values: z.infer<typeof updateQueryTitleSchema>
  ) => {
    try {
      const res = await updateMutation.mutateAsync({
        queryId: query.id,
        title: values.title,
      });

      if (res.success) {
        toast.success("Título alterado com sucesso.");
      } else {
        toast.error(
          "Não foi possível realizar a alteração do título. Por favor, tente novamente."
        );
      }
    } catch {
      toast.error(
        "Não foi possível realizar a alteração do título. Por favor, tente novamente."
      );
    }
  };

  const deleteMutation = useMutation(
    deleteQueryMutation(
      currentOrganizationStore.currentOrganization?.organizationId as string
    )
  );

  const handleDelete = async () => {
    try {
      const res = await deleteMutation.mutateAsync({ queryId: query.id });

      if (res.success) {
        toast.success("Pesquisa eliminada com sucesso.");
      } else {
        toast.error(
          "Não foi possível realizar a eliminação da pesquisa. Por favor, tente novamente."
        );
      }
    } catch {
      toast.error(
        "Não foi possível realizar a eliminação da pesquisa. Por favor, tente novamente."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <MoreVertical size={16} className="hover:text-primary" />
      </DialogTrigger>
      <DialogContent>
        {/* WARNING: WITHOUT TITLE AND DESCRIPTION BROWSER CRIES */}
        <DialogTitle className="sr-only">Ações da pesquisa</DialogTitle>
        <DialogDescription className="sr-only">
          Receba atualizações, edite ou elimine a pesquisa
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex items-end gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Título" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              <div
                className={cn(
                  "flex items-center space-x-2",
                  isLoading && "animate-pulse"
                )}
              >
                <Edit size={16} />
                <p>Editar</p>
              </div>
            </Button>
          </form>
        </Form>
        <Separator />
        <div className="text-xs">Email stuff here</div>
        <Separator />
        <Button
          variant="destructive"
          className={cn(
            "flex items-center gap-2",
            deleteMutation.isPending && "animate-pulse"
          )}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          <Trash size={16} />
          <p>Eliminar</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SidebarHistoryActions;
