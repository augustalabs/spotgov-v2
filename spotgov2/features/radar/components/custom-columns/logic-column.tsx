import { Switch } from "@/components/ui/switch";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  addColumnValueMutation,
  updateColumnValueMutation,
} from "../../services";
import { canChangeFavoriteQueriesColumnValue } from "@/permissions";
import { UserRoles } from "@/types";
import { useTranslations } from "next-intl";

type LogicColumnProps = {
  value: string;
  fieldId: string;
  contractId: string;
};

const LogicColumn = ({ value, fieldId, contractId }: LogicColumnProps) => {
  const toastTranslation = useTranslations("radar.toasts");

  const [newValue, setNewValue] = useState<string>(value);

  const { currentOrganization } = useCurrentOrganizationStore();

  const updateValueMutation = useMutation(
    updateColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const addValueMutation = useMutation(
    addColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const handleToggle = async () => {
    try {
      const updatedValue = newValue === "true" ? "false" : "true";

      // Optimistic update
      setNewValue(updatedValue);

      let res;

      if (!value) {
        res = await addValueMutation.mutateAsync({
          value: updatedValue,
          fieldId,
          contractId,
        });
      } else {
        res = await updateValueMutation.mutateAsync({
          value: updatedValue,
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
    <Switch
      checked={newValue === "true" ? true : false}
      onCheckedChange={handleToggle}
      disabled={
        !canChangeFavoriteQueriesColumnValue(
          currentOrganization?.role as UserRoles,
        )
      }
      className="disabled:cursor-default disabled:opacity-100"
    />
  );
};

export default LogicColumn;
