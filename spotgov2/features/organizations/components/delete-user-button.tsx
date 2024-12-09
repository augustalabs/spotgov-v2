import { Button } from "@/components/ui/button";
import deleteUserMutation from "@/mutations/delete-user-mutation";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    deleteUserMutation(currentOrganization?.organizationId as string)
  );

  const handleDelete = async () => {
    try {
      const res = await mutation.mutateAsync({ userId });

      if (res.success) {
        toast.success("Utilizador removido com sucesso.");
      } else {
        toast.error(
          "Ocorreu um erro ao remover o utilizador. Por favor, tente novamente."
        );
      }
    } catch {
      toast.error(
        "Ocorreu um erro ao remover o utilizador. Por favor, tente novamente."
      );
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Remover
    </Button>
  );
};

export default DeleteUserButton;
