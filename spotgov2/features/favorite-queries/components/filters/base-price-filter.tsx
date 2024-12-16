import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { ChevronDown, Euro } from "lucide-react";

const BasePriceFilter = ({ className }: { className: string }) => {
  const { basePriceInput, setBasePriceInput, basePriceDefaultValues } =
    useFavoriteQueriesFiltersStore();

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      setBasePriceInput([value[0], value[1]]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <Euro size={16} />
          <p>Preço base</p>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* TODO: FIX THIS */}
        {/* <DualRangeSlider
          title="Filtre por Preço Base"
          subtitle="Os valores estão em euros"
          min={basePriceDefaultValues[0]}
          max={basePriceDefaultValues[1]}
          value={basePriceInput}
          onValueChange={handleChange}
          step={1000}
        /> */}
      </PopoverContent>
    </Popover>
  );
};

export default BasePriceFilter;
