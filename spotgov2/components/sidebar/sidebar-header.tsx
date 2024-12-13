import Image from "next/image";
import {
  SidebarHeader as Header,
  SidebarGroup,
  SidebarGroupContent,
} from "../ui/sidebar";

import logo from "@/public/assets/images/logo.png";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { HOME_ROUTE } from "@/routes";

const SidebarHeader = () => {
  return (
    <Header>
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex items-center gap-4">
            <Link href={HOME_ROUTE}>
              <Image alt="SpotGov logo" src={logo} width={110} />
            </Link>
            <div className="rounded-lg border border-primary bg-primary/10 px-1.5 py-1 text-xs text-primary">
              <p>Beta</p>
            </div>
          </div>
          <Separator className="mt-4" />
        </SidebarGroupContent>
      </SidebarGroup>
    </Header>
  );
};

export default SidebarHeader;
