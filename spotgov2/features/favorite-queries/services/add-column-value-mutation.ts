import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { post } from "@/utils/api/functions";

function addColumnValueMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["add-column-value", organizationId];

  const mutationFn = async ({
    value,
    columnId,
    contractId,
  }: {
    value: string;
    columnId: string;
    contractId: string;
  }) =>
    await post<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/values`,
      body: {
        value,
        contractId,
        columnId,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default addColumnValueMutation;
