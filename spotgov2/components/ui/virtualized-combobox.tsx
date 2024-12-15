"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";

export function VirtualizedCombobox({
  items,
  label,
  emptyLabel,
  popover: { width = "200px", align = "center" } = {},
  onSelectedChange,
  initiallySelected = false,
}: {
  items: { value: string; label: string }[];
  label: React.ReactNode;
  emptyLabel: React.ReactNode;
  popover?: { width?: string; align?: "start" | "center" | "end" };
  onSelectedChange?: (values: string[]) => void;
  initiallySelected?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  // Ref to ensure initial values are only set once
  const isInitialized = React.useRef(false);

  React.useEffect(() => {
    if (initiallySelected && items.length > 0 && !isInitialized.current) {
      const allValues = items.map((item) => item.value);
      setSelectedValues(allValues);

      if (onSelectedChange) {
        onSelectedChange(allValues);
      }
      isInitialized.current = true;
    }
  }, [items, initiallySelected, onSelectedChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="flex w-full items-center justify-between">
            <span>{label}</span>
            {selectedValues.length > 0 && (
              <span className="ml-2 flex aspect-square h-5 w-5 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-[0.7rem] text-primary">
                {selectedValues.length}
              </span>
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align={align} style={{ width }}>
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    const updatedValues = selectedValues.includes(item.value)
                      ? selectedValues.filter((value) => value !== item.value)
                      : [...selectedValues, item.value];

                    setSelectedValues(updatedValues);

                    if (onSelectedChange) {
                      onSelectedChange(updatedValues);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
