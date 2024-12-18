import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import Footer from "./footer";
import Main from "./main";
import OrganizationSwitcher from "./organization-switcher";

const NewSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <Separator />
      <SidebarContent>
        <Main />
      </SidebarContent>
      <Separator />
      <div className="p-2">
        <OrganizationSwitcher />
      </div>
      <Separator />
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default NewSidebar;
