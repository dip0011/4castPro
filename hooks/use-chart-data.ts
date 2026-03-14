"use client";

import { useMemo } from "react";
import { ActualDataPoint, ChartPoint, SelectedForecast, StatsData } from "@/lib/types";
import { mergeToChartPoints, calculateStats } from "@/lib/data-transforms";

export function useChartData(
  actuals: ActualDataPoint[],
  selectedForecasts: SelectedForecast[]
) {
  const chartPoints = useMemo<ChartPoint[]>(
    () => mergeToChartPoints(actuals, selectedForecasts),
    [actuals, selectedForecasts]
  );

  const stats = useMemo<StatsData>(
    () => calculateStats(actuals, chartPoints),
    [actuals, chartPoints]
  );

  return { chartPoints, stats };
}
