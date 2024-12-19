import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
      className="flex items-center gap-2 hover:bg-transparent active:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex w-full items-center justify-between gap-2 truncate">
        <div className="flex items-center gap-2">
          <Link
            href={SEARCH_ROUTE.url}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={LogoIcon.src} alt="SpotGov logo" />
              <AvatarFallback className="bg-transparent">
                <Image
                  src={LogoIcon.src}
                  width={32}
                  height={32}
                  alt="SpotGov logo"
                />
              </AvatarFallback>
            </Avatar>
            <Image src={LogoText} alt="SpotGov" height={18} className="mt-1" />
          </Link>
          <div className="bg-primary/10 rounded-lg border border-primary px-1 py-0.5 text-xs text-primary">
            <p>Beta</p>
          </div>
        </div>
        <SidebarTrigger className="" />
      </div>
    </SidebarMenuButton>
  );
};

export default Header;
