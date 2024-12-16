import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/functions";

function deleteColumnValueMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-column-value", organizationId];

  const mutationFn = async ({
    fieldId,
    contractId,
  }: {
    fieldId: string;
    contractId: string;
  }) =>
    await del<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/${fieldId}/values/${contractId}`,
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteColumnValueMutation;
