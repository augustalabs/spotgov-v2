import { Organization, UserOrganization } from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  payload?: T;
};

// Filters
export type RelevanceType = "all" | "relevant" | "very-relevant";
export type OrderType = "publish-date-desc" | "publish-date-asc" | "base-price-desc" | "base-price-asc" | "deadline-asc" | "deadline-desc";
export type PriceRange = [number, number];