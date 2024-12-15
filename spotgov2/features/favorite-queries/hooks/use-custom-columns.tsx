"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import customFieldsWithValuesQuery from "../services/custom-fields-with-values-query";
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
      : data.payload?.map((field) => ({
          accessorKey:
            field.feedCustomFields.fieldName?.toLowerCase() as string,
          header: () => (
            <ColumnActions
              label={field.feedCustomFields.fieldName as string}
              columnId={field.feedCustomFields.id}
            />
          ),
          // TODO: Add custom cell renderer
          cell: ({ row }) => {
            if (field.feedCustomFields.fieldType === FieldType.Text) {
              const value =
                field.feedCustomFieldsValues?.contractId ===
                  row.original.contract.id &&
                field.feedCustomFieldsValues?.value
                  ? field.feedCustomFieldsValues.value
                  : "";

              return <TextColumn value={value} />;
            }
          },
        })) || [];

  return { columns: customColumns, isPending };
};

export default useCustomColumns;
