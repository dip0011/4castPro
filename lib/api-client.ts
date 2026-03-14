import { ActualDataPoint, ForecastDataPoint } from "./types";
import { formatDate } from "./utils";

export async function fetchActuals(
  from: Date,
  to: Date
): Promise<ActualDataPoint[]> {
  const params = new URLSearchParams({
    from: formatDate(from),
    to: formatDate(to),
  });

  const res = await fetch(`/api/actuals?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch actuals: ${res.status}`);
  }
  return res.json();
}

export async function fetchForecasts(
  from: Date,
  to: Date
): Promise<ForecastDataPoint[]> {
  const params = new URLSearchParams({
    from: formatDate(from),
    to: formatDate(to),
  });

  const res = await fetch(`/api/forecasts?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch forecasts: ${res.status}`);
  }
  return res.json();
}
