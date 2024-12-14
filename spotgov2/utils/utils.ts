import { OrderType, PriceRange, RelevanceType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

export const filterAndSortContracts = (
  contracts: {
    issuerName?: string;
    publishDate?: string;
    basePrice?: string;
    cpvs?: string[];
    submissionDeadlineDate?: string;
    matchTypeFull?: boolean
  }[],
  filters: {
    relevance: RelevanceType;
    dateRange?: DateRange;
    priceRange: PriceRange;
    selectedAdjudicatingEntities: string[];
    selectedCPVs: string[];
    order: OrderType;
  }
) => {
  const {
    relevance,
    dateRange,
    priceRange,
    selectedAdjudicatingEntities,
    selectedCPVs,
    order,
  } = filters;

  return contracts
    .filter((contract) => {
      // Relevance filter
      if (relevance === "all") return true;
      if (relevance === "very-relevant") return contract.matchTypeFull === true;
      if (relevance === "relevant") return contract.matchTypeFull === false;
      return true;
    })
    .filter((contract) => {
      // Date range filter
      if (!dateRange || !dateRange.from) return true;
      const publishDate = contract.publishDate
        ? new Date(contract.publishDate)
        : null;
      if (!publishDate) return false;
      const fromDate = dateRange.from;
      const toDate = dateRange.to || fromDate;
      return publishDate >= fromDate && publishDate <= toDate;
    })
    .filter((contract) => {
      // Price range filter
      const basePrice = contract.basePrice
        ? parseFloat(contract.basePrice)
        : 0;
      return basePrice >= priceRange[0] && basePrice <= priceRange[1];
    })
    .filter((contract) => {
      // Adjudicating entity filter
      if (!selectedAdjudicatingEntities.length) return false;
      return selectedAdjudicatingEntities.includes(contract.issuerName || "");
    })
    .filter((contract) => {
      // CPV filter
      if (!selectedCPVs.length) return false;
      return contract.cpvs?.some((cpv) => selectedCPVs.includes(cpv));
    })
    .sort((a, b) => {
      // Sorting logic
      const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
      const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;

      const priceA = a.basePrice ? parseFloat(a.basePrice) : 0;
      const priceB = b.basePrice ? parseFloat(b.basePrice) : 0;

      const deadlineA = a.submissionDeadlineDate
        ? new Date(a.submissionDeadlineDate).getTime()
        : Infinity;
      const deadlineB = b.submissionDeadlineDate
        ? new Date(b.submissionDeadlineDate).getTime()
        : Infinity;

      if (order === "publish-date-desc") return dateB - dateA;
      if (order === "publish-date-asc") return dateA - dateB;
      if (order === "base-price-desc") return priceB - priceA;
      if (order === "base-price-asc") return priceA - priceB;
      if (order === "deadline-asc") return deadlineA - deadlineB;
      if (order === "deadline-desc") return deadlineB - deadlineA;

      return 0;
    });
};