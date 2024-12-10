import { Contract, Organization, UserOrganization } from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

export type ContractWithMatchTypeAndReason = Contract & {
  matchTypeFull: boolean | null;
  saved: boolean | null;
  queryTitle: string | null;
  queryId: string | null;
  reason: unknown;
};

export type ContractsWithMatchTypeAndReasonPerQuery = {
  [queryId: string]: {
    contracts: ContractWithMatchTypeAndReason[];
  };
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  payload?: T;
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
