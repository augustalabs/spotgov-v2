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
import { canChangeFavoriteQueriesColumnValue } from "@/permissions";
import { UserRoles } from "@/types";
import { useTranslations } from "next-intl";

type LabelColumnProps = {
  value: string;
  fieldId: string;
  contractId: string;
};

const LabelColumn = ({ value, fieldId, contractId }: LabelColumnProps) => {
  const labelTranslation = useTranslations("radar.table.customColumns.label");
  const toastTranslation = useTranslations("radar.toasts");

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

  const isLoading = form.formState.isSubmitting;

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
          fieldId,
          contractId,
        });
      } else {
        res = await updateMutation.mutateAsync({
          value: values.label,
          fieldId,
          contractId,
        });
      }

      if (res.success) {
        toast.success(toastTranslation("success.addLabel"));
      } else {
        toast.error(toastTranslation("error.addLabelFailed"));
      }
    } catch {
      toast.error(toastTranslation("error.addLabelFailed"));
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
          fieldId,
          contractId,
        });
      } else {
        // Optimistic update
        setLocalLabel(v);

        if (value === "") {
          res = await addMutation.mutateAsync({
            value: v,
            fieldId,
            contractId,
          });
        } else {
          res = await updateMutation.mutateAsync({
            value: v,
            fieldId,
            contractId,
          });
        }
      }

      if (res.success) {
        toast.success(toastTranslation("success.updateLabel"));
      } else {
        toast.error(toastTranslation("error.updateLabelFailed"));
      }
    } catch {
      toast.error(toastTranslation("error.updateLabelFailed"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-32 disabled:cursor-text disabled:border-none disabled:bg-transparent disabled:opacity-100"
          disabled={
            !canChangeFavoriteQueriesColumnValue(
              currentOrganization?.role as UserRoles,
            )
          }
        >
          {localLabel === "" && <Plus size={16} />}
          {localLabel !== "" ? localLabel : labelTranslation("label")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-1">
        {!isPending && data?.payload && data.payload.length > 0 && (
          <>
            <Command>
              <CommandInput
                placeholder={labelTranslation("popover.searchPlaceholder")}
              />
              <CommandList>
                <CommandEmpty>
                  {labelTranslation("popover.noResults")}
                </CommandEmpty>
                <CommandGroup
                  className="max-h-36 overflow-auto"
                  heading={
                    data?.payload ? labelTranslation("popover.label") : ""
                  }
                  value={localLabel}
                >
                  {data.payload.map((label) => (
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
              </CommandList>
            </Command>
            <Separator />
          </>
        )}

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
                  <FormLabel>
                    {labelTranslation("popover.input.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={labelTranslation(
                        "popover.input.placeholder",
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              <Plus size={16} />
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default LabelColumn;
