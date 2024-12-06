import { Button } from "@/components/ui/button";
import deleteUserMutation from "@/mutations/delete-user-mutation";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useMutation } from "@tanstack/react-query";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const mutation = useMutation(
    deleteUserMutation(currentOrganization?.organizationId as string)
  );

  const handleDelete = () => {
    mutation.mutate({ userId });
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Remover
    </Button>
  );
};

export default DeleteUserButton;
