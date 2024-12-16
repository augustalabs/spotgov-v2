import { Switch } from "@/components/ui/switch";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  addColumnValueMutation,
  updateColumnValueMutation,
} from "../../services";

type LogicColumnProps = {
  value: string;
  columnId: string;
  contractId: string;
};

const LogicColumn = ({ value, columnId, contractId }: LogicColumnProps) => {
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
          columnId,
          contractId,
        });
      } else {
        res = await updateValueMutation.mutateAsync({
          value: updatedValue,
          columnId,
          contractId,
        });
      }

      if (res.success) {
        toast.success("Valor atualizado com sucesso.");
      } else {
        toast.error("Erro ao atualizar o valor. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao atualizar o valor. Por favor, tente novamente.");
    }
  };

  return <Switch checked={Boolean(newValue)} onCheckedChange={handleToggle} />;
};

export default LogicColumn;
