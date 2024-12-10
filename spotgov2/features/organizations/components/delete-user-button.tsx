import DestructiveActionDialog from "@/components/destructive-action-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import deleteUserMutation from "@/mutations/delete-user-mutation";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    deleteUserMutation(currentOrganization?.organizationId as string),
  );

  const handleDelete = async () => {
    try {
      const res = await mutation.mutateAsync({ userId });
      if (res.success) {
        toast.success("Utilizador removido com sucesso.");
      } else {
        toast.error(
          "Ocorreu um erro ao remover o utilizador. Por favor, tente novamente.",
        );
      }

      return res.success;
    } catch {
      toast.error(
        "Ocorreu um erro ao remover o utilizador. Por favor, tente novamente.",
      );
      return false;
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DestructiveActionDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      action={handleDelete}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remover utilizador</TooltipContent>
      </Tooltip>
    </DestructiveActionDialog>
  );
};

export default DeleteUserButton;
