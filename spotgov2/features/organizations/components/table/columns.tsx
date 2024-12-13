import AvatarIcon from "@/components/avatar-icon";
import { mapUserRolesToPortuguese, UserWithOrganizationInfo } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { RoleSelect } from "./role-select";
import DeleteUserButton from "./delete-user-button";
import { ArrowDownUp } from "lucide-react";
import { canBeRemoved, canRoleBeChanged } from "../../permissions";

export const columns: ColumnDef<UserWithOrganizationInfo>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Nome
          <ArrowDownUp size={16} />
        </button>
      );
    },
    cell: ({ row }) => {
      const { user } = row.original;

      return (
        <div className="flex items-center gap-2">
          {user?.avatarUrl ? (
            <Image
              alt="profile icon"
              className="rounded-full object-cover"
              src={user?.avatarUrl}
              width={32}
              height={32}
            />
          ) : (
            <AvatarIcon size={32} />
          )}
          <div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Cargo
          <ArrowDownUp size={16} />
        </button>
      );
    },
    cell: ({ row }) => {
      const { role, organizationId, userId } = row.original;

      if (!canRoleBeChanged(role)) {
        return <p>{mapUserRolesToPortuguese[role]}</p>;
      }

      return (
        <RoleSelect
          initialRole={role}
          organizationId={organizationId as string}
          userId={userId as string}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { userId, role } = row.original;

      if (!canBeRemoved(role)) return null;

      return <DeleteUserButton userId={userId as string} />;
    },
  },
];
