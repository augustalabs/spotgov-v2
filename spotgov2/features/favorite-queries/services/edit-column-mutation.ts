import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function editColumnMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["edit-column", organizationId];

  const mutationFn = async ({
    fieldName,
    columnId,
  }: {
    fieldName: string;
    columnId: string;
  }) =>
    await patch<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/${columnId}`,
      body: {
        fieldName,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default editColumnMutation;
