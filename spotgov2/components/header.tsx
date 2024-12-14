"use client";

import { SidebarTrigger, useSidebar } from "./ui/sidebar";

const Header = ({ title }: { title: string }) => {
  const sidebar = useSidebar();

  return (
    <div className="flex items-center">
      {!sidebar.open && <SidebarTrigger />}
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
    </div>
  );
};

export default Header;
