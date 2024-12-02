import { fetchUserOrganizations } from "@/features/organizations/actions";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import SidebarHistory from "./sidebar-history";
import SidebarItems from "./sidebar-items";
import { getQueryClient } from "@/lib/react-query/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/server";

const CustomSidebar = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get-user-organizations"],
    queryFn: () => fetchUserOrganizations(data.user?.id as string),
  });

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarItems />
        <SidebarHistory />
      </SidebarContent>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarFooter userId={data.user?.id as string} />
      </HydrationBoundary>
    </Sidebar>
  );
};

export default CustomSidebar;
