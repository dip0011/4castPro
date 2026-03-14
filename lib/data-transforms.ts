import { ActualDataPoint, ChartPoint, SelectedForecast, StatsData } from "./types";

/**
 * Average half-hourly actuals into hourly values to align with forecast resolution.
 */
export function hourlyAlignActuals(
  actuals: ActualDataPoint[]
): Map<string, number> {
  const hourlyMap = new Map<string, number[]>();

  for (const point of actuals) {
    const dt = new Date(point.startTime);
    // Round down to the hour
    const hourKey = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      dt.getHours()
    ).toISOString();

    if (!hourlyMap.has(hourKey)) {
      hourlyMap.set(hourKey, []);
    }
    hourlyMap.get(hourKey)!.push(point.generation);
  }

  const result = new Map<string, number>();
  for (const [key, values] of hourlyMap) {
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    result.set(key, avg);
  }

  return result;
}

/**
 * Merge actuals and selected forecasts into chart-ready data points.
 */
export function mergeToChartPoints(
  actuals: ActualDataPoint[],
  selectedForecasts: SelectedForecast[]
): ChartPoint[] {
  const hourlyActuals = hourlyAlignActuals(actuals);

  // Build forecast lookup
  const forecastMap = new Map<string, number>();
  for (const fc of selectedForecasts) {
    // Align forecast startTime to hour
    const dt = new Date(fc.startTime);
    const hourKey = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      dt.getHours()
    ).toISOString();
    forecastMap.set(hourKey, fc.generation);
  }

  // Collect all unique timestamps
  const allTimes = new Set<string>();
  for (const key of hourlyActuals.keys()) allTimes.add(key);
  for (const key of forecastMap.keys()) allTimes.add(key);

  const sorted = Array.from(allTimes).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return sorted.map((time) => ({
    time,
    timestamp: new Date(time).getTime(),
    actual: hourlyActuals.get(time) ?? null,
    forecast: forecastMap.get(time) ?? null,
  }));
}

/**
 * Calculate summary statistics from chart data.
 */
export function calculateStats(
  actuals: ActualDataPoint[],
  chartPoints: ChartPoint[]
): StatsData {
  const actualValues = actuals.map((a) => a.generation);
  const peakActual = actualValues.length > 0 ? Math.max(...actualValues) : 0;
  const avgGeneration =
    actualValues.length > 0
      ? actualValues.reduce((s, v) => s + v, 0) / actualValues.length
      : 0;

  const forecastValues = chartPoints
    .filter((p) => p.forecast !== null)
    .map((p) => p.forecast!);
  const peakForecast =
    forecastValues.length > 0 ? Math.max(...forecastValues) : 0;

  // MAE: only where both actual and forecast exist
  const paired = chartPoints.filter(
    (p) => p.actual !== null && p.forecast !== null
  );
  const mae =
    paired.length > 0
      ? paired.reduce((sum, p) => sum + Math.abs(p.actual! - p.forecast!), 0) /
        paired.length
      : 0;

  return { peakActual, avgGeneration, peakForecast, mae };
}
