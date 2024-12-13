import { Response } from "@/types";
import { get } from "@/utils/api/functions";

type TokenAnswer = {
  organizationId: string;
  email: string;
  userExists: boolean;
};

function acceptInviteQuery(token: string) {
  const queryKey = ["accept-invite"];

  const queryFn = async () =>
    await get<Response<TokenAnswer>>({
      url: `organizations/accept-invite/${token}`,
    });

  return { queryKey, queryFn };
}

export default acceptInviteQuery;
