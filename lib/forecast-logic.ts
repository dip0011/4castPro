import { ForecastDataPoint, SelectedForecast } from "./types";

/**
 * For each target time, find the latest forecast where
 * (startTime - publishTime) >= horizonHours.
 *
 * 1. Group forecasts by startTime
 * 2. Filter: keep only forecasts where lead time >= configured horizon
 * 3. Pick the one with the most recent publishTime
 * 4. If none qualifies, skip that point (gap in chart)
 */
export function selectForecasts(
  forecasts: ForecastDataPoint[],
  horizonHours: number
): SelectedForecast[] {
  const horizonMs = horizonHours * 60 * 60 * 1000;

  // Group by startTime
  const grouped = new Map<string, ForecastDataPoint[]>();
  for (const fc of forecasts) {
    const key = fc.startTime;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(fc);
  }

  const results: SelectedForecast[] = [];

  for (const [startTime, group] of grouped) {
    const startMs = new Date(startTime).getTime();

    // Filter: lead time >= horizon
    const qualifying = group.filter((fc) => {
      const publishMs = new Date(fc.publishTime).getTime();
      const leadTime = startMs - publishMs;
      return leadTime >= horizonMs;
    });

    if (qualifying.length === 0) continue;

    // Pick most recent publishTime
    qualifying.sort(
      (a, b) =>
        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    );

    const best = qualifying[0];
    const leadTimeHours =
      (startMs - new Date(best.publishTime).getTime()) / (60 * 60 * 1000);

    results.push({
      startTime: best.startTime,
      generation: best.generation,
      publishTime: best.publishTime,
      leadTimeHours,
    });
  }

  // Sort by startTime
  results.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return results;
}
