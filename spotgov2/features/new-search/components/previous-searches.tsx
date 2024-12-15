"use client";

import { useQuery } from "@tanstack/react-query";
import SearchCard from "./search-card";
import queriesQuery from "@/services/queries-query";

function PreviousSearches({ organizationId }: { organizationId: string }) {
  const { data: queries, isPending } = useQuery(
    queriesQuery(organizationId as string),
  );

  console.log(queries?.payload);

  return (
    <div className="mt-8 flex w-full flex-col items-start justify-start gap-4">
      <h1 className="text-md">
        Pesquisas Anteriores ({queries?.payload?.length})
      </h1>
      <div className="flex w-full flex-col items-start justify-start gap-2">
        {queries?.payload?.map((query) => (
          <SearchCard
            key={query.id}
            title={query.title ?? ""}
            starred={query.starred ?? false}
            createdAt={
              query.createdAt ? new Date(query.createdAt).toISOString() : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PreviousSearches;
