import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";
import { toast } from "sonner";

function updateInfoAndCreditsMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-info-and-credits"];

  const mutationFn = async ({
    deepDiveCurrency,
    matchmakingCurrency,
    name,
    nif,
  }: {
    deepDiveCurrency: number;
    matchmakingCurrency: number;
    name: string;
    nif: string;
  }) =>
    await patch<Response<void>>({
      url: `organizations/${organizationId}/credits`,
      body: { deepDiveCurrency, matchmakingCurrency, name, nif },
    });

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-all-organizations"],
    });
    toast.success("Organization updated successfully");
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default updateInfoAndCreditsMutation;