"use client";

import { useState } from "react";
import { ControlPanel } from "./control-panel";
import { StatsCards } from "./stats-cards";
import { ChartSection } from "./chart-section";
import { useWindData } from "@/hooks/use-wind-data";
import { useChartData } from "@/hooks/use-chart-data";
import { DateRange } from "@/lib/types";
import { DEFAULT_DATE_RANGE, DEFAULT_HORIZON_HOURS } from "@/lib/constants";

export function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE);
  const [horizonHours, setHorizonHours] = useState(DEFAULT_HORIZON_HOURS);

  const { actuals, selectedForecasts, isLoading, error } = useWindData(
    dateRange,
    horizonHours
  );

  const { chartPoints, stats } = useChartData(actuals, selectedForecasts);

  return (
    <div className="space-y-4 sm:space-y-6">
      <ControlPanel
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        horizonHours={horizonHours}
        onHorizonChange={setHorizonHours}
      />

      <StatsCards stats={isLoading ? null : stats} isLoading={isLoading} />

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Failed to load data: {error.message}
        </div>
      )}

      <ChartSection
        data={chartPoints}
        isLoading={isLoading}
        horizonHours={horizonHours}
      />
    </div>
  );
}
