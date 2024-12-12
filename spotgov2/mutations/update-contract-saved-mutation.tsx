import { ContractsOrganization } from "@/database/schemas";
import { Response } from "@/types";
import { patch } from "@/utils/api/api";

function updateContractSavedMutation(
  organizationId: string,
  contractId: string,
) {
  const mutationKey = ["update-saved-contract", organizationId, contractId];

  const mutationFn = async ({ saved }: { saved: boolean }) =>
    await patch<Response<ContractsOrganization>>(
      `organizations/${organizationId}/${contractId}`,
      {
        saved,
      },
    );

  return { mutationKey, mutationFn };
}

export default updateContractSavedMutation;
