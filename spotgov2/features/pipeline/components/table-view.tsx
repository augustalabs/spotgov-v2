"use client";

import Icon from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TIMELINE_DAY_WIDTH } from "@/utils/constants";
import { formatFullDate } from "@/utils/date-utils";
import { formatPrice } from "@/utils/utils";
import { BadgeEuro, Calendar, Clock, Landmark, ScrollText } from "lucide-react";

function TableView({
  phaseData,
  phaseNames,
}: {
  organizationId: string;
  phaseData: Record<
    string,
    {
      id: string;
      title: string;
      issuerName: string;
      basePrice: string;
      publishDate: string;
      submissionDeadlineDate: string;
    }[]
  >;
  phaseNames: string[];
}) {
  return (
    <div>
      {phaseNames.map((phaseName) => {
        const contracts = phaseData[phaseName];

        // Skip phases with no contracts
        if (contracts.length === 0) return null;

        return (
          <div key={phaseName} className="mb-5">
            <h2
              className="flex items-center justify-start text-xs uppercase text-secondary"
              style={{ height: `${TIMELINE_DAY_WIDTH}px` }}
            >
              {phaseName}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">
                    <div className="flex items-center justify-start gap-1.5">
                      <Icon IconComponent={ScrollText} />
                      Concurso
                    </div>
                  </TableHead>
                  <TableHead className="text-left">
                    <div className="flex items-center justify-start gap-1.5">
                      <Icon IconComponent={Landmark} />
                      Entidade
                    </div>
                  </TableHead>
                  <TableHead className="text-left">
                    <div className="flex items-center justify-start gap-1.5">
                      <Icon IconComponent={BadgeEuro} />
                      Preço Base
                    </div>
                  </TableHead>
                  <TableHead className="text-left">
                    <div className="flex items-center justify-start gap-1.5">
                      <Icon IconComponent={Calendar} />
                      Data de Publicação
                    </div>
                  </TableHead>
                  <TableHead className="text-left">
                    <div className="flex items-center justify-start gap-1.5">
                      <Icon IconComponent={Clock} />
                      Data Limite de Submissão
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {phaseData[phaseName].map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.title}
                    </TableCell>
                    <TableCell>{contract.issuerName}</TableCell>
                    <TableCell>{formatPrice(contract.basePrice)}</TableCell>
                    <TableCell>
                      {formatFullDate(
                        new Date(contract.publishDate).toLocaleDateString(),
                      )}
                    </TableCell>
                    <TableCell>
                      {formatFullDate(
                        new Date(
                          contract.submissionDeadlineDate,
                        ).toLocaleDateString(),
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}

export default TableView;
