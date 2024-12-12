"use client";

import { formatBasePrice } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import DeadlineDays from "./deadline-days";
import Saved from "./saved";
import ContractTitle from "./contract-title";
import { PaginatedContractsType } from "../../type";

export const columns: ColumnDef<PaginatedContractsType>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <ContractTitle
        title={row.original.contract.title as string}
        issuerName={row.original.contract.issuerName as string}
      />
    ),
  },
  {
    accessorKey: "basePrice",
    header: "Preço base",
    cell: ({ row }) =>
      formatBasePrice(parseInt(row.original.contract.basePrice as string)),
  },
  {
    accessorKey: "publishDate",
    header: "Data de publicação",
    cell: ({ row }) =>
      formatDate(row.original.contract.publishDate as Date, "dd/MM/yyyy"),
  },
  {
    accessorKey: "submissionDeadlineDate",
    header: "Prazo de submissão",
    cell: ({ row }) =>
      formatDate(
        row.original.contract.submissionDeadlineDate as Date,
        "dd/MM/yyyy",
      ),
  },
  {
    accessorKey: "executionDeadlineDays",
    header: "Tempo restante",
    cell: ({ row }) => (
      <DeadlineDays
        date={row.original.contract.submissionDeadlineDate as Date}
      />
    ),
  },
  {
    accessorKey: "queryTitle",
    header: "Pesquisa",
    cell: ({ row }) => (
      <p className="truncate">{row.original.queryTitle as string}</p>
    ),
  },
  {
    accessorKey: "saved",
    header: "Interesse",
    cell: ({ row }) => <Saved isSaved={row.original.saved as boolean} />,
  },
];
