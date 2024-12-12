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
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { cn } from "@/utils/utils";
import { Check, Landmark } from "lucide-react";

const AdjudicatorsFilter = () => {
  const { adjudicatorsInput, setAdjudicatorsInput, adjudicatorsDefaultValues } =
    useFavoriteQueriesFiltersStore();

  const handleSelection = (adjudicator: string) => {
    if (adjudicatorsInput.includes(adjudicator)) {
      setAdjudicatorsInput(adjudicatorsInput.filter((a) => a !== adjudicator));
    } else {
      setAdjudicatorsInput([...adjudicatorsInput, adjudicator]);
    }
  };

  const isAdjudicatorSelected = (adjudicator: string) =>
    adjudicatorsInput.includes(adjudicator.toLowerCase());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Landmark size={16} />
          <p>Adjudicantes </p>
          <div className="rounded-md border border-primary bg-primary/10 px-1">
            {adjudicatorsInput.length}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Procurar adjudicantes..." />
          <CommandList>
            <CommandEmpty>Não foram encontrados resultados.</CommandEmpty>
            <CommandGroup>
              {adjudicatorsDefaultValues?.map((adjudicator) => (
                <CommandItem
                  key={adjudicator}
                  value={adjudicator}
                  onSelect={handleSelection}
                  className={cn(
                    "flex items-center justify-between data-[selected='true']:bg-background data-[selected=true]:text-foreground",
                    isAdjudicatorSelected(adjudicator) &&
                      "text-primary data-[selected=true]:text-primary",
                  )}
                >
                  <p>{adjudicator}</p>
                  <Check
                    size={16}
                    className={cn(
                      "opacity-0",
                      isAdjudicatorSelected(adjudicator) && "opacity-100",
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

export default AdjudicatorsFilter;
