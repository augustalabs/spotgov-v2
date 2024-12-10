"use client";

import favoriteQueriesQuery from "@/queries/favorite-queries-query";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { useQuery } from "@tanstack/react-query";

const Wrapper = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data } = useQuery(
    favoriteQueriesQuery(currentOrganization?.organizationId as string),
  );

  console.log(data);

  return <div></div>;
};

export default Wrapper;
