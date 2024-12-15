import { FeedCustomField } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/functions";

function deleteColumnMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-column", organizationId];

  const mutationFn = async ({ columnId }: { columnId: string }) =>
    await del<Response<FeedCustomField[]>>({
      url: `organizations/${organizationId}/custom-columns/${columnId}`,
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-custom-fields-with-values", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteColumnMutation;
