"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { createOrganizationSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "../actions";

const CreateOrganizationForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      nif: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const mutation = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: createOrganization,
  });

  const onSubmit = async (values: z.infer<typeof createOrganizationSchema>) => {
    try {
      mutation.mutate(values);
    } catch (error: unknown) {
      const err = error as Error;

      toast({
        title: err.name,
        description: err.message,
      });
    }
  };

  return (
    <Card className="max-h-full overflow-auto">
      <CardHeader className="space-y-6 ">
        <CardTitle className="mx-auto">Criar Organização</CardTitle>
        <CardDescription className="mx-auto">
          Preencha o formulário abaixo para criar uma nova organização.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Nome" />
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
                    <Input {...field} type="text" placeholder="NIF" max={9} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <Loader className="animate-spin" /> : "Criar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateOrganizationForm;
