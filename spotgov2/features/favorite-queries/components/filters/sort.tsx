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
import { OrderType } from "@/types";
import { cn } from "@/utils/utils";
import { Check, ChevronDown, ListFilter } from "lucide-react";

type DefaultValuesProps = {
  label: string;
  value: OrderType;
};

const DEFAULT_VALUES: DefaultValuesProps[] = [
  {
    label: "Mais recente",
    value: "publish-date-desc",
  },
  {
    label: "Mais antigo",
    value: "publish-date-asc",
  },
  {
    label: "Preço mais alto",
    value: "base-price-desc",
  },
  {
    label: "Preço mais baixo",
    value: "base-price-asc",
  },
  {
    label: "Prazo mais próximo",
    value: "deadline-desc",
  },
  {
    label: "Prazo mais distante",
    value: "deadline-asc",
  },
];

const Sort = () => {
  const { selectedSortInput, setSelectedSortInput } =
    useFavoriteQueriesFiltersStore();

  const onSelectionChange = (value: DefaultValuesProps) => {
    setSelectedSortInput(value.value);
  };

  const isSelected = (value: DefaultValuesProps) =>
    value.value === selectedSortInput;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilter size={16} />
          <p>
            {
              DEFAULT_VALUES.find((value) => value.value === selectedSortInput)
                ?.label
            }
          </p>
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
                  onSelect={() => onSelectionChange(v)}
                  className={cn(
                    "flex items-center justify-between data-[selected='true']:bg-background data-[selected=true]:text-foreground",
                    isSelected(v) &&
                      "text-primary data-[selected=true]:text-primary",
                  )}
                >
                  <p>{v.label}</p>
                  <Check
                    size={16}
                    className={cn("opacity-0", isSelected(v) && "opacity-100")}
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

export default Sort;
