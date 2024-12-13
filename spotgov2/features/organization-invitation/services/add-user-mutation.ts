import { Response } from "@/types";
import { post } from "@/utils/api/functions";

function addUserMutation() {
  const mutationKey = ["add-user"];

  const mutationFn = async ({
    organizationId,
    email,
  }: {
    organizationId: string;
    email: string;
  }) =>
    await post<Response<void>>({
      url: `organizations/${organizationId}/users`,
      body: {
        email,
      },
    });

  return { mutationKey, mutationFn };
}

export default addUserMutation;
