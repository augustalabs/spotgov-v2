import { Sidebar, SidebarContent } from "../ui/sidebar";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import SidebarHistory from "./sidebar-history";
import SidebarItems from "./sidebar-items";

const CustomSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarItems />
        <SidebarHistory />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default CustomSidebar;
