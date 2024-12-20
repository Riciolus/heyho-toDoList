import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker({
  type,
  taskDate,
}: {
  type: "long" | "short";
  taskDate?: string;
}) {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-fit rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-900/40 transition hover:text-neutral-300 p-2.5 h-fit",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon
            className={cn(
              " h-4 w-4 flex",
              "mr-2",
              type === "short" && !date && "mr-0"
            )}
          />
          {date
            ? format(date, "PP")
            : type === "long"
            ? taskDate
              ? format(taskDate, "PP")
              : format(new Date(), "PP")
            : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-neutral-900 text-neutral-50 border-line pointer-events-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
