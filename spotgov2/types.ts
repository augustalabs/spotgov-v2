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
  payload?: T;
  error?: string;
};

export enum UserRoles {
  Admin = "admin",
  Member = "member",
  Viewer = "viewer",
}
