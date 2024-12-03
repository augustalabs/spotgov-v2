import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";

function updateQueryTitleMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["updateQuery"];

  const mutationFn = async ({
    queryId,
    title,
  }: {
    queryId: string;
    title: string;
  }) => {
    const response = await fetch(`/api/queries/${organizationId}/${queryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
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

export default updateQueryTitleMutation;
