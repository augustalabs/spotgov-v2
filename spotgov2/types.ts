import { Organization, UserOrganization } from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};
