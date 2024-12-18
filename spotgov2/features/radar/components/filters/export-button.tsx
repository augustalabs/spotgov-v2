import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { FileSpreadsheet, Loader } from "lucide-react";
import { exportTableMutation } from "../../services";
import { useState } from "react";
import { ExportTableField } from "../../types";
import { toast } from "sonner";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";

type ExportButtonProps = {
  queryIds: string[];
  className: string;
};

const FIELDS: ExportTableField[] = [
  { colName: "Título", path: "contracts.title" },
  { colName: "Resumo", path: "contracts.summary" },
  {
    colName: "Adjudicante",
    path: "contracts.issuer",
  },
  {
    colName: "Localização",
    path: "contracts.executionLocation",
  },
  {
    colName: "Preço Base",
    path: "contracts.basePrice",
  },
  {
    colName: "Data de Publicação",
    path: "contracts.publishDate",
  },
  {
    colName: "Data de Prazo de Submissão",
    path: "contracts.submissionDeadlineDate",
  },
  {
    colName: "Tipo de Contracto",
    path: "contracts.contractType",
  },
  { colName: "CPVs", path: "contracts.cpvs" },
  {
    colName: "Link Submissão",
    path: "contracts.linkDelivery",
  },
  { colName: "Link Dr", path: "contracts.linkDr" },
];

const ExportButton = ({ queryIds, className }: ExportButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation(exportTableMutation());

  const { currentOrganization } = useCurrentOrganizationStore();

  const handleExport = async () => {
    try {
      setIsLoading(true);

      const res = await mutation.mutateAsync({
        userId: currentOrganization?.userId as string,
        queryIds,
        fields: FIELDS,
        specialFormatting: { priceEuros: ["Preço Base"] },
      });

      if (res.success) {
        toast.success("Exportação realizada com sucesso.");
      } else {
        toast.error("Erro ao exportar tabela. Por favor, tente novamente.");
      }
    } catch (error) {
      // TODO: REMOVE LOG
      console.log(error);

      toast.error("Erro ao exportar tabela. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" className={className} onClick={handleExport}>
      <FileSpreadsheet size={16} />
      {isLoading ? (
        <div className="flex items-center gap-2">
          <p>A exportar...</p>
          <Loader size={16} className="animate-spin" />
        </div>
      ) : (
        <p>Exportar</p>
      )}
    </Button>
  );
};

export default ExportButton;
