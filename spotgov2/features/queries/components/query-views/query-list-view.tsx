"use client";

import { Contract } from "@/database/schemas";
import ContractCard from "../contract-card";
import { ContractQuery } from "@/database/schemas/contracts-queries";

function QueryListView({
  filteredContracts,
}: {
  filteredContracts: (Contract & Partial<ContractQuery>)[];
}) {
  return (
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
          matchTypeFull: contract.matchTypeFull || null,
          reason: contract.reason ? JSON.stringify(contract.reason) : "",
        };

        return <ContractCard key={contract.id} {...contractProps} />;
      })}
    </div>
  );
}

export default QueryListView;
