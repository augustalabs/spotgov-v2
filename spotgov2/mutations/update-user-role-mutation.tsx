import { Query } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response, UserRoles } from "@/types";
import { patch } from "@/utils/api/api";

function updateUserRoleMutation(organizationId: string, userId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["updateUserRole", organizationId, userId];

  const mutationFn = async ({ role }: { role: UserRoles }) =>
    await patch<Response<Query[]>>(
      `organizations/${organizationId}/users/${userId}`,
      {
        role,
      }
    );

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["get-organization-users", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default updateUserRoleMutation;
