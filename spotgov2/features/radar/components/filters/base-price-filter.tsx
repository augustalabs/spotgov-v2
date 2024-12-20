import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { debounce } from "@tanstack/react-virtual";
import { ChevronDown, Euro } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const BasePriceFilter = ({ className }: { className: string }) => {
  const basePriceTranslation = useTranslations("radar.filters.basePrice");

  const { basePriceInput, setBasePriceInput, basePriceDefaultValues } =
    useFavoriteQueriesFiltersStore();

  const debouncedSetBasePriceInput = useMemo(
    () =>
      typeof window !== "undefined"
        ? debounce(window, setBasePriceInput, 500)
        : () => {},
    [setBasePriceInput],
  );

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      debouncedSetBasePriceInput({
        min: value[0],
        max: value[1],
      });
    }
  };

  const [values, setValues] = useState<number[] | null>(null);

  useEffect(() => {
    if (basePriceDefaultValues) {
      setValues([basePriceDefaultValues.min, basePriceDefaultValues.max]);
    }
  }, [basePriceDefaultValues]);

  const formattedBasePriceInput = () => {
    let str = "";

    if (basePriceInput?.min) {
      str += `${basePriceInput.min.toLocaleString("de-DE")}`;
    }

    if (basePriceInput?.max) {
      str += `- ${basePriceInput.max.toLocaleString("de-DE")}`;
    }

    return str;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <Euro size={16} />
          <p>
            {basePriceInput
              ? formattedBasePriceInput()
              : basePriceTranslation("label")}
          </p>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {values && (
          <DualRangeSlider
            title={basePriceTranslation("popover.title")}
            subtitle={basePriceTranslation("popover.subtitle")}
            min={values[0]}
            max={values[1]}
            value={[
              basePriceInput?.min ?? values[0],
              basePriceInput?.max ?? values[1],
            ]}
            onValueChange={handleChange}
            step={1000}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default BasePriceFilter;
