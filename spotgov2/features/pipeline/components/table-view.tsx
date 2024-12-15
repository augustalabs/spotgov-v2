"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/features/queries/components/query-views/query-table-view";
import { formatDate2 } from "@/utils/date";

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
      <h1 className="mb-4 text-2xl font-bold">Pipeline</h1>
      {phaseNames.map((phaseName) => {
        const contracts = phaseData[phaseName];

        // Skip phases with no contracts
        if (contracts.length === 0) return null;

        return (
          <div key={phaseName} className="mb-8">
            <h2 className="mb-4 text-xl font-bold">{phaseName}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Título</TableHead>
                  <TableHead className="text-left">Entidade</TableHead>
                  <TableHead className="text-left">Preço Base</TableHead>
                  <TableHead className="text-left">
                    Data de Publicação
                  </TableHead>
                  <TableHead className="text-left">
                    Data Limite de Submissão
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
                      {formatDate2(
                        new Date(contract.publishDate).toLocaleDateString(),
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate2(
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
