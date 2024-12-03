import { Query } from "@/database/schemas";
import { Response } from "@/types";

function queriesQuery(organizationId: string) {
  const queryKey = ["get-queries", organizationId];

  const queryFn = async () => {
    const response = await fetch(`/api/queries/${organizationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // TODO: We should have authorization and accept
      },
    });

    const data: Response<Query[]> = await response.json();

    return data;
  };

  const enabled = !!organizationId;

  return { queryKey, queryFn, enabled };
}

export default queriesQuery;
