"use client";

import {
  Bookmark,
  ChartSpline,
  ChevronRight,
  Compass,
  Eye,
  LucideIcon,
  Search,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  CONTESTS_RADAR_ROUTE,
  MARKET_INTELLIGENCE_ROUTE,
  PROPOSAL_REVIEW_ROUTE,
  SAVED_CONTESTS_ROUTE,
  SEARCH_ROUTE,
} from "@/routes";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/utils/utils";
import { useEffect, useState } from "react";

type SidebarItem = {
  title: string;
  isActive: boolean;
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
  }[];
};

const items: SidebarItem[] = [
  {
    title: "Deteção e análise",
    isActive: true,
    items: [
      {
        icon: Compass,
        title: CONTESTS_RADAR_ROUTE.label,
        url: CONTESTS_RADAR_ROUTE.url,
      },
      {
        icon: Search,
        title: SEARCH_ROUTE.label,
        url: SEARCH_ROUTE.url,
      },
    ],
  },
  {
    title: "Resposta e revisão",
    isActive: true,
    items: [
      {
        icon: Eye,
        title: PROPOSAL_REVIEW_ROUTE.label,
        url: PROPOSAL_REVIEW_ROUTE.url,
      },
    ],
  },
  {
    title: "Gestão",
    isActive: true,
    items: [
      {
        icon: Bookmark,
        title: SAVED_CONTESTS_ROUTE.label,
        url: SAVED_CONTESTS_ROUTE.url,
      },
    ],
  },
  {
    title: "Inteligência de mercado",
    isActive: true,
    items: [
      {
        icon: ChartSpline,
        title: MARKET_INTELLIGENCE_ROUTE.label,
        url: MARKET_INTELLIGENCE_ROUTE.url,
      },
    ],
  },
];

const Main = () => {
  const { open } = useSidebar();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) {
      // When sidebar closes, open all sections
      const allOpen = items.reduce(
        (acc, item) => {
          acc[item.title] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setOpenSections(allOpen);
    } else {
      // When sidebar opens, reset to initial state
      const initialState = items.reduce(
        (acc, item) => {
          acc[item.title] = item.isActive;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setOpenSections(initialState);
    }
  }, [open]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarMenu className={cn(open && "space-y-4")}>
        {items.map((item, index) => (
          <Collapsible
            open={openSections[item.title]}
            onOpenChange={() => toggleSection(item.title)}
            key={item.title}
            className={cn("group/collapsible", !open && "space-y-4")}
          >
            {open ? (
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex items-center px-2 text-xs font-medium uppercase text-muted-foreground">
                  <span>{item.title}</span>
                  <ChevronRight
                    size={16}
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            ) : (
              index != 0 && <Separator />
            )}
            <CollapsibleContent className="mt-1 space-y-1">
              {item.items.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton tooltip={subItem.title} asChild>
                    <Link href={subItem.url}>
                      <subItem.icon size={16} />
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default Main;
