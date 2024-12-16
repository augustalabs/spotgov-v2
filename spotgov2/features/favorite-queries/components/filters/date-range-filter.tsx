import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { Calendar } from "@/components/ui/calendar";

const DateRangeFilter = ({ className }: { className: string }) => {
  const { publishDateInput, setPublishDateInput } =
    useFavoriteQueriesFiltersStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <CalendarIcon size={16} />
          <p>Data de publicação</p>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Calendar
          mode="range"
          initialFocus
          selected={publishDateInput}
          onSelect={(value) => setPublishDateInput(value)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
