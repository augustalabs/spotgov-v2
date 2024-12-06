import AvatarIcon from "@/components/avatar-icon";
import { UserWithOrganizationInfo } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { RoleSelect } from "./role-select";

export const columns: ColumnDef<UserWithOrganizationInfo>[] = [
  {
    accessorKey: "user",
    header: "Nome",
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
    header: "Cargo",
    cell: ({ row }) => {
      const { role, organizationId, userId } = row.original;

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
  },
];
