import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import {
  addColumnValueMutation,
  columnLabelsForTypeLabelQuery,
  deleteColumnValueMutation,
  updateColumnValueMutation,
} from "../../services";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addLabelSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

type LabelColumnProps = {
  value: string;
  columnId: string;
  contractId: string;
};

const LabelColumn = ({ value, columnId, contractId }: LabelColumnProps) => {
  const [localLabel, setLocalLabel] = useState<string>(value);

  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    columnLabelsForTypeLabelQuery(
      currentOrganization?.organizationId as string,
    ),
  );

  const form = useForm<z.infer<typeof addLabelSchema>>({
    resolver: zodResolver(addLabelSchema),
    defaultValues: {
      label: "",
    },
  });

  const addMutation = useMutation(
    addColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const updateMutation = useMutation(
    updateColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const onSubmit = async (values: z.infer<typeof addLabelSchema>) => {
    try {
      // Optimistic update
      setLocalLabel(value);

      let res;

      if (value === "") {
        res = await addMutation.mutateAsync({
          value: values.label,
          columnId,
          contractId,
        });
      } else {
        res = await updateMutation.mutateAsync({
          value: values.label,
          columnId,
          contractId,
        });
      }

      if (res.success) {
        toast.success("Etiqueta adicionada com sucesso.");
      } else {
        toast.error("Erro ao adicionar etiqueta. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao adicionar etiqueta. Por favor, tente novamente.");
    }
  };

  const deleteMutation = useMutation(
    deleteColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const onSelectionChange = async (v: string) => {
    try {
      let res;

      if (v === value) {
        // Optimistic update
        setLocalLabel("");

        res = await deleteMutation.mutateAsync({
          columnId,
          contractId,
        });
      } else {
        // Optimistic update
        setLocalLabel(v);

        res = await updateMutation.mutateAsync({
          value: v,
          columnId,
          contractId,
        });
      }

      if (res.success) {
        toast.success("Etiqueta atualizada com sucesso.");
      } else {
        toast.error("Erro ao atualizar etiqueta. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao atualizar etiqueta. Por favor, tente novamente.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-32">
          {localLabel === "" && <Plus size={16} />}
          {localLabel !== "" ? localLabel : "Adicionar"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-1">
        <Command>
          <CommandInput placeholder="Procurar etiqueta..." />
          <CommandList>
            <CommandEmpty>Não foram encontrados resultados.</CommandEmpty>
            {isPending && <Skeleton className="h-2 w-full" />}
            {!isPending && (
              <CommandGroup
                heading={data?.payload ? "Etiquetas" : ""}
                value={localLabel}
              >
                {data?.payload &&
                  data.payload.map((label) => (
                    <CommandItem
                      key={label}
                      value={label}
                      onSelect={() => {
                        onSelectionChange(label);
                      }}
                      className={cn(
                        "flex items-center justify-between data-[selected='true']:bg-background data-[selected=true]:text-foreground data-[selected='true']:hover:text-primary",
                        localLabel === label &&
                          "text-primary data-[selected=true]:text-primary",
                      )}
                    >
                      <p>{label}</p>
                      <Check
                        size={16}
                        className={cn(
                          "opacity-0",
                          localLabel === label && "opacity-100",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        {!isPending && <Separator />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-end justify-between gap-2 pt-1"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiqueta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nome da etiqueta"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              <Plus size={16} />
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default LabelColumn;
