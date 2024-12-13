import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/api";

function deleteUserMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["deleteUser"];

  const mutationFn = async ({ userId }: { userId: string }) =>
    await del<Response<void>>({
      url: `organizations/${organizationId}/users/${userId}`,
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organization-users", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteUserMutation;
