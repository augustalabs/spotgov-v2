"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  onValueChange?: (value: number[]) => void;
  title?: string;
  subtitle?: string;
  value?: number[];
  min: number;
  max: number;
  step: number;
}

const formatNumberWithDots = (value: number): string => {
  return `€ ${value.toLocaleString("de-DE")}`;
};

const parseFormattedNumber = (value: string): number => {
  const cleanValue = value.replace(/[^0-9]/g, "");
  return cleanValue === "" ? 0 : parseInt(cleanValue, 10);
};

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    {
      className,
      onValueChange,
      value,
      min = 0,
      max = 100,
      title,
      subtitle,
      ...props
    },
    ref
  ) => {
    const initialValue = value || [min, max];

    const [range, setRange] = React.useState<number[]>(initialValue);

    React.useEffect(() => {
      if (value) {
        setRange(value);
      } else {
        setRange([min, max]);
      }
    }, [value, min, max]);

    const handleChange = (value: number[]) => {
      setRange(value);
      if (onValueChange) {
        onValueChange(value);
      }
    };

    const handleInputChange = (value: string, index: number) => {
      const parsedValue = parseFormattedNumber(value);
      const newRange = [...range];
      newRange[index] = parsedValue;
      handleChange(newRange);
    };

    return (
      <div className="flex flex-col p-4">
        {title && <p className="font-semibold text-[#030712]">{title}</p>}
        {subtitle && <p className="mb-4 text-xs text-[#666f8d]">{subtitle}</p>}

        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          value={range}
          onValueChange={handleChange}
          min={min}
          max={max}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {range.map((value, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="relative block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Root>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Input
            type="text"
            value={formatNumberWithDots(range[0])}
            onChange={(e) => handleInputChange(e.target.value, 0)}
            className="rounded border border-input px-2 py-1 text-xs"
            min={min}
            max={range[1]}
          />
          <Input
            type="text"
            value={formatNumberWithDots(range[1])}
            onChange={(e) => handleInputChange(e.target.value, 1)}
            className="rounded border border-input px-2 py-1 text-xs"
            min={range[0]}
            max={max}
          />
        </div>
      </div>
    );
  }
);

DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
