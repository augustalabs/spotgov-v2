import { cn } from "@/utils/utils";
import { differenceInDays } from "date-fns";

type DeadlineDaysProps = {
  date: Date;
};

const DeadlineDays = ({ date }: DeadlineDaysProps) => {
  const difference = differenceInDays(date, new Date());

  function getDifferenceInDays(): string[] {
    if (difference < 0) return ["Expirado", "bg-muted-foreground"];
    else if (difference === 0) return ["Termina hoje", "bg-red-400"];
    else if (difference === 1) return [`${difference} dia`, "bg-yellow-400"];
    else return [`${difference} dias`, "bg-green-400"];
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={cn("size-2 rounded-full", getDifferenceInDays()[1])} />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30",
            getDifferenceInDays()[1],
          )}
        />
      </div>
      <p className="truncate">{getDifferenceInDays()[0]}</p>
    </div>
  );
};

export default DeadlineDays;
