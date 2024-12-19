import { SidebarSchema } from "@/lib/i18n/types";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import OrganizationSwitcher from "./organization-switcher";
import * as z from "zod";

type CustomSidebarProps = {
  sidebar: z.infer<typeof SidebarSchema>;
};

const CustomSidebar = ({ sidebar }: CustomSidebarProps) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <Main sidebarItems={sidebar.sidebarItems} />
      </SidebarContent>
      <Separator />
      <div className="p-2">
        <OrganizationSwitcher props={sidebar.organizationSwitcher} />
      </div>
      <Separator />
      <SidebarFooter>
        <Footer userButton={sidebar.userButton} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default CustomSidebar;
