import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateColumnValueMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-column-value", organizationId];

  const mutationFn = async ({
    value,
    columnId,
    contractId,
  }: {
    value: string;
    columnId: string;
    contractId: string;
  }) =>
    await patch<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/${columnId}/values`,
      body: {
        value,
        contractId,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateColumnValueMutation;
