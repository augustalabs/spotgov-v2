import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import {
  addColumnValueMutation,
  updateColumnValueMutation,
} from "../../services";
import { toast } from "sonner";
import { canChangeFavoriteQueriesColumnValue } from "@/permissions";
import { UserRoles } from "@/types";

type DateColumnProps = {
  value: string;
  fieldId: string;
  contractId: string;
};

const DateColumn = ({ value, fieldId, contractId }: DateColumnProps) => {
  const [newValue, setNewValue] = useState<string>(value);

  const { currentOrganization } = useCurrentOrganizationStore();

  const updateValuemutation = useMutation(
    updateColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const addValueMutation = useMutation(
    addColumnValueMutation(currentOrganization?.organizationId as string),
  );

  const handleValueEdit = async (v: Date | undefined) => {
    try {
      if (!v) return;

      // Optimistic update
      setNewValue(v.toISOString());

      let res;

      if (!value) {
        res = await addValueMutation.mutateAsync({
          value: v.toISOString(),
          fieldId,
          contractId,
        });
      } else {
        res = await updateValuemutation.mutateAsync({
          value: v.toISOString(),
          fieldId,
          contractId,
        });
      }

      if (res.success) {
        toast.success("Valor atualizado com sucesso.");
      } else {
        toast.error("Erro ao atualizar valor. Por favor, tente novamente.");
      }
    } catch {
      toast.error("Erro ao atualizar valor. Por favor, tente novamente.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={
            !canChangeFavoriteQueriesColumnValue(
              currentOrganization?.role as UserRoles,
            )
          }
          className="flex w-full min-w-32 items-center justify-between disabled:cursor-text disabled:border-none disabled:bg-transparent disabled:opacity-100"
        >
          <p>
            {newValue ? format(newValue, "dd/MM/yyyy") : "Escolha uma data"}
          </p>
          {canChangeFavoriteQueriesColumnValue(
            currentOrganization?.role as UserRoles,
          ) && <CalendarIcon size={14} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          initialFocus
          selected={new Date(newValue)}
          onSelect={(value) => handleValueEdit(value)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateColumn;
