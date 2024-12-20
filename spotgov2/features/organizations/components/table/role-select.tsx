"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserRoles } from "@/types";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { updateUserRoleMutation } from "@/features/organizations/services";
import { toast } from "sonner";
import { canRoleBeChanged } from "@/permissions";
import { useTranslations } from "next-intl";

type UserRoleSelectProps = {
  organizationId: string;
  userId: string;
  initialRole: UserRoles;
};

export function RoleSelect({
  initialRole,
  organizationId,
  userId,
}: UserRoleSelectProps) {
  const filterOptionsTranslation = useTranslations(
    "organization.table.filter.options",
  );
  const toastTranslation = useTranslations("organization.toasts");

  const mapUserRolesLocale = {
    todos: filterOptionsTranslation("all"),
    owner: filterOptionsTranslation("owner"),
    admin: filterOptionsTranslation("admin"),
    editor: filterOptionsTranslation("editor"),
    viewer: filterOptionsTranslation("viewer"),
  };

  const [role, setRole] = useState<UserRoles>(initialRole);

  const mutation = useMutation(updateUserRoleMutation(organizationId, userId));

  const handleRoleChange = async (newRole: UserRoles) => {
    try {
      // Optimistic update
      setRole(newRole);

      const res = await mutation.mutateAsync({ role: newRole });

      if (res.success) {
        toast.success(toastTranslation("success.roleChange"));
      } else {
        toast.error(toastTranslation("error.roleChangeFailed"));
      }
    } catch {
      toast.error(toastTranslation("error.roleChangeFailed"));
    }
  };

  const filteredRoles = Object.values(UserRoles).filter((role) =>
    canRoleBeChanged(role),
  );

  return (
    <Select value={role} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={mapUserRolesLocale[role]} />
      </SelectTrigger>
      <SelectContent>
        {filteredRoles.map((roleOption) => (
          <SelectItem
            key={roleOption}
            value={roleOption}
            className={cn(
              "hover:bg-background",
              role === roleOption && "text-primary",
            )}
          >
            {mapUserRolesLocale[roleOption]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
