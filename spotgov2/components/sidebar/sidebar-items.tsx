"use client";

import {
  KanbanSquare,
  LucideIcon,
  MessageCircleMore,
  Star,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
};

const SidebarItems = () => {
  const pathname = usePathname();

  const items: SidebarItem[] = [
    {
      icon: MessageCircleMore,
      label: "Nova pesquisa",
      href: "/nova-pesquisa",
      isActive: pathname === "/nova-pesquisa",
    },
    {
      icon: Star,
      label: "Pesquisas favoritas",
      href: "/pesquisas-favoritas",
      isActive: pathname === "/pesquisas-favoritas",
    },
    {
      icon: KanbanSquare,
      label: "Pipeline",
      href: "/pipeline",
      isActive: pathname === "/pipeline",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-xl hover:text-primary",
                  item.isActive && "bg-background border"
                )}
              >
                <span>
                  <item.icon size={16} />
                </span>
                <p>{item.label}</p>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarItems;
