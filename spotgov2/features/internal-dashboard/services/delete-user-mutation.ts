import { getQueryClient } from "@/lib/react-query/client";
import { Response } from "@/types";
import { del } from "@/utils/api/functions";
import { toast } from "sonner";

function deleteUserMutation(userId: string) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-user"];

  const mutationFn = async () =>
    await del<Response<void>>({
      url: `users/${userId}`,
    });

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-all-users"],
    });
    toast.success("User deleted successfully");
  };

  return { mutationKey, mutationFn, onSuccess };
}

export default deleteUserMutation;
