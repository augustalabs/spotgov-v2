import { getQueryClient } from "@/lib/react-query/client";
import { del } from "@/utils/api/api";

function deleteQueryMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["deleteQuery"];

  const mutationFn = async ({ queryId }: { queryId: string }) =>
    await del(`queries/${organizationId}/${queryId}`);

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["get-queries", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteQueryMutation;
