"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { customFieldsWithValuesQuery } from "../services";
import { FieldType, PaginatedContractsType } from "../types";
import TextColumn from "../components/custom-columns/text-column";
import ColumnActions from "../components/custom-columns/column-actions";

const useCustomColumns = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    customFieldsWithValuesQuery(currentOrganization?.organizationId as string),
  );

  const customColumns: ColumnDef<PaginatedContractsType>[] =
    !data || isPending
      ? []
      : Object.values(data.payload || {}).map((field) => ({
          accessorKey: (
            field.feedCustomFields.fieldName as string
          ).toLowerCase(),
          header: () => (
            <ColumnActions
              label={field.feedCustomFields.fieldName as string}
              columnId={field.feedCustomFields.id}
            />
          ),
          cell: ({ row }) => {
            const matchedValue = field.feedCustomFieldsValues.find(
              (value) => value.contractId === row.original.contract.id,
            );

            // TODO: Handle other field types
            if (field.feedCustomFields.fieldType === FieldType.Text) {
              return (
                <TextColumn
                  value={matchedValue?.value || ""}
                  columnId={field.feedCustomFields.id}
                  contractId={row.original.contract.id}
                />
              );
            }
          },
        }));

  return { columns: customColumns, isPending };
};

export default useCustomColumns;
