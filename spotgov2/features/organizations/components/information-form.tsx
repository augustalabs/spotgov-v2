"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateOrganizationSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { Pencil, PencilOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { updateOrganizationMutation } from "@/features/organizations/services";
import { toast } from "sonner";
import { ORGANIZATION_ROUTE } from "@/routes";

const InformationForm = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { currentOrganization } = useCurrentOrganizationStore();

  const form = useForm<z.infer<typeof updateOrganizationSchema>>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      name: "",
      nif: "",
    },
  });

  // This is necessary to initialize the form values when the current organization is loaded
  useEffect(() => {
    if (currentOrganization) {
      form.reset({
        name: currentOrganization.organization?.name,
        nif: currentOrganization.organization?.nif ?? "",
      });
    }
  }, [currentOrganization, form]);

  const mutation = useMutation(updateOrganizationMutation());

  const onSubmit = async (values: z.infer<typeof updateOrganizationSchema>) => {
    try {
      const res = await mutation.mutateAsync({
        organizationId: currentOrganization?.organization?.id as string,
        name: values.name,
        nif: values.nif ?? "",
      });

      console.log(res);

      if (res.success) {
        toast.success("Organização atualizada com sucesso.");
        setIsEditable(false);
      } else {
        toast.error(
          "Ocorreu um erro ao atualizar a organização. Por favor, tente novamente.",
        );
      }
    } catch {
      toast.error(
        "Ocorreu um erro ao atualizar a organização. Por favor, tente novamente.",
      );
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Header title={ORGANIZATION_ROUTE.label} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditable((v) => !v)}
        >
          {isEditable ? <PencilOff size={16} /> : <Pencil size={16} />}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0"
        >
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className={cn(
                        "w-full pl-0 sm:w-72",
                        !isEditable &&
                          "border-background disabled:cursor-default disabled:opacity-100",
                      )}
                      placeholder="Nome da organização"
                      disabled={!isEditable}
                      readOnly={!isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nif"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>NIF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      value={field.value ?? ""}
                      className={cn(
                        "w-full pl-0 sm:w-40",
                        !isEditable &&
                          "border-background disabled:cursor-default disabled:opacity-100",
                      )}
                      placeholder="NIF da organização"
                      disabled={!isEditable}
                      readOnly={!isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {isEditable && <Button type="submit">Guardar</Button>}
        </form>
      </Form>
    </>
  );
};

export default InformationForm;
