import { Contract } from "@/database/schemas";
import { DateRange } from "react-day-picker";

export type PaginatedContractsType = {
  contract: Contract;
  queryId: string;
  matchTypeFull: boolean | null;
  reason: unknown;
  saved: boolean | null;
  queryTitle: string | null;
  [key: string]: unknown;
};

export type BasePriceRange = {
  min: number;
  max: number;
};

export type FavoriteContractsDataType = {
  paginatedContracts: PaginatedContractsType[];
  totalCount: number;
  distinctAdjudicators: string[];
  distinctQueryTitles: string[];
  distinctCpvs: string[];
  basePriceRange: BasePriceRange;
  publishDateRange: DateRange;
};

export enum FieldType {
  Text = "text",
  Logic = "logic",
  Date = "date",
  Label = "label",
  File = "file",
}
