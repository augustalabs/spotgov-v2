import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/api";

function deleteQueryMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-query"];

  const mutationFn = async ({ queryId }: { queryId: string }) =>
    await del<Response<void>>(`queries/${organizationId}/${queryId}`);

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-queries", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteQueryMutation;
