import { Response } from "@/types";
import { post } from "@/utils/api/functions";

function inviteUserMutation() {
  const mutationKey = ["invite-user"];

  const mutationFn = async ({
    organizationId,
    organizationName,
    email,
  }: {
    organizationId: string;
    organizationName: string;
    email: string;
  }) =>
    await post<Response<string>>({
      url: `organizations/${organizationId}/invite`,
      body: {
        organizationName,
        email,
      },
    });

  return { mutationKey, mutationFn };
}

export default inviteUserMutation;
