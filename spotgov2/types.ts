import {
  Contract,
  FeedCustomField,
  Organization,
  User,
  UserOrganization,
  ContractsOrganization,
  FeedCustomFieldValue,
} from "@/database/schemas";

export type OrganizationWithUserInfo = UserOrganization & {
  organization: Organization | null;
};

export type UserWithOrganizationInfo = UserOrganization & {
  user: User | null;
};

export type FeedCustomFieldWithValues = Record<
  string,
  {
    feedCustomFields: FeedCustomField;
    feedCustomFieldsValues: FeedCustomFieldValue[];
  }
>;

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

// Filters
export type RelevanceType = "all" | "relevant" | "very-relevant";
export type OrderType =
  | "publish-date-desc"
  | "publish-date-asc"
  | "base-price-desc"
  | "base-price-asc"
  | "deadline-asc"
  | "deadline-desc";
export type PriceRange = [number, number];

// Contract Details
export type JoinedContractInOrganization = Contract & {
  contractsOrganization: ContractsOrganization | null;
};

export interface Subfactor {
  Nome: string;
  Ponderação: string;
}

export interface AwardCriteria {
  Nome: string;
  Ponderação: string;
  Subfatores?: Subfactor[];
}

export interface Document {
  isProgramaDoConcurso: boolean;
  isCadernoDeEncargos: boolean;
  type: string;
  size: number;
  fullPath: string;
  downloadUrl: string;
  name: string;
}

export interface Lot {
  id: string;
  contractId: string;
  lotNumber: string;
  description: string;
  basePrice: string;
  cpvs: string[];
}

export interface ContractDetailsProps {
  contractId: string;
  linkDr: string;
  linkDelivery: string;
  summary: string;
  executionDeadlineDays: number;
  awardCriteria: AwardCriteria[];
  renews: boolean;
  maxLots: number;
  maxLotsPerContestant: number;
}

export interface ReviewBodyInfo {
  phone?: string;
  locality?: string;
  fax?: string;
  designation?: string;
  address?: string;
  emailAddress?: string;
  postalCode?: string;
}

export interface IssuerInfo {
  urlAddress?: string;
  municipality?: string;
  nutIII?: string;
  parish?: string;
  contactOrgan?: string;
  postalCode?: string;
  district?: string;
  nipc?: string;
  phone?: string;
  locality?: string;
  country?: string;
  fax?: string;
  adjudicatingEntityDesignation?: string;
  address?: string;
  emailAddress?: string;
}

export interface ContractIssuerInfoProps {
  reviewBodyInfo: ReviewBodyInfo;
  issuerInfo: IssuerInfo;
}
