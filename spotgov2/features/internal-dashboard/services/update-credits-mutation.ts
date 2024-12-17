import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateCreditsMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-credits"];

  const mutationFn = async ({ deepDiveCurrency, matchmakingCurrency }: { deepDiveCurrency: number, matchmakingCurrency: number }) =>
    await patch<Response<void>>({
      url: `organizations/${organizationId}/credits`,
      body: { deepDiveCurrency, matchmakingCurrency },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organization"],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateCreditsMutation;