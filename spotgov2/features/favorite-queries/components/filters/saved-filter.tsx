import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { cn } from "@/utils/utils";
import { Bookmark, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

type DefaultValuesProps = {
  label: string;
  value: string;
};

const DEFAULT_VALUES: DefaultValuesProps[] = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Guardados",
    value: "saved",
  },
  {
    label: "Não guardados",
    value: "not-saved",
  },
];

const SavedFilter = ({ className }: { className?: string }) => {
  const { savedInput, setSavedInput } = useFavoriteQueriesFiltersStore();

  const [selectedSaved, setSelectedSaved] = useState<string>(
    savedInput === true ? "saved" : savedInput === false ? "not-saved" : "all",
  );

  const onSelectionChange = (value: string) => {
    setSelectedSaved(value);

    if (value === "all") setSavedInput(null);
    else if (value === "saved") setSavedInput(true);
    else if (value === "not-saved") setSavedInput(false);
  };

  const isSelected = (value: string) => value === selectedSaved;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <Bookmark size={16} />
          <p>Interesse</p>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command value="all">
          <CommandList>
            <CommandGroup>
              {DEFAULT_VALUES?.map((v) => (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  onSelect={onSelectionChange}
                  className={cn(
                    "flex items-center justify-between hover:text-primary data-[selected='true']:bg-background data-[selected=true]:text-foreground",
                    isSelected(v.value) &&
                      "text-primary data-[selected=true]:text-primary",
                  )}
                >
                  <p>{v.label}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      isSelected(v.value) && "opacity-100",
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

export default SavedFilter;
