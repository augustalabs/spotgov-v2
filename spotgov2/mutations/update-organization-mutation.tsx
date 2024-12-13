import { Organization } from "@/database/schemas";
import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/api";

function updateOrganizationMutation() {
  const queryClient = getQueryClient();
  const mutationKey = ["update-organization"];

  const mutationFn = async ({
    organizationId,
    name,
    nif,
  }: {
    organizationId: string;
    name: string;
    nif: string;
  }) =>
    await patch<Response<Organization[]>>({
      url: `organizations/${organizationId}`,
      body: {
        name,
        nif,
      },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organizations"],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateOrganizationMutation;
