"use client";

import { ContractWithMatchTypeAndReason } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ContractWithMatchTypeAndReason>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "basePrice",
    header: "Preço base",
  },
  {
    accessorKey: "publishDate",
    header: "Data de publicação",
  },
  {
    accessorKey: "submissionDeadlineDate",
    header: "Prazo de submissão",
  },
  {
    accessorKey: "executionDeadlineDays",
    header: "Tempo restante",
  },
  {
    accessorKey: "queryTitle",
    header: "Pesquisa",
  },
  {
    accessorKey: "saved",
    header: "Interesse",
  },
];
