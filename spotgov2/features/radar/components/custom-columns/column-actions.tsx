import DestructiveActionDialog from "@/components/destructive-action-dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { editColumnMutation, deleteColumnMutation } from "../../services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { canEditFavoriteQueriesColumn } from "@/permissions";
import { UserRoles } from "@/types";

type ColumnActionsProps = {
  label: string;
  fieldId: string;
};

const ColumnActions = ({ label, fieldId }: ColumnActionsProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [newLabel, setNewLabel] = useState<string>(label);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditable((prev) => !prev);
    setPopoverIsOpen(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const { currentOrganization } = useCurrentOrganizationStore();

  const editMutation = useMutation(
    editColumnMutation(currentOrganization?.organizationId as string),
  );

  const handleEdit = async () => {
    try {
      setIsEditable(false);

      const res = await editMutation.mutateAsync({
        fieldName: newLabel,
        fieldId,
      });

      if (res.success) {
        toast.success("Coluna editada com sucesso.");
      } else {
        toast.error("Erro ao editar a coluna. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao editar a coluna. Por favor, tente novamente.");
    }
  };

  const deleteMutation = useMutation(
    deleteColumnMutation(currentOrganization?.organizationId as string),
  );

  const handleDelete = async () => {
    try {
      const res = await deleteMutation.mutateAsync({ fieldId });

      if (res.success) {
        toast.success("Coluna eliminada com sucesso.");
      } else {
        toast.error("Erro ao eliminar a coluna. Por favor, tente novamente.");
      }

      return res.success;
    } catch {
      toast.error("Erro ao eliminar a coluna. Por favor, tente novamente.");

      return false;
    }
  };

  return (
    <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
      <div className="flex w-full min-w-32 items-center justify-between">
        <Input
          type="text"
          ref={inputRef}
          value={newLabel}
          readOnly={!isEditable}
          disabled={!isEditable}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEdit();
            }
          }}
          className={cn(
            "pl-0",
            !isEditable &&
              "border-none disabled:cursor-text disabled:font-medium disabled:text-muted-foreground disabled:opacity-100",
          )}
        />
        {canEditFavoriteQueriesColumn(
          currentOrganization?.role as UserRoles,
        ) && (
          <PopoverTrigger>
            <EllipsisVertical size={16} />
          </PopoverTrigger>
        )}
      </div>
      <PopoverContent className="space-y-2">
        <h1 className="text-sm font-medium">Ações</h1>
        <Separator />
        <button
          className="group flex w-full cursor-pointer items-center gap-2 text-sm"
          onClick={handleEditClick}
        >
          <Edit size={14} />
          <p className="group-hover:text-primary">Alterar o nome</p>
        </button>
        <DestructiveActionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          action={handleDelete}
        >
          <div className="group flex items-center gap-2 text-sm">
            <Trash size={14} className="text-red-500" />
            <p className="group-hover:text-primary">Eliminar</p>
          </div>
        </DestructiveActionDialog>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnActions;
