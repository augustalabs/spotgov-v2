import { Landmark } from "lucide-react";

type ContractTitleProps = {
  title: string;
  issuerName: string;
};

const ContractTitle = ({ title, issuerName }: ContractTitleProps) => {
  return (
    <div className="space-y-1">
      <p className="font-medium">{title}</p>
      <div className="flex items-center gap-1 truncate text-muted-foreground">
        <Landmark size={12} />
        <p className="text-xs">{issuerName}</p>
      </div>
    </div>
  );
};

export default ContractTitle;
