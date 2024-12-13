import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { inviteUserSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { inviteUserMutation } from "@/features/organizations/services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { toast } from "sonner";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AddUserButton = () => {
  const form = useForm<z.infer<typeof inviteUserSchema>>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(inviteUserMutation());

  const onSubmit = async (values: z.infer<typeof inviteUserSchema>) => {
    try {
      const res = await mutation.mutateAsync({
        organizationId: currentOrganization?.organizationId as string,
        organizationName: currentOrganization?.organization?.name as string,
        email: values.email,
      });

      if (res.success) {
        toast.success("Convite enviado com sucesso!");
        setIsOpen(false);
      } else {
        toast.error("Erro ao enviar convite. Por favor tente novamente.");
      }
    } catch {
      toast.error("Erro ao enviar convite. Por favor tente novamente.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((v) => !v)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus size={16} />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Convidar utilizador</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar membro</DialogTitle>
          <DialogDescription>
            Convide um novo membro para a sua organização.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Enviar convite
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
