"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function Calendar({ selected, onSelect, minDate, maxDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ?? new Date(2024, 0, 1)
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const isDisabled = (d: Date) => {
    if (minDate && isBefore(d, minDate)) return true;
    if (maxDate && isAfter(d, maxDate)) return true;
    return false;
  };

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 rounded-lg hover:bg-cream-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-warm-600" />
        </button>
        <span className="text-sm font-medium text-warm-800">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 rounded-lg hover:bg-cream-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-warm-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-xs font-medium text-warm-400 py-1">
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          const isSelected = selected && isSameDay(d, selected);
          const inMonth = isSameMonth(d, currentMonth);
          const disabled = isDisabled(d);

          return (
            <button
              key={i}
              onClick={() => !disabled && onSelect?.(d)}
              disabled={disabled}
              className={cn(
                "h-8 w-8 rounded-lg text-xs transition-all duration-200",
                !inMonth && "text-warm-300",
                inMonth && !isSelected && "text-warm-700 hover:bg-cream-100",
                isSelected && "bg-amber-400 text-white font-medium shadow-sm",
                disabled && "opacity-30 cursor-not-allowed"
              )}
            >
              {format(d, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
