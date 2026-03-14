"use client";

import { Slider } from "@/components/ui/slider";
import { MIN_HORIZON, MAX_HORIZON } from "@/lib/constants";

interface HorizonSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function HorizonSlider({ value, onChange }: HorizonSliderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-warm-500 uppercase tracking-wider">
          Forecast Horizon
        </label>
        <span className="text-sm font-semibold text-amber-600 tabular-nums">
          {value}h
        </span>
      </div>
      <div className="pt-1">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={MIN_HORIZON}
          max={MAX_HORIZON}
          step={1}
        />
      </div>
      <div className="flex justify-between text-[10px] text-warm-400">
        <span>{MIN_HORIZON}h</span>
        <span>{MAX_HORIZON}h</span>
      </div>
    </div>
  );
}
