"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { customFieldsWithValuesQuery } from "../services";
import { FieldType, PaginatedContractsType } from "../types";
import TextColumn from "../components/custom-columns/text-column";
import ColumnActions from "../components/custom-columns/column-actions";
import LogicColumn from "../components/custom-columns/logic-column";
import DateColumn from "../components/custom-columns/date-column";
import LabelColumn from "../components/custom-columns/label-column";
import FileColumn from "../components/custom-columns/file-column";

export const useCustomColumns = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending, isFetching } = useQuery(
    customFieldsWithValuesQuery(currentOrganization?.organizationId as string),
  );

  const customColumns = useMemo<ColumnDef<PaginatedContractsType>[]>(
    () =>
      !data || isPending || isFetching
        ? []
        : Object.values(data.payload || {}).map((field) => ({
            accessorKey: (
              field.feedCustomFields.fieldName as string
            ).toLowerCase(),
            header: () => (
              <ColumnActions
                label={field.feedCustomFields.fieldName as string}
                fieldId={field.feedCustomFields.id}
              />
            ),
            cell: ({ row }) => {
              const matchedValue = field.feedCustomFieldsValues.find(
                (value) => value.contractId === row.original.contract.id,
              );

              const fieldType = field.feedCustomFields.fieldType;
              const value = matchedValue?.value ?? "";
              const fieldId = field.feedCustomFields.id;
              const contractId = row.original.contract.id;

              switch (fieldType) {
                case FieldType.Text:
                  return (
                    <TextColumn
                      value={value}
                      fieldId={fieldId}
                      contractId={contractId}
                    />
                  );
                case FieldType.Logic:
                  return (
                    <LogicColumn
                      value={value}
                      fieldId={fieldId}
                      contractId={contractId}
                    />
                  );
                case FieldType.Date:
                  return (
                    <DateColumn
                      value={value}
                      fieldId={fieldId}
                      contractId={contractId}
                    />
                  );
                case FieldType.Label:
                  return (
                    <LabelColumn
                      value={value}
                      fieldId={fieldId}
                      contractId={contractId}
                    />
                  );
                case FieldType.File:
                  return (
                    <FileColumn
                      value={value}
                      fieldId={fieldId}
                      contractId={contractId}
                    />
                  );
                default:
                  return null;
              }
            },
          })),
    [data, isPending, isFetching],
  );

  return useMemo(
    () => ({
      columns: customColumns,
      isPending: isPending || isFetching,
    }),
    [customColumns, isPending, isFetching],
  );
};
