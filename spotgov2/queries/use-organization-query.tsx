import { fetchUserOrganizations } from "@/features/organizations/actions";
import useSupabase from "../hooks/use-supabase";
import { useQuery } from "@tanstack/react-query";

function useOrganizationQuery(userId: string) {
  const client = useSupabase();
  const queryKey = ["get-user-organizations"];

  const queryFn = async () => fetchUserOrganizations(client, userId);

  return useQuery({ queryKey, queryFn });
}

export default useOrganizationQuery;
