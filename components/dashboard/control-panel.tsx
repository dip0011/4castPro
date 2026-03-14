"use client";

import { DateRangePicker } from "./date-range-picker";
import { HorizonSlider } from "./horizon-slider";
import { DateRange } from "@/lib/types";

interface ControlPanelProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  horizonHours: number;
  onHorizonChange: (hours: number) => void;
}

export function ControlPanel({
  dateRange,
  onDateRangeChange,
  horizonHours,
  onHorizonChange,
}: ControlPanelProps) {
  const jan2024Start = new Date(2024, 0, 1);
  const jan2024End = new Date(2024, 0, 31);

  return (
    <div className="rounded-2xl border border-cream-200 bg-white/70 backdrop-blur-xl p-4 sm:p-6 shadow-sm transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr] gap-4 sm:gap-6 items-end">
        <DateRangePicker
          label="From"
          date={dateRange.from}
          onSelect={(d) =>
            onDateRangeChange({ ...dateRange, from: d })
          }
          minDate={jan2024Start}
          maxDate={dateRange.to}
        />
        <DateRangePicker
          label="To"
          date={dateRange.to}
          onSelect={(d) =>
            onDateRangeChange({ ...dateRange, to: d })
          }
          minDate={dateRange.from}
          maxDate={jan2024End}
        />
        <HorizonSlider value={horizonHours} onChange={onHorizonChange} />
      </div>
    </div>
  );
}
