import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateColumnValueMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-column-value", organizationId];

  const mutationFn = async ({
    value,
    fieldId,
    contractId,
  }: {
    value: string;
    fieldId: string;
    contractId: string;
  }) =>
    await patch<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/${fieldId}/values`,
      body: {
        value,
        contractId,
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

export default updateColumnValueMutation;
