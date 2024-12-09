"use client";

import queriesQuery from "@/queries/queries-query";
import { useQuery } from "@tanstack/react-query";
import SearchCard from "./search-card";

function PreviousSearches({ organizationId }) {
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
            createdAt={query.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviousSearches;
