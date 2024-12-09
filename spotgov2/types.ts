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
  Owner = "owner",
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export const mapUserRolesToPortuguese = {
  todos: "Todos",
  owner: "Proprietário",
  admin: "Administrador",
  editor: "Editor",
  viewer: "Visualizador",
};

// Filters
export type RelevanceType = "all" | "relevant" | "very-relevant";
export type OrderType =
  | "publish-date-desc"
  | "publish-date-asc"
  | "base-price-desc"
  | "base-price-asc"
  | "deadline-asc"
  | "deadline-desc";
