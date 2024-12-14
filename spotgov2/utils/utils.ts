import { OrderType, PriceRange, RelevanceType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

import { differenceInDays, isToday, format } from "date-fns";
import { pt } from "date-fns/locale";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | undefined): string {
  if (!name) return "";
  return name.split(" ")[0];
}

export function generateInviteToken(organizationId: string, email: string) {
  const payload = {
    organizationId,
    email,
  };

  // TODO: decide the expiry time
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export const formatDate = (date: string | number | Date) => {
  if (!date) return "Data inválida";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Data inválida";

  const now = new Date();
  const seconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

  const intervals = [
    { label: "ano", seconds: 31536000 },
    { label: "mês", seconds: 2592000 },
    { label: "dia", seconds: 86400 },
    { label: "hora", seconds: 3600 },
    { label: "minuto", seconds: 60 },
    { label: "segundo", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      const pluralizedLabel = count > 1 ? `${interval.label}s` : interval.label;
      return `Há ${count} ${pluralizedLabel}`;
    }
  }

  return "Agora";
};

export const filterAndSortContracts = (
  contracts: {
    issuerName?: string;
    publishDate?: string;
    basePrice?: string;
    cpvs?: string[];
    submissionDeadlineDate?: string;
    matchTypeFull?: boolean;
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

export const formatDate2 = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });
};

export const getRemainingDaysColor = (date: string) => {
  const remainingDays = differenceInDays(new Date(date), new Date());

  if (remainingDays < 3) return "bg-red-500";
  if (remainingDays < 7) return "bg-yellow-500";
  return "bg-green-500";
};
