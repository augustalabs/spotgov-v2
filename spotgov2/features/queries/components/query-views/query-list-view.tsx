"use client";

import { Contract } from "@/database/schemas";
import ContractCard from "../contract-card";
import { ContractQuery } from "@/database/schemas/contracts-queries";

function QueryListView({
  filteredContracts,
}: {
  filteredContracts: {
    id: string | null;
    title: string | null;
    issuerName: string | null;
    submissionDeadlineDate: string | null;
    basePrice: string | null;
    publishDate: string | null;
    matchTypeFull: boolean | null;
    reason: string | null;
    executionLocation: string | null;
  }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      {filteredContracts?.map((contract) => {
        const contractProps = {
          title: contract.title ?? "",
          issuerName: contract.issuerName || "",
          submissionDeadlineDate: contract.submissionDeadlineDate || "",
          basePrice: contract.basePrice || "",
          location: contract.executionLocation || "",
          publishDate: contract.publishDate || "",
          matchTypeFull: contract.matchTypeFull || null,
          reason: contract.reason || "",
        };

        return <ContractCard key={contract.id} {...contractProps} />;
      })}
    </div>
  );
}

export default QueryListView;
