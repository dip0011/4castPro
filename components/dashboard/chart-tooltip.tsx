"use client";

import { formatDateTime, formatMW } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/constants";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: number;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !label) return null;

  const actual = payload.find((p) => p.dataKey === "actual");
  const forecast = payload.find((p) => p.dataKey === "forecast");

  const error =
    actual && forecast
      ? Math.abs(actual.value - forecast.value)
      : null;

  return (
    <div className="rounded-xl border border-cream-200 bg-white/95 backdrop-blur-sm p-3 shadow-lg">
      <p className="text-xs font-medium text-warm-600 mb-2">
        {formatDateTime(new Date(label).toISOString())}
      </p>
      <div className="space-y-1">
        {actual && (
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHART_COLORS.actual }}
            />
            <span className="text-xs text-warm-500">Actual:</span>
            <span className="text-xs font-semibold text-warm-800">
              {formatMW(actual.value)}
            </span>
          </div>
        )}
        {forecast && (
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHART_COLORS.forecast }}
            />
            <span className="text-xs text-warm-500">Forecast:</span>
            <span className="text-xs font-semibold text-warm-800">
              {formatMW(forecast.value)}
            </span>
          </div>
        )}
        {error !== null && (
          <div className="flex items-center gap-2 pt-1 border-t border-cream-100">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHART_COLORS.accent }}
            />
            <span className="text-xs text-warm-500">Error:</span>
            <span className="text-xs font-semibold text-amber-600">
              {formatMW(error)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
