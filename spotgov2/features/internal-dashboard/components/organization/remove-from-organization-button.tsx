"use client";

import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteUserMutation } from "@/features/organizations/services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import DestructiveActionDialog from "@/components/destructive-action-dialog";
import { useState } from "react";

interface RemoveFromOrganizationButtonProps {
  userId: string;
  organizationId: string;
}

const RemoveFromOrganizationButton = ({
  userId,
  organizationId,
}: RemoveFromOrganizationButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteUserMutationResult = useMutation(
    deleteUserMutation(organizationId),
  );

  const handleDelete = async () => {
    try {
      const res = await deleteUserMutationResult.mutateAsync({ userId });
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

  return (
    <DestructiveActionDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      action={handleDelete}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon" className="size-8">
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove user from organization</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DestructiveActionDialog>
  );
};

export default RemoveFromOrganizationButton;
