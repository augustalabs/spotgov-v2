"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { mapUserRolesToPortuguese, UserRoles } from "@/types";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import updateUserRoleMutation from "@/mutations/update-user-role-mutation";

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
  const [role, setRole] = useState<UserRoles>(initialRole);

  const mutation = useMutation(updateUserRoleMutation(organizationId, userId));

  const handleRoleChange = (newRole: UserRoles) => {
    setRole(newRole);
    mutation.mutate({ role: newRole });
  };

  return (
    <Select value={role} onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={mapUserRolesToPortuguese[role]} />
      </SelectTrigger>
      <SelectContent>
        {Object.values(UserRoles).map((roleOption) => (
          <SelectItem
            key={roleOption}
            value={roleOption}
            className={cn(
              "hover:bg-background",
              role === roleOption && "text-primary"
            )}
          >
            {mapUserRolesToPortuguese[roleOption]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
