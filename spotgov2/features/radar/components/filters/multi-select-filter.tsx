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
import { Check, ChevronDown, LucideIcon } from "lucide-react";

type MultiSelectFilterProps = {
  input: string[];
  setInput: (input: string[]) => void;
  defaultValues: string[];
  selectLabel: string;
  searchPlaceholder: string;
  noResultsMessage: string;
  selectIcon: LucideIcon;
  className?: string;
};

const MultiSelectFilter = ({
  input,
  setInput,
  defaultValues,
  selectLabel,
  searchPlaceholder,
  noResultsMessage,
  selectIcon: SelectIcon,
  className,
}: MultiSelectFilterProps) => {
  const onSelectionChange = (value: string) => {
    if (input.includes(value)) {
      setInput(input.filter((a) => a !== value));
    } else {
      setInput([...input, value]);
    }
  };

  const isSelected = (value: string) => input.includes(value.toLowerCase());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <SelectIcon size={16} />
          <p>{selectLabel}</p>
          <div className="bg-primary/10 rounded-md border border-primary px-1">
            {input.length}
          </div>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResultsMessage}</CommandEmpty>
            <CommandGroup>
              {defaultValues?.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={onSelectionChange}
                  className={cn(
                    "flex items-center justify-between data-[selected='true']:bg-background data-[selected=true]:text-foreground data-[selected='true']:hover:text-primary",
                    isSelected(value) &&
                      "text-primary data-[selected=true]:text-primary",
                  )}
                >
                  <p>{value}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      isSelected(value) && "opacity-100",
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

export default MultiSelectFilter;
