"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/utils";
import { memo, useState } from "react";

type DateRangePickerProps = {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  className?: string;
};

type DateRangeType = "range" | "before" | "after";

const DateNewQuery = memo(function DateNewQuery({
  selected,
  onSelect,
  className,
}: DateRangePickerProps) {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>("range");

  const handleDateRangeTypeChange = (value: DateRangeType) => {
    setDateRangeType(value);
    onSelect(undefined);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    let newRange: DateRange | undefined;

    switch (dateRangeType) {
      case "before":
        newRange = { from: undefined, to: selectedDate };
        break;
      case "after":
        newRange = { from: selectedDate, to: undefined };
        break;
      default:
        newRange = { from: selectedDate, to: selectedDate };
    }

    onSelect(newRange);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (dateRangeType === "range") {
      onSelect(range);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger
          asChild
          className="text-custom-text-3 w-[200px] bg-white shadow-sm"
        >
          <Button
            id="date"
            variant={"outline"}
            className="flex justify-between border-gray-200 bg-white sm:w-fit"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-[15px] w-[15px] text-secondary" />
              <span className="font-medium">Data de Publicação</span>
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="center"
          side="bottom"
          sideOffset={4}
        >
          <Select
            value={dateRangeType}
            onValueChange={handleDateRangeTypeChange}
          >
            <SelectTrigger className="rounded-b-none rounded-t-md border-0 border-b focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Selecione o tipo de data" />
            </SelectTrigger>
            <SelectContent align="center">
              <SelectItem value="range">Intervalo de datas</SelectItem>
              <SelectItem value="before">Antes de</SelectItem>
              <SelectItem value="after">Depois de</SelectItem>
            </SelectContent>
          </Select>
          {dateRangeType === "range" ? (
            <Calendar
              mode="range"
              selected={selected}
              onSelect={handleRangeSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
            />
          ) : (
            <Calendar
              mode="single"
              selected={
                dateRangeType === "before" ? selected?.to : selected?.from
              }
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default DateNewQuery;
