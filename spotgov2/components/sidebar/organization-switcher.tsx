"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Skeleton } from "../ui/skeleton";
import organizationsQuery from "@/queries/organizations-query";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

const OrganizationSwitcher = () => {
  const { user, isLoading, error } = useUser();

  if (error) redirect("/auth/login");

  const { data, isPending } = useQuery(
    organizationsQuery(user?.id as string, isLoading)
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            <p>{data?.[0].organization?.name}</p>
          )}
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
                  onSelect={() => {}}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <p>{v.organization?.name}</p>
                  <Check size={16} />
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
