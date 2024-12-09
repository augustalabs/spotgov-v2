import { Response } from "@/types";
import { post } from "@/utils/api/api";

function addUserMutation() {
  const mutationKey = ["add-user"];

  const mutationFn = async ({
    organizationId,
    email,
  }: {
    organizationId: string;
    email: string;
  }) => {
    return await post<Response<void>>(`organizations/${organizationId}/users`, {
      email,
    });
  };

  return { mutationKey, mutationFn };
}

export default addUserMutation;
