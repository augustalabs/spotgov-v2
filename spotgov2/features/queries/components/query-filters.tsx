"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderType, PriceRange, RelevanceType } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Landmark, ScrollText } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import PriceRangeSelector from "@/features/new-search/components/price-range-selector";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox";

function QueryFilters({
  setOrder,
  setRelevance,
  setDateRange,
  setPriceRange,
  adjudicatingEntitiesList,
  setSelectedAdjudicatingEntities,
  cpvsList,
  setSelectedCPVs,
}: {
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  setRelevance: React.Dispatch<React.SetStateAction<RelevanceType>>;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange>>;
  adjudicatingEntitiesList: (string | null)[];
  setSelectedAdjudicatingEntities: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  cpvsList: (string | null)[];
  setSelectedCPVs: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [localPriceRange, setLocalPriceRange] = React.useState<PriceRange>([
    0, 100000000,
  ]);

  // Transform the adjudicatingEntitiesList to { value, label } format
  const transformedAdjudicatingEntities = adjudicatingEntitiesList
    // Remove null values
    .filter((entity) => entity)
    .map((entity) => ({ value: entity!, label: entity! }));

  // Transform the cpvs list to { value, label } format
  const transformedCPVs = cpvsList
    // Remove null or falsy values
    .filter((cpv) => cpv)
    .map((cpv) => ({ value: cpv!, label: cpv! }));

  return (
    <div className="my-4 flex items-center justify-start gap-2">
      {/* Adjudicating entity filter */}
      <VirtualizedCombobox
        items={transformedAdjudicatingEntities}
        label={
          <div className="flex items-center">
            <Landmark className="mr-2 text-secondary" />
            <span>Adjudicante</span>
          </div>
        }
        emptyLabel="Sem resultados."
        popover={{ width: "400px", align: "center" }}
        onSelectedChange={(selectedItems) =>
          setSelectedAdjudicatingEntities(selectedItems)
        }
        initiallySelected
      />

      {/* CPV filter */}
      <VirtualizedCombobox
        items={transformedCPVs}
        label={
          <div className="flex items-center">
            <ScrollText className="mr-2 text-secondary" />
            <span>CPV</span>
          </div>
        }
        emptyLabel="Sem resultados."
        popover={{ width: "400px", align: "center" }}
        onSelectedChange={(selectedItems) => setSelectedCPVs(selectedItems)}
        initiallySelected
      />

      {/* Price range filter */}
      <PriceRangeSelector
        value={localPriceRange}
        onValueChange={(value) => {
          setLocalPriceRange(value);
          setPriceRange(value);
        }}
      />

      {/* Date filter */}
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Data de publicação</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setDateRange(selectedDate);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Relevance filter */}
      <Select
        defaultValue="all"
        onValueChange={(value) => setRelevance(value as RelevanceType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="very-relevant">Muito relevante</SelectItem>
          <SelectItem value="relevant">Relevante</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort by */}
      <Select
        defaultValue="publish-date-desc"
        onValueChange={(value) => setOrder(value as OrderType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="publish-date-desc">Mais recente</SelectItem>
          <SelectItem value="publish-date-asc">Mais antigo</SelectItem>
          <SelectItem value="base-price-desc">Preço mais alto</SelectItem>
          <SelectItem value="base-price-asc">Preço mais baixo</SelectItem>
          <SelectItem value="deadline-asc">Prazo mais próximo</SelectItem>
          <SelectItem value="deadline-desc">Prazo mais distante</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default QueryFilters;
