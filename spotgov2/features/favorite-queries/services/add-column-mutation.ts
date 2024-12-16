import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { post } from "@/utils/api/functions";
import { FieldType } from "../types";

function getDataTypeText(data: FieldType) {
  if (data === FieldType.Text) {
    return "text";
  } else if (data === FieldType.Logic) {
    return "logic";
  } else if (data === FieldType.Date) {
    return "date";
  } else if (data === FieldType.Label) {
    return "label";
  } else if (data === FieldType.File) {
    return "file";
  }
}

function addColumnMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["add-column", organizationId];

  const mutationFn = async ({
    fieldName,
    fieldTypeEnum,
  }: {
    fieldName: string;
    fieldTypeEnum: FieldType;
  }) =>
    await post<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns`,
      body: {
        fieldName,
        fieldType: getDataTypeText(fieldTypeEnum),
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default addColumnMutation;
