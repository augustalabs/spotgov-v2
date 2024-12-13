"use client";

import {
  BarChart,
  Building,
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
import { cn } from "@/utils/utils";
import {
  FAVORITE_SEARCH_ROUTE,
  MARKET_INTELLIGENCE_ROUTE,
  NEW_SEARCH_ROUTE,
  ORGANIZATION_ROUTE,
  PIPELINE_ROUTE,
} from "@/routes";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { UserRoles } from "@/types";
import { canViewOrganization } from "@/features/organizations/permissions";

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
      href: NEW_SEARCH_ROUTE,
      isActive: pathname === NEW_SEARCH_ROUTE,
    },
    {
      icon: Star,
      label: "Pesquisas favoritas",
      href: FAVORITE_SEARCH_ROUTE,
      isActive: pathname === FAVORITE_SEARCH_ROUTE,
    },
    {
      icon: KanbanSquare,
      label: "Pipeline",
      href: PIPELINE_ROUTE,
      isActive: pathname === PIPELINE_ROUTE,
    },
    {
      icon: BarChart,
      label: "Market Intelligence",
      href: MARKET_INTELLIGENCE_ROUTE,
      isActive: pathname === MARKET_INTELLIGENCE_ROUTE,
    },
  ];

  const adminItem: SidebarItem = {
    icon: Building,
    label: "Organização",
    href: ORGANIZATION_ROUTE,
    isActive: pathname === ORGANIZATION_ROUTE,
  };

  const { currentOrganization } = useCurrentOrganizationStore();

  const userRole = currentOrganization?.role;

  if (canViewOrganization(userRole as UserRoles)) {
    items.push(adminItem);
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl border border-sidebar p-2 hover:text-primary",
                  item.isActive && "border border-border bg-background",
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
