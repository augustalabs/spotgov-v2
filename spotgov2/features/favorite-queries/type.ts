import { Contract } from "@/database/schemas";

export type PaginatedContractsType = {
  contract: Contract;
  queryId: string;
  matchTypeFull: boolean | null;
  reason: unknown;
  saved: boolean | null;
  queryTitle: string | null;
};

export type FavoriteContractsDataType = {
  paginatedContracts: PaginatedContractsType[];
  totalCount: number;
  distinctAdjudicators: string[];
};
