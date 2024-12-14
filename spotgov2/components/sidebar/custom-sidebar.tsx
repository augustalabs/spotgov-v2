import { Sidebar, SidebarContent } from "../ui/sidebar";
import { getQueryClient } from "@/lib/react-query/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import SidebarHistory from "./sidebar-history";
import SidebarItems from "./sidebar-items";
import organizationsQuery from "@/services/organizations-query";

const CustomSidebar = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(organizationsQuery());

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
