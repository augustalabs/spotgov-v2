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
import { canAddFavoriteQueriesColumn } from "@/permissions";
import { UserRoles } from "@/types";
import { useTranslations } from "next-intl";

const AddColumnButton = ({ className }: { className: string }) => {
  const newColumnTranslation = useTranslations("radar.filters.newColumn");
  const toastsTranslation = useTranslations("radar.toasts");

  const mapDataTypeToLocale = {
    text: newColumnTranslation("dialog.inputs.type.options.text"),
    logic: newColumnTranslation("dialog.inputs.type.options.logic"),
    date: newColumnTranslation("dialog.inputs.type.options.date"),
    label: newColumnTranslation("dialog.inputs.type.options.label"),
    file: newColumnTranslation("dialog.inputs.type.options.file"),
  };

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
      const res = await mutation.mutateAsync({
        fieldName: values.fieldName,
        fieldTypeEnum: values.fieldType,
      });

      if (res.success) {
        toast.success(toastsTranslation("success.addColumn"));
        setIsOpen(false);
        form.reset();
      } else {
        toast.error(toastsTranslation("error.addColumnFailed"));
      }
    } catch {
      toast.error(toastsTranslation("error.addColumnFailed"));
    }
  };

  if (!canAddFavoriteQueriesColumn(currentOrganization?.role as UserRoles))
    return;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Plus size={16} />
          <p>{newColumnTranslation("label")}</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{newColumnTranslation("dialog.title")}</DialogTitle>
          <DialogDescription>
            {newColumnTranslation("dialog.subtitle")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fieldName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {newColumnTranslation("dialog.inputs.title")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={newColumnTranslation("dialog.inputs.title")}
                    />
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
                  <FormLabel>
                    {newColumnTranslation("dialog.inputs.type.label")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(FieldType).map((data) => (
                        <SelectItem
                          key={data}
                          value={data}
                          className={cn(data === field.value && "text-primary")}
                        >
                          <p>{mapDataTypeToLocale[data]}</p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {newColumnTranslation("dialog.button")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumnButton;
