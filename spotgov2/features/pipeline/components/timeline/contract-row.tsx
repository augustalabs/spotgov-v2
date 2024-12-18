import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import Icon from "@/components/icon";
import { Landmark } from "lucide-react";
import { formatPrice } from "@/utils/utils";

interface Contract {
  title: string;
  basePrice: string;
  issuerName: string;
  publishDate: string;
  submissionDeadlineDate: string;
}

interface ContractRowProps {
  contract: Contract;
}

const ContractRow: React.FC<ContractRowProps> = ({ contract }) => (
  <TableRow>
    <TableCell className="nowrap truncate">
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="font-medium">{contract.title}</div>
        <div className="flex items-center gap-1.5 text-xs text-secondary">
          <Icon IconComponent={Landmark} className="h-3 w-3" />
          {contract.issuerName}
        </div>
      </div>
    </TableCell>
    <TableCell className="nowrap truncate">
      {formatPrice(contract.basePrice)}€
    </TableCell>
  </TableRow>
);

export default React.memo(ContractRow);
