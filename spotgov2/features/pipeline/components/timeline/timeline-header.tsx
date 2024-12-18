import React from "react";
import { cn } from "@/utils/utils";
import { TableHead, TableRow } from "@/components/ui/table";

interface TimelineHeaderProps {
  groupedByMonth: Record<string, string[]>;
  timelineDayWidth: number;
  timelineDayGap: number;
}

const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  groupedByMonth,
  timelineDayWidth,
  timelineDayGap,
}) => (
  <>
    {/* Month Row */}
    <TableRow className="border-none hover:bg-transparent">
      <TableHead
        className="bg-transparent"
        style={{ height: `${timelineDayWidth}px` }}
        colSpan={Object.values(groupedByMonth).flat().length}
      >
        <div className="flex" style={{ gap: `${timelineDayGap}px` }}>
          {Object.entries(groupedByMonth).map(([month, days], monthIndex) => (
            <div
              key={monthIndex}
              className="flex items-center justify-center rounded-lg border text-center text-xs font-semibold text-muted-foreground"
              style={{
                height: `${timelineDayWidth}px`,
                width: `${days.length * (timelineDayWidth + timelineDayGap) - timelineDayGap}px`,
              }}
            >
              {month}
            </div>
          ))}
        </div>
      </TableHead>
    </TableRow>

    {/* Days Row */}
    <TableRow className="border-none text-muted-foreground hover:bg-transparent">
      <TableHead className="bg-transparent">
        <div className="flex" style={{ gap: `${timelineDayGap}px` }}>
          {Object.entries(groupedByMonth).map(([month, days], monthIndex) => (
            <div
              key={monthIndex}
              className="flex"
              style={{ gap: `${timelineDayGap}px` }}
            >
              {days.map((day, dayIndex) => {
                const isFirstDay = dayIndex === 0;
                return (
                  <div
                    key={`${month}-${dayIndex}`}
                    className={cn(
                      "flex items-center justify-center rounded-lg border text-center text-xs",
                      isFirstDay &&
                        "border-secondary bg-secondary font-semibold text-white",
                    )}
                    style={{
                      width: `${timelineDayWidth}px`,
                      height: `${timelineDayWidth}px`,
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </TableHead>
    </TableRow>
  </>
);

export default React.memo(TimelineHeader);
