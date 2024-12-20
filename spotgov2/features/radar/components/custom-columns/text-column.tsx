import { Input } from "@/components/ui/input";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import {
  addColumnValueMutation,
  updateColumnValueMutation,
} from "../../services";
import { toast } from "sonner";
import { useState } from "react";
import { canChangeFavoriteQueriesColumnValue } from "@/permissions";
import { UserRoles } from "@/types";
import { useTranslations } from "next-intl";

type TextColumnProps = {
  value: string;
  fieldId: string;
  contractId: string;
};

const TextColumn = ({ value, fieldId, contractId }: TextColumnProps) => {
  const toastTranslation = useTranslations("radar.toasts");

  const [newValue, setNewValue] = useState<string>(value);

  const { currentOrganization } = useCurrentOrganizationStore();

  const updateValuemutation = useMutation(
    updateColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const addValueMutation = useMutation(
    addColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const handleValueEdit = async () => {
    try {
      let res;

      if (!value) {
        res = await addValueMutation.mutateAsync({
          value: newValue,
          fieldId,
          contractId,
        });
      } else {
        res = await updateValuemutation.mutateAsync({
          value: newValue,
          fieldId,
          contractId,
        });
      }

      if (res.success) {
        toast.success(toastTranslation("success.updateColumnValue"));
      } else {
        toast.error(toastTranslation("error.updateColumnValueFailed"));
      }
    } catch {
      toast.error(toastTranslation("error.updateColumnValueFailed"));
    }
  };

  return (
    <Input
      type="text"
      value={newValue}
      disabled={
        !canChangeFavoriteQueriesColumnValue(
          currentOrganization?.role as UserRoles,
        )
      }
      onChange={(e) => setNewValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleValueEdit();
        }
      }}
      className="h-9 min-w-32 rounded-md px-3 disabled:cursor-text disabled:border-none disabled:bg-transparent disabled:opacity-100"
    />
  );
};

export default TextColumn;
