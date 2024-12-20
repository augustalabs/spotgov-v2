"use client";

import { memo } from "react";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

interface HeaderProps {
  title: string;
  headerActions?: React.ReactNode;
}

const Header = ({ title, headerActions }: HeaderProps) => {
  const sidebar = useSidebar();

  return (
    <div className="mb-10 flex w-full items-center justify-between">
      {/* Left Section: Sidebar trigger (if sidebar is closed) and title */}
      <div className="flex items-center gap-2">
        {!sidebar.open && <SidebarTrigger />}
        <h1 className="text-xl font-medium text-foreground">{title}</h1>
      </div>

      {/* Right Section: Optional actions/content passed as props */}
      {headerActions && (
        <div className="flex items-center gap-2">{headerActions}</div>
      )}
    </div>
  );
};

export default memo(Header, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.headerActions === nextProps.headerActions
  );
});
