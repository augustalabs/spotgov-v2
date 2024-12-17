import { useState } from "react";
import { OrderType, PriceRange, RelevanceType } from "@/types";
import { DateRange } from "react-day-picker";

export interface FiltersState {
  relevance: RelevanceType;
  order: OrderType;
  dateRange: DateRange | undefined;
  priceRange: PriceRange;
  selectedAdjudicatingEntities: string[];
  selectedCPVs: string[];
}

export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersState>({
    relevance: "all",
    order: "publish-date-desc",
    dateRange: undefined,
    priceRange: [0, 100000000],
    selectedAdjudicatingEntities: [],
    selectedCPVs: [],
  });

  const setFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilter };
};
