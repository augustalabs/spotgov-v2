"use client";

import Image from "next/image";
import {
  SidebarHeader as Header,
  SidebarGroup,
  SidebarGroupContent,
} from "../ui/sidebar";

import logo from "@/public/assets/logo.png";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetchUserOrganizations } from "@/features/organizations/api";

const SidebarHeader = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-user-organizations"],
    queryFn: () =>
      fetchUserOrganizations("aa2cbf21-f037-4d40-a8a5-538933a3d2d0"),
  });

  return (
    <Header>
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image alt="SpotGov logo" src={logo} width={110} />
            </Link>
            <div className="px-1.5 py-1 border border-primary bg-primary/10 text-primary rounded-lg text-xs">
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
