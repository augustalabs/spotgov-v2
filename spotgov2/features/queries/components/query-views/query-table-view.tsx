"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  ArrowUpRight,
  BadgeEuro,
  Calendar,
  Clock,
  Landmark,
  ScrollText,
} from "lucide-react";
import { formatFullDate } from "@/utils/date-utils";
import { formatPrice } from "@/utils/utils";

function QueryTableView({
  filteredContracts,
}: {
  filteredContracts: {
    id: string | null;
    title: string | null;
    issuerName: string | null;
    submissionDeadlineDate: string | null;
    basePrice: string | null;
    publishDate: string | null;
    matchTypeFull: boolean | null;
    reason: string | null;
    executionLocation: string | null;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 flex-shrink-0" />
              Título
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <BadgeEuro className="h-4 w-4 flex-shrink-0" />
              Preço Base
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              Data de Publicação
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              Prazo de Submissão
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 flex-shrink-0" />
              Relevância
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredContracts?.map((contract) => {
          const contractProps = {
            title: contract.title ?? "",
            issuerName: contract.issuerName || "",
            submissionDeadlineDate: contract.submissionDeadlineDate || "",
            basePrice: contract.basePrice || "",
            location: contract.executionLocation || "",
            publishDate: contract.publishDate || "",
            matchTypeFull: contract.matchTypeFull || null,
            reason: contract.reason || "",
          };

          return (
            <TableRow key={contract.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="flex items-center justify-start gap-1.5 font-medium">
                    {contractProps.title}
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-secondary" />
                  </span>
                  <span className="flex items-center justify-start gap-1.5 text-xs text-secondary">
                    <Landmark className="h-3 w-3 flex-shrink-0" />
                    {contractProps.issuerName}
                  </span>
                </div>
              </TableCell>
              <TableCell>{formatPrice(contractProps.basePrice)}€</TableCell>
              <TableCell>{formatFullDate(contractProps.publishDate)}</TableCell>
              <TableCell>
                {formatFullDate(contractProps.submissionDeadlineDate)}
              </TableCell>
              <TableCell>
                {contractProps.matchTypeFull ? "Muito relevante" : "Relevante"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default QueryTableView;
