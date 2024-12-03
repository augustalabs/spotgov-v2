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

  const onSubmit = async (values: z.infer<typeof updateQueryTitleSchema>) => {
    try {
      await updateMutation.mutate({
        queryId: query.id,
        title: values.title,
      });

      // TODO: Check if it was actually a success
      toast.success("Título alterado com sucesso.");
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
      await deleteMutation.mutate({ queryId: query.id });

      // TODO: Check if it was actually a success
      toast.success("Pesquisa eliminada com sucesso.");
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
        <DialogTitle>Opções</DialogTitle>
        <DialogDescription>Descrição</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <div className="flex items-center space-x-2">
                  <Edit size={16} />
                  <p>Editar</p>
                </div>
              )}
            </Button>
          </form>
        </Form>
        <Separator />
        <div className="text-xs">Email stuff here</div>
        <Separator />
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={handleDelete}
        >
          <Trash size={16} />
          <p>Eliminar</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SidebarHistoryActions;
