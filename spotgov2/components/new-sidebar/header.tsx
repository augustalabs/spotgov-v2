import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarTrigger } from "../ui/sidebar";

import LogoIcon from "@/public/assets/images/logo-icon.png";
import LogoText from "@/public/assets/images/logo-text.png";
import Link from "next/link";
import { SEARCH_ROUTE } from "@/routes";

const Header = () => {
  return (
    <SidebarMenuButton
      asChild
      size="lg"
      className="flex items-center gap-2 hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex w-full items-center justify-between gap-2 truncate">
        <div className="flex items-center gap-2">
          <Link
            href={SEARCH_ROUTE.url}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={LogoIcon.src} alt="SpotGov logo" />
            </Avatar>
            <Image src={LogoText} alt="SpotGov" height={18} className="mt-1" />
          </Link>
          <div className="rounded-lg border border-primary bg-primary/10 px-1 py-0.5 text-xs text-primary">
            <p>Beta</p>
          </div>
        </div>
        <SidebarTrigger className="" />
      </div>
    </SidebarMenuButton>
  );
};

export default Header;
