import { Response } from "@/types";
import { post } from "@/utils/api/api";

function inviteUserMutation() {
  const mutationKey = ["inviteUser"];

  const mutationFn = async ({
    organizationId,
    organizationName,
    email,
  }: {
    organizationId: string;
    organizationName: string;
    email: string;
  }) => {
    await post<Response<string>>(`organizations/invite`, {
      organizationId,
      organizationName,
      email,
    });
  };

  return { mutationKey, mutationFn };
}

export default inviteUserMutation;
