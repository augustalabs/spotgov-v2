import { Button } from "@/components/ui/button";
import { updateContractSavedMutation } from "../../services";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";

type SavedProps = {
  saved: boolean;
  contractId: string;
};

const Saved = ({ saved, contractId }: SavedProps) => {
  const { savedInput } = useFavoriteQueriesFiltersStore();

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    updateContractSavedMutation(
      currentOrganization?.organizationId as string,
      contractId,
    ),
  );
  const handleSaveContract = async () => {
    try {
      // We do an optimistic update here to avoid waiting for the mutation to finish.
      // The if statement is to avoid the case where the savedInput is not 'all' which
      // means the contract will disappear from the list and we don't want to change the state,
      // otherwise it will show the update for the wrong contract.
      if (savedInput === null) {
        setIsSaved((prev) => !prev);
      }

      const res = await mutation.mutateAsync({
        saved: !saved,
      });

      if (res.success) {
        if (res.payload?.saved) toast.success("Contrato guardado com sucesso.");
        else toast.success("Contrato removido dos guardados com sucesso.");
      } else {
        toast.error("Erro ao guardar/remover contrato.");
      }
    } catch {
      toast.error("Erro ao guardar/remover contrato.");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSaveContract}
      className={cn(isSaved && "border-primary bg-primary/10 text-primary")}
    >
      <Bookmark size={16} />
      <p>{isSaved ? "Guardado" : "Guardar"}</p>
    </Button>
  );
};

export default Saved;
