import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { patch } from "@/utils/api/functions";

function updateFeatureStateMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-feature-state"];

  const mutationFn = async ({ featureDeepdive, featureMarketintel, featureNews, featureEvents }: { featureDeepdive: boolean, featureMarketintel: boolean, featureNews: boolean, featureEvents: boolean }) =>
    await patch<Response<void>>({
      url: `organizations/${organizationId}/features`,
      body: { featureDeepdive, featureMarketintel, featureNews, featureEvents },
    });

  const onSuccess = async () =>
    await queryClient.invalidateQueries({
      queryKey: ["get-organization"],
    });

  return { mutationKey, mutationFn, onSuccess };
}

export default updateFeatureStateMutation;

