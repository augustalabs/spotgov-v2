import DestructiveActionDialog from "@/components/destructive-action-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteUserMutation } from "@/features/organizations/services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const organizationTranslation = useTranslations("organization");

  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    deleteUserMutation(currentOrganization?.organizationId as string),
  );

  const handleDelete = async () => {
    try {
      const res = await mutation.mutateAsync({ userId });
      if (res.success) {
        toast.success(organizationTranslation("toasts.success.memberRemoved"));
      } else {
        toast.error(organizationTranslation("toasts.error.memberRemoveFailed"));
      }

      return res.success;
    } catch {
      toast.error(organizationTranslation("toasts.error.memberRemoveFailed"));
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
        <TooltipContent>{organizationTranslation('table.removeMember.tooltip')}</TooltipContent>
      </Tooltip>
    </DestructiveActionDialog>
  );
};

export default DeleteUserButton;
