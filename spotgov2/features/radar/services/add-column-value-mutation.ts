import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { post } from "@/utils/api/functions";

function addColumnValueMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["add-column-value", organizationId];

  const mutationFn = async ({
    value,
    fieldId,
    contractId,
  }: {
    value: string;
    fieldId: string;
    contractId: string;
  }) =>
    await post<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/values`,
      body: {
        value,
        contractId,
        fieldId,
      },
    });

  const onSuccess = async () => {
    const promise1 = queryClient.invalidateQueries({
      queryKey: ["get-column-labels-for-type-label", organizationId],
    });

    const promise2 = queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

    Promise.all([promise1, promise2]);
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default addColumnValueMutation;
