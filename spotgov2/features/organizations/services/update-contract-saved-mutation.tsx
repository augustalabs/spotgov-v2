import { ContractsOrganization } from "@/database/schemas";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateContractSavedMutation(
  organizationId: string,
  contractId: string,
) {
  const mutationKey = ["update-saved-contract", organizationId, contractId];

  const mutationFn = async ({ saved }: { saved: boolean }) =>
    await patch<Response<ContractsOrganization>>({
      url: `organizations/${organizationId}/${contractId}`,
      body: {
        saved,
      },
    });

  return { mutationKey, mutationFn };
}

export default updateContractSavedMutation;
