import { Query } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateQueryTitleMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-query"];

  const mutationFn = async ({
    queryId,
    title,
  }: {
    queryId: string;
    title: string;
  }) =>
    await patch<Response<Query[]>>({
      url: `queries/${organizationId}/${queryId}`,
      body: {
        title,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-queries", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateQueryTitleMutation;
