"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Skeleton } from "../ui/skeleton";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { cn } from "@/utils/utils";
import { OrganizationWithUserInfo } from "@/types";
import organizationsQuery from "@/services/organizations-query";
import { createClient } from "@/lib/supabase/client";
import { SidebarMenuButton } from "../ui/sidebar";

const OrganizationSwitcher = () => {
  const supabase = createClient();

  const { data, isPending } = useQuery(organizationsQuery());

  const currentOrganizationStore = useCurrentOrganizationStore();

  useEffect(() => {
    async function initializeCurrentOrganization() {
      const { data: authData } = await supabase.auth.getUser();

      if (!currentOrganizationStore.currentOrganization) {
        if (authData.user?.user_metadata.current_organization) {
          currentOrganizationStore.setCurrentOrganization(
            authData.user?.user_metadata.current_organization,
            supabase.auth,
          );
        }

        if (data?.payload && data?.payload.length > 0) {
          currentOrganizationStore.setCurrentOrganization(
            data.payload[0],
            supabase.auth,
          );
        }
      }
    }

    initializeCurrentOrganization();
  }, []);

  // TODO: Check if this works properly in edge cases
  // This is necessary to sync the organization present in the store with the user metadata current organization
  // because when we update the organization name or nif the user metadata is updated but does not trigger a change
  // in the store.
  useEffect(() => {
    const storeOrganization =
      currentOrganizationStore.currentOrganization?.organization;
    const updatedOrganization = data?.payload?.find(
      (v) => v.organizationId === storeOrganization?.id,
    );

    if (
      (updatedOrganization &&
        storeOrganization?.name !== updatedOrganization?.organization?.name) ||
      storeOrganization?.nif !== updatedOrganization?.organization?.nif
    ) {
      currentOrganizationStore.setCurrentOrganization(
        updatedOrganization as OrganizationWithUserInfo,
        supabase.auth,
      );
    }

    if (data?.success && data.payload?.length && !updatedOrganization) {
      currentOrganizationStore.setCurrentOrganization(
        data.payload[0] as OrganizationWithUserInfo,
        supabase.auth,
      );
    }
  }, [data]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = async (organization: OrganizationWithUserInfo) => {
    currentOrganizationStore.setCurrentOrganization(
      organization,
      supabase.auth,
    );

    setIsOpen(false);
  };

  const isCurrentOrganization = (organization: OrganizationWithUserInfo) => {
    return (
      currentOrganizationStore.currentOrganization?.organizationId ===
      organization.organizationId
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          size="sm"
          role="combobox"
          className="flex items-center"
          tooltip="Trocar de organização"
        >
          <div className="flex w-full items-center justify-between gap-2 truncate">
            <GalleryVerticalEnd size={16} className="flex-shrink-0" />
            {isPending ? (
              <div className="w-full">
                <Skeleton className="h-2 w-full" />
              </div>
            ) : (
              <p className="truncate text-left text-sm">
                {
                  currentOrganizationStore.currentOrganization?.organization
                    ?.name
                }
              </p>
            )}
            <ChevronsUpDown size={16} className="ml-auto flex-shrink-0" />
          </div>
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent>
        <Command
          value={
            currentOrganizationStore.currentOrganization
              ?.organizationId as string
          }
        >
          <CommandList>
            <CommandGroup heading="Organizações">
              {data?.payload?.map((v) => (
                <CommandItem
                  key={v.organizationId}
                  value={v.organizationId as string}
                  onSelect={() => handleSelection(v)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between text-foreground hover:text-foreground/70 data-[selected='true']:bg-background",
                    isCurrentOrganization(v) &&
                      "text-primary hover:text-primary/70",
                  )}
                >
                  <p>{v.organization?.name}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      isCurrentOrganization(v) && "opacity-100",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationSwitcher;
