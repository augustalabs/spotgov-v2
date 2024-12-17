import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeEuro, ScrollText } from "lucide-react";
import ContractRow from "./contract-row";
import Icon from "@/components/icon";

interface Contract {
  title: string;
  basePrice: string;
  issuerName: string;
  publishDate: string;
  submissionDeadlineDate: string;
}

interface PhaseItemProps {
  phaseName: string;
  contracts: Contract[];
  timelineDayWidth: number;
}

const PhaseItem: React.FC<PhaseItemProps> = ({
  phaseName,
  contracts,
  timelineDayWidth,
}) => (
  <div className="mb-4">
    <div
      className="flex items-center justify-start text-xs uppercase text-secondary"
      style={{ height: `${timelineDayWidth}px` }}
    >
      {phaseName}
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="nowrap flex items-center gap-1.5 truncate">
              <Icon IconComponent={ScrollText} />
              <span>Concurso</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="nowrap flex items-center gap-1.5 truncate">
              <Icon IconComponent={BadgeEuro} />
              <span>Preço Base</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract, index) => (
          <ContractRow key={index} contract={contract} />
        ))}
      </TableBody>
    </Table>
  </div>
);

export default React.memo(PhaseItem);
