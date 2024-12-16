import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

// TODO: IMPLEMENT
const ExportButton = ({ className }: { className: string }) => {
  const handleExport = () => {};

  return (
    <Button variant="outline" className={className} onClick={handleExport}>
      <FileSpreadsheet size={16} />
      <p>Exportar</p>
    </Button>
  );
};

export default ExportButton;
