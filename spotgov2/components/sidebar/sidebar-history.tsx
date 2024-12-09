"use client";

import { useQuery } from "@tanstack/react-query";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import queriesQuery from "@/queries/queries-query";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { Skeleton } from "../ui/skeleton";
import SidebarHistoryActions from "./sidebar-history-actions";
import Link from "next/link";

const SidebarHistory = () => {
  const { currentOrganization } = useCurrentOrganizationStore();

  const { data, isPending } = useQuery(
    queriesQuery(currentOrganization?.organizationId as string)
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>Histórico de Pesquisas</SidebarGroupLabel>
        <SidebarMenu className="px-2 ">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <Skeleton className="w-full h-4" />
                </SidebarMenuItem>
              ))
            : data?.payload?.map((q) => (
                <SidebarMenuItem
                  key={q.id}
                  className="flex items-center justify-between"
                >
                  <Link className="hover:text-primary cursor-pointer" href="">
                    {q.title}
                  </Link>
                  <SidebarHistoryActions query={q} />
                </SidebarMenuItem>
              ))}
          {!isPending && !data?.success && (
            <SidebarMenuItem>Sem pesquisas realizadas.</SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarHistory;
