import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { Button } from "../shadcn/button";
import { cn } from "@/app/lib/utils";
import { Calendar } from "../shadcn/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-fit rounded-xl bg-neutral-800/40 text-neutral-300 hover:bg-neutral-800/80 transition hover:text-neutral-300 p-2 h-fit",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-neutral-900 text-neutral-50 border-line">
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
