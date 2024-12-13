"use client";

import { getQueryById, getQueryContracts } from "@/features/queries/api";
import ContractCard from "@/features/queries/components/contract-card";
import QueryFilters from "@/features/queries/components/query-filters";
import { OrderType, RelevanceType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function QueryPage() {
  let { queryId } = useParams();

  // queryId = queryId[0] if queryId is an array, otherwise queryId is a string
  queryId = (typeof queryId === "string" ? queryId : queryId?.[0]) || "";

  // Filters
  const [relevance, setRelevance] = useState<RelevanceType>("all");
  const [order, setOrder] = useState<OrderType>("publish-date-desc");

  // Fetch query
  const { data: query } = useQuery({
    queryKey: ["query", queryId],
    queryFn: async () => await getQueryById({ queryId }),
    enabled: !!queryId,
  });

  // TODO (?): Create getQueriesContracts and pass queryId directly from params

  // Fetch contracts for the query
  const { data: contracts } = useQuery({
    queryKey: ["contracts", queryId],
    queryFn: async () => await getQueryContracts({ queryId }),
    enabled: !!queryId,
  });

  // Filtered (and sorted) contracts
  const filteredContracts = contracts
    ? [...contracts]
        // Filter by relevance
        .filter((contract) => {
          if (relevance === "all") return true;
          if (relevance === "very-relevant")
            return contract.matchTypeFull === true;
          if (relevance === "relevant") return contract.matchTypeFull === false;
          return true;
        })

        // Sort by order
        .sort((a, b) => {
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

          if (order === "publish-date-desc") {
            // Most recent first
            return dateB - dateA;
          } else if (order === "publish-date-asc") {
            // Oldest first
            return dateA - dateB;
          } else if (order === "base-price-desc") {
            // Highest price first
            return priceB - priceA;
          } else if (order === "base-price-asc") {
            // Lowest price first
            return priceA - priceB;
          } else if (order === "deadline-asc") {
            // Soonest deadline first
            return deadlineA - deadlineB;
          } else if (order === "deadline-desc") {
            // Furthest deadline first
            return deadlineB - deadlineA;
          }

          return 0;
        })
    : [];

  return (
    <div className="m-10">
      <h1>{query?.title}</h1>
      <QueryFilters setOrder={setOrder} setRelevance={setRelevance} />
      <div className="flex flex-col gap-5">
        {filteredContracts?.map((contract) => {
          const contractProps = {
            title: contract.title ?? "",
            issuerName: contract.issuerName || "",
            submissionDeadlineDate: contract.submissionDeadlineDate
              ? new Date(contract.submissionDeadlineDate).toISOString()
              : "",
            basePrice: contract.basePrice || "",
            location: contract.executionLocation || "",
            publishDate: contract.publishDate
              ? new Date(contract.publishDate).toISOString()
              : "",
            matchTypeFull: contract.matchTypeFull,
            reason: contract.reason ? JSON.stringify(contract.reason) : "",
          };

          return <ContractCard key={contract.id} {...contractProps} />;
        })}
      </div>
    </div>
  );
}
