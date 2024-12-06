import { Organization, UserOrganization } from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

export type Response<T> = {
  success: boolean;
  status: number;
  payload?: T;
  error?: string;
};
