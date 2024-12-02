"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Organization } from "@/database/schemas";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import organizationsQuery from "@/queries/organizations-query";

type OrganizationSwitcherProps = {
  userId: string;
};

const OrganizationSwitcher = ({ userId }: OrganizationSwitcherProps) => {
  const { data, error } = useQuery(organizationsQuery(userId));

  if (error) {
    // TODO: handle errors
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: Handle org state
  const [currentOrganization, setCurrentOrganization] = useState(
    data?.[0]?.organization
  );

  const handleSelection = (organization: Organization) => {
    // TODO: handle this correctly
    setCurrentOrganization(organization);
    setIsOpen(false);
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
          <p>{currentOrganization?.name}</p>
          <ChevronsUpDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandGroup heading="Organizações">
              {data?.map((v) => (
                <CommandItem
                  key={v.organizationId}
                  onSelect={() => handleSelection(v.organization!)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <p>{v.organization?.name}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      v.organizationId === currentOrganization?.id &&
                        "opacity-100"
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
