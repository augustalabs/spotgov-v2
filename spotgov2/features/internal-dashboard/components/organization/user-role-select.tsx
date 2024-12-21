import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoles } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updateUserRoleMutation } from "@/features/organizations/services";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userRole: UserRoles;
  userId: string;
  organizationId: string;
}

const UserRoleSelect = ({
  userRole,
  userId,
  organizationId,
}: UserRoleSelectProps) => {
  const updateUserRoleMutationResult = useMutation(
    updateUserRoleMutation(organizationId, userId),
  );

  const handleUpdateUserRole = async (role: UserRoles) => {
    const res = await updateUserRoleMutationResult.mutateAsync({ role });
    if (res.success) {
      toast.success("User role updated successfully");
    } else {
      toast.error("Failed to update user role. Please try again.");
    }
  };

  return (
    <Select defaultValue={userRole} onValueChange={handleUpdateUserRole}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UserRoles.Owner}>{UserRoles.Owner}</SelectItem>
        <SelectItem value={UserRoles.Admin}>{UserRoles.Admin}</SelectItem>
        <SelectItem value={UserRoles.Editor}>{UserRoles.Editor}</SelectItem>
        <SelectItem value={UserRoles.Viewer}>{UserRoles.Viewer}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserRoleSelect;
