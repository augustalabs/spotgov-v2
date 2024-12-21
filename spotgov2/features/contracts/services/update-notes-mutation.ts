import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del, patch } from "@/utils/api/functions";
import { toast } from "sonner";

function updateNotesMutation(
  contractId: string,
  organizationId: string,
  notes: string,
) {
  const mutationKey = ["update-notes"];

  const mutationFn = async () =>
    await patch<Response<void>>({
      url: `organizations/${organizationId}/${contractId}/notes`,
      body: { notes },
    });

  return { mutationKey, mutationFn };
}

export default updateNotesMutation;
