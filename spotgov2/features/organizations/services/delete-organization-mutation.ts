import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/functions";
import { toast } from "sonner";

function deleteOrganizationMutation(organizationId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-organization"];

  const mutationFn = async () =>
    await del<Response<void>>({
      url: `organizations/${organizationId}`,
    });

  return { mutationKey, mutationFn };
}

export default deleteOrganizationMutation;
