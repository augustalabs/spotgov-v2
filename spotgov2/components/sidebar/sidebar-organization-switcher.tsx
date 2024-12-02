"use client";

import { fetchUserOrganizations } from "@/features/organizations/actions";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

const SidebarOrganizationSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useUser();

  const { data, error, isPending } = useQuery({
    queryKey: ["get-user-organizations"],
    queryFn: () =>
      // TODO: Change to api call
      fetchUserOrganizations(user?.id as string),
  });

  const [currentOrganization, setCurrentOrganization] = useState<
    string | undefined
  >(data?.[0].organization?.name);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className="flex justify-between items-center"
        >
          <p className="truncate">{data?.[0].organization?.name}</p>
          <ChevronsUpDown size={16} className="mr-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Procurar organização..." />
            <CommandEmpty>Náo foram encontradas organizaçöes</CommandEmpty>
            <CommandGroup>
              {data?.map((org) => (
                <CommandItem
                  key={org.organizationId}
                  onSelect={() =>
                    setCurrentOrganization(org.organization?.name)
                  }
                  className={cn(
                    currentOrganization === org.organization?.name &&
                      "text-primary"
                  )}
                >
                  <p className="truncate">{org.organization?.name}</p>
                  <Check
                    size={16}
                    className={cn(
                      "ml-auto",
                      currentOrganization === org.organization?.name
                        ? "opacity-100"
                        : "opacity-0"
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

export default SidebarOrganizationSwitcher;
