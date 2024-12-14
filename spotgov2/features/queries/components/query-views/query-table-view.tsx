"use client";

import { Contract } from "@/database/schemas";
import ContractCard from "../contract-card";
import { ContractQuery } from "@/database/schemas/contracts-queries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import { formatDate2 } from "@/utils/date";

export function formatPrice(price: string | number): string {
  if (price == null || price === "") return "";

  const numberPrice = typeof price === "string" ? parseFloat(price) : price;

  const hasDecimals = numberPrice % 1 !== 0;

  return numberPrice
    .toLocaleString("fr-FR", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    })
    .replace(/\s/g, " ");
}

function QueryTableView({
  filteredContracts,
}: {
  filteredContracts: (Contract & Partial<ContractQuery>)[];
}) {
  console.log(filteredContracts);

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
            submissionDeadlineDate: contract.submissionDeadlineDate
              ? new Date(contract.submissionDeadlineDate).toISOString()
              : "",
            basePrice: contract.basePrice || "",
            location: contract.executionLocation || "",
            publishDate: contract.publishDate
              ? new Date(contract.publishDate).toISOString()
              : "",
            matchTypeFull: contract.matchTypeFull || null,
            reason: contract.reason ? JSON.stringify(contract.reason) : "",
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
              <TableCell>{formatDate2(contractProps.publishDate)}</TableCell>
              <TableCell>
                {formatDate2(contractProps.submissionDeadlineDate)}
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
