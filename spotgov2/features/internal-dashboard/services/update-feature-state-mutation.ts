import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";
import { FeatureKey } from "../utils/feature-config";

function updateFeatureStateMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-feature-state"];

  const mutationFn = async ({
    featureKey,
    enabled,
  }: {
    featureKey: FeatureKey;
    enabled: boolean;
  }) =>
    await patch<Response<void>>({
      url: `organizations/${organizationId}/features`,
      body: { featureKey, enabled },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organization-features"],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateFeatureStateMutation;
