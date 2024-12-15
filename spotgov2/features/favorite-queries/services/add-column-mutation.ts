import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { post } from "@/utils/api/functions";

function addColumnMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["add-column", organizationId];

  const mutationFn = async ({
    fieldName,
    fieldType,
  }: {
    fieldName: string;
    fieldType: string;
  }) =>
    await post<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns`,
      body: {
        fieldName,
        fieldType,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default addColumnMutation;
