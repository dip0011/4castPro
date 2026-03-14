"use client";

import { CalendarDays } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatDateDisplay } from "@/lib/utils";

interface DateRangePickerProps {
  label: string;
  date: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function DateRangePicker({
  label,
  date,
  onSelect,
  minDate,
  maxDate,
}: DateRangePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-warm-500 uppercase tracking-wider">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal gap-2 h-10"
          >
            <CalendarDays className="h-4 w-4 text-warm-400" />
            <span className="text-warm-700">{formatDateDisplay(date)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            selected={date}
            onSelect={onSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
