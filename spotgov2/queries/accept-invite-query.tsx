import { Response } from "@/types";
import { get } from "@/utils/api/api";

type TokenAnswer = {
  organizationId: string;
  email: string;
  userExists: boolean;
};

function acceptInviteQuery(token: string) {
  const queryKey = ["accept-invite"];

  const queryFn = async () =>
    await get<Response<TokenAnswer>>(`organizations/accept-invite/${token}`);

  return { queryKey, queryFn };
}

export default acceptInviteQuery;
