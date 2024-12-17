import { useQuery } from "@tanstack/react-query";
import { getQueryContracts } from "@/features/queries/api";
import { OrderType, PriceRange, RelevanceType } from "@/types";
import { DateRange } from "react-day-picker";
import { filterAndSortContracts } from "../utils";

interface UseContractsParams {
  queryId: string;
  filters: {
    relevance: RelevanceType;
    order: OrderType;
    dateRange: DateRange | undefined;
    priceRange: PriceRange;
    selectedAdjudicatingEntities: string[];
    selectedCPVs: string[];
  };
}
export const useContracts = ({ queryId, filters }: UseContractsParams) => {
  const {
    data: contractsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contracts", queryId],
    queryFn: async () => await getQueryContracts({ queryId }),
    enabled: !!queryId,
  });

  // Convert dates to ISO strings and stringify "reason"
  const normalizedContracts = contractsData
    ? contractsData.map((contract) => ({
        id: contract.id,
        title: contract.title,
        issuerName: contract.issuerName,
        cpvs: contract.cpvs,
        basePrice: contract.basePrice,
        executionLocation: contract.executionLocation,
        reason: contract.reason ? JSON.stringify(contract.reason) : null,
        matchTypeFull: contract.matchTypeFull,
        publishDate: contract.publishDate
          ? new Date(contract.publishDate).toISOString()
          : null,
        submissionDeadlineDate: contract.submissionDeadlineDate
          ? new Date(contract.submissionDeadlineDate).toISOString()
          : null,
      }))
    : [];

  // Filter and sort contracts
  const filteredContracts = filterAndSortContracts(
    normalizedContracts,
    filters,
  );

  // Extract unique issuer names
  const uniqueIssuerNames = contractsData
    ? Array.from(
        new Set(contractsData.map((c) => c.issuerName).filter(Boolean)),
      )
    : [];

  // Extract unique CPVs
  const uniqueCPVs = contractsData
    ? Array.from(new Set(contractsData.flatMap((c) => c.cpvs).filter(Boolean)))
    : [];

  return {
    filteredContracts,
    uniqueIssuerNames,
    uniqueCPVs,
    isLoading,
    isError,
  };
};
