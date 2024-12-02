import { fetchUserOrganizations } from "@/features/organizations/actions";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import SidebarHistory from "./sidebar-history";
import SidebarItems from "./sidebar-items";
import { getQueryClient } from "@/lib/react-query/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CustomSidebar = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get-user-organizations"],
    queryFn: () =>
      fetchUserOrganizations("aa2cbf21-f037-4d40-a8a5-538933a3d2d0"),
  });

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarItems />
        <SidebarHistory />
      </SidebarContent>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarFooter />
      </HydrationBoundary>
    </Sidebar>
  );
};

export default CustomSidebar;
