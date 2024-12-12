import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

type SavedProps = {
  isSaved: boolean;
};

const Saved = ({ isSaved }: SavedProps) => {
  // TODO: Implement save contract functionality
  const handleSaveContract = () => {};

  return (
    <Button variant="outline" size="sm" onClick={handleSaveContract}>
      <Bookmark size={16} fill={isSaved ? "#0066ff" : "transparent"} />
      <p>{isSaved ? "Guardado" : "Guardar"}</p>
    </Button>
  );
};

export default Saved;
