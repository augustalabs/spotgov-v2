import { ContractsOrganization } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateContractSavedMutation(
  organizationId: string,
  contractId: string,
) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-saved-contract", organizationId, contractId];

  const mutationFn = async ({ saved }: { saved: boolean }) =>
    await patch<Response<ContractsOrganization>>({
      url: `organizations/${organizationId}/${contractId}`,
      body: { saved },
    });

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-favorite-queries", organizationId],
    });
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default updateContractSavedMutation;
