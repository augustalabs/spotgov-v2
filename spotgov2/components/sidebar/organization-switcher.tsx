"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Skeleton } from "../ui/skeleton";
import { useCurrentOrganizationStore } from "@/stores/current-organization-store";
import { cn } from "@/utils/utils";
import { OrganizationWithUserInfo } from "@/types";
import organizationsQuery from "@/queries/organizations-query";

const OrganizationSwitcher = () => {
  const { data, isPending } = useQuery(organizationsQuery());

  const currentOrganizationStore = useCurrentOrganizationStore();

  useEffect(() => {
    if (
      data?.payload &&
      data?.payload?.length > 0 &&
      !currentOrganizationStore.currentOrganization
    ) {
      currentOrganizationStore.setCurrentOrganization(data.payload[0]);
    }
  }, [data, currentOrganizationStore]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = (organization: OrganizationWithUserInfo) => {
    currentOrganizationStore.setCurrentOrganization(organization);
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
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className="flex items-center justify-between"
        >
          {isPending ? (
            <Skeleton className="w-2/3 h-2" />
          ) : (
            <p>
              {currentOrganizationStore.currentOrganization?.organization?.name}
            </p>
          )}
          <ChevronsUpDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup heading="Organizações">
              {data?.payload?.map((v) => (
                <CommandItem
                  key={v.organizationId}
                  onSelect={() => handleSelection(v)}
                  className={cn(
                    "flex items-center justify-between cursor-pointer text-foreground hover:text-foreground/70",
                    isCurrentOrganization(v) &&
                      "text-primary hover:text-primary/70"
                  )}
                >
                  <p>{v.organization?.name}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      isCurrentOrganization(v) && "opacity-100"
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
