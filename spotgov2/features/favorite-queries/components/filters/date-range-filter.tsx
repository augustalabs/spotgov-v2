import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const DateRangeFilter = ({ className }: { className: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          <CalendarIcon size={16} />
          <p>Data de publicação</p>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* TODO: Complete this */}
        <div>Content</div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
