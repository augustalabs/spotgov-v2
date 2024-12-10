"use client";

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BadgeEuro, ChevronDown } from "lucide-react";
import { memo, useState } from "react";

interface PriceRangeSelectorProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

const PriceRangeSelector = memo(
  function PriceRangeSelector({
    value,
    onValueChange,
  }: PriceRangeSelectorProps) {
    console.log("rerendering PriceRangeSelector");

    const [sliderOpen, setSliderOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([
      0, 100000000,
    ]);

    const handlePriceRangeChange = (value: number[]) => {
      if (value.length === 2) {
        onValueChange([value[0], value[1]]);
      }
    };

    return (
      <Popover open={sliderOpen} onOpenChange={setSliderOpen}>
        <PopoverTrigger
          asChild
          className="text-custom-text-3 w-[200px] border-gray-200 bg-secondary shadow-none"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={sliderOpen}
            className="flex justify-between bg-white"
          >
            <span className="flex items-center gap-2">
              <BadgeEuro size={15} className="text-secondary" />
              <span className="font-medium">Preço Base</span>
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="center">
          <DualRangeSlider
            title="Filtre por Preço Base"
            subtitle="Os valores estão em Euros"
            min={priceRange[0]}
            max={priceRange[1]}
            value={value}
            onValueChange={handlePriceRangeChange}
            step={1000}
          />
        </PopoverContent>
      </Popover>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the value or onValueChange prop changes
    return (
      prevProps.value[0] === nextProps.value[0] &&
      prevProps.value[1] === nextProps.value[1] &&
      prevProps.onValueChange === nextProps.onValueChange
    );
  },
);

export default PriceRangeSelector;
