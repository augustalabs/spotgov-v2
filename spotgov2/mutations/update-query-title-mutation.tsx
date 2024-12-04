import { Query } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/api";

function updateQueryTitleMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["updateQuery"];

  const mutationFn = async ({
    queryId,
    title,
  }: {
    queryId: string;
    title: string;
  }) =>
    await patch<Response<Query[]>>(`queries/${organizationId}/${queryId}`, {
      title,
    });

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["get-queries", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default updateQueryTitleMutation;
