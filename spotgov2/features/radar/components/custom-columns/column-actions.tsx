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
import { useTranslations } from "next-intl";

type ColumnActionsProps = {
  label: string;
  fieldId: string;
};

const ColumnActions = ({ label, fieldId }: ColumnActionsProps) => {
  const columnActionsTranslation = useTranslations(
    "radar.table.customColumns.columnActions",
  );
  const toastTranslations = useTranslations("radar.toasts");

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
        toast.success(toastTranslations("success.editColumn"));
      } else {
        toast.error(toastTranslations("error.editColumnFailed"));
      }
    } catch {
      toast.error(toastTranslations("error.editColumnFailed"));
    }
  };

  const deleteMutation = useMutation(
    deleteColumnMutation(currentOrganization?.organizationId as string),
  );

  const handleDelete = async () => {
    try {
      const res = await deleteMutation.mutateAsync({ fieldId });

      if (res.success) {
        toast.success(toastTranslations("success.deleteColumn"));
      } else {
        toast.error(toastTranslations("error.deleteColumnFailed"));
      }

      return res.success;
    } catch {
      toast.error(toastTranslations("error.deleteColumnFailed"));

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
            "bg-gray-50 pl-0 !text-foreground",
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
        <h1 className="text-sm font-medium">
          {columnActionsTranslation("label")}
        </h1>
        <Separator />
        <button
          className="group flex w-full cursor-pointer items-center gap-2 text-sm"
          onClick={handleEditClick}
        >
          <Edit size={14} />
          <p className="group-hover:text-primary">
            {columnActionsTranslation("options.changeName")}
          </p>
        </button>
        <DestructiveActionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          action={handleDelete}
        >
          <div className="group flex items-center gap-2 text-sm">
            <Trash size={14} className="text-red-500" />
            <p className="group-hover:text-primary">
              {columnActionsTranslation("options.delete")}
            </p>
          </div>
        </DestructiveActionDialog>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnActions;
