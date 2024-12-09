import { Organization, User, UserOrganization } from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

export type UserWithOrganizationInfo = UserOrganization & {
  user: User | null;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  payload?: T;
};

export enum UserRoles {
  Admin = "admin",
  Member = "member",
  Viewer = "viewer",
}

export const mapUserRolesToPortuguese = {
  todos: "Todos",
  admin: "Administrador",
  member: "Membro",
  viewer: "Visualizador",
};
