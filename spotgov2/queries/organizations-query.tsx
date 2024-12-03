import { fetchUserOrganizations } from "@/features/organizations/actions";

function organizationsQuery(userId: string) {
  const queryKey = ["organizations", userId];

  const queryFn = async () => {
    const response = await fetchUserOrganizations(userId);
    return response;
  };

  const enabled = !!userId;

  return { queryKey, queryFn, enabled };
}

export default organizationsQuery;
