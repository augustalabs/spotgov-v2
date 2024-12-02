"use client";

import { fetchUserOrganizations } from "@/features/organizations/actions";
import { useQuery } from "@tanstack/react-query";

const SidebarOrganizationSelection = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-user-organizations"],
    queryFn: () =>
      // TODO: Change to api call
      fetchUserOrganizations("aa2cbf21-f037-4d40-a8a5-538933a3d2d0"),
  });

  return <div></div>;
};

export default SidebarOrganizationSelection;
