import { Query } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response, UserRoles } from "@/types";
import { patch } from "@/utils/api/functions";

function updateUserRoleMutation(organizationId: string, userId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-user-role", organizationId, userId];

  const mutationFn = async ({ role }: { role: UserRoles }) =>
    await patch<Response<Query[]>>({
      url: `organizations/${organizationId}/users/${userId}`,
      body: {
        role,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organization-users", organizationId],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateUserRoleMutation;
