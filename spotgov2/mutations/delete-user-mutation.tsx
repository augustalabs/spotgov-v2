import { getQueryClient } from "@/lib/react-query/client";
import { del } from "@/utils/api/api";

function deleteUserMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["deleteUser"];

  const mutationFn = async ({ userId }: { userId: string }) =>
    await del(`organizations/${organizationId}/users/${userId}`);

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["get-organization-users", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteUserMutation;
