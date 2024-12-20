"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import DeadlineDays from "./deadline-days";
import Saved from "./saved";
import ContractTitle from "./contract-title";
import { PaginatedContractsType } from "../../types";
import { formatPrice } from "@/utils/utils";
import { useTranslations } from "next-intl";

export const columns: ColumnDef<PaginatedContractsType>[] = [
  {
    accessorKey: "title",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("title")}</p>;
    },
    cell: ({ row }) => (
      <ContractTitle
        title={row.original.contract.title as string}
        issuerName={row.original.contract.issuerName as string}
      />
    ),
  },
  {
    accessorKey: "basePrice",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("basePrice")}</p>;
    },
    cell: ({ row }) => (
      <p className="truncate">
        {formatPrice(parseInt(row.original.contract.basePrice as string))} €
      </p>
    ),
  },
  {
    accessorKey: "publishDate",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("publishDate")}</p>;
    },
    cell: ({ row }) =>
      formatDate(row.original.contract.publishDate as Date, "dd/MM/yyyy"),
  },
  {
    accessorKey: "submissionDeadlineDate",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("deadline")}</p>;
    },
    cell: ({ row }) =>
      formatDate(
        row.original.contract.submissionDeadlineDate as Date,
        "dd/MM/yyyy",
      ),
  },
  {
    accessorKey: "executionDeadlineDays",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("timeLeft.label")}</p>;
    },
    cell: ({ row }) => (
      <DeadlineDays
        date={row.original.contract.submissionDeadlineDate as Date}
      />
    ),
  },
  {
    accessorKey: "queryTitle",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("query")}</p>;
    },
    cell: ({ row }) => (
      <p className="truncate">{row.original.queryTitle as string}</p>
    ),
  },
  {
    accessorKey: "saved",
    header: () => {
      const columnsTranslation = useTranslations("radar.table.columns");

      return <p>{columnsTranslation("saved.label")}</p>;
    },
    cell: ({ row }) => (
      <Saved
        saved={row.original.saved as boolean}
        contractId={row.original.contract.id}
      />
    ),
  },
];
