import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addColumnSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldType } from "../../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { addColumnMutation } from "../../services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { toast } from "sonner";
import { useState } from "react";

export const mapDataTypeToPortuguese = {
  text: "Texto",
  logic: "Lógico",
  date: "Data",
  label: "Etiqueta",
  file: "Ficheiro",
};

const AddColumnButton = ({ className }: { className: string }) => {
  const form = useForm<z.infer<typeof addColumnSchema>>({
    resolver: zodResolver(addColumnSchema),
    defaultValues: {
      fieldName: "",
      fieldType: FieldType.Text,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    addColumnMutation(currentOrganization?.organizationId as string),
  );

  const onSubmit = async (values: z.infer<typeof addColumnSchema>) => {
    try {
      const res = await mutation.mutateAsync(values);

      if (res.success) {
        toast.success("Coluna adicionada com sucesso.");
        setIsOpen(false);
      } else {
        toast.error("Erro ao adicionar coluna. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao adicionar coluna. Por favor, tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Plus size={16} />
          <p>Adicionar coluna</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Coluna</DialogTitle>
          <DialogDescription>
            Adicione uma coluna personalizada com informação adicional.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fieldName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Título" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de dados</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo de dados" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(FieldType).map((data) => (
                        <SelectItem
                          key={data}
                          value={data}
                          className={cn(data === field.value && "text-primary")}
                        >
                          <p>{mapDataTypeToPortuguese[data]}</p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              Adicionar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnButton;
