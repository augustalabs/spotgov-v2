import { OrganizationWithUserInfo, Response } from "@/types";

function organizationsQuery() {
  const queryKey = ["get-organizations"];

  const queryFn = async () => {
    const response = await fetch("/api/organizations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // TODO: We should have authorization and accept
      },
    });

    const data: Response<OrganizationWithUserInfo[]> = await response.json();

    return data;
  };

  return { queryKey, queryFn };
}

export default organizationsQuery;
