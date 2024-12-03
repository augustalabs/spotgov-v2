import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";

function deleteQueryMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["deleteQuery"];

  const mutationFn = async ({ queryId }: { queryId: string }) => {
    const response = await fetch(`/api/queries/${organizationId}/${queryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: Response<undefined> = await response.json();

    return data;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["get-queries", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteQueryMutation;
