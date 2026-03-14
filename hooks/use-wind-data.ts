"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchActuals, fetchForecasts } from "@/lib/api-client";
import { selectForecasts } from "@/lib/forecast-logic";
import { DateRange, SelectedForecast, ActualDataPoint, ForecastDataPoint } from "@/lib/types";

export function useWindData(dateRange: DateRange, horizonHours: number) {
  const actualsQuery = useQuery<ActualDataPoint[]>({
    queryKey: ["actuals", dateRange.from.toISOString(), dateRange.to.toISOString()],
    queryFn: () => fetchActuals(dateRange.from, dateRange.to),
    staleTime: Infinity,
  });

  const forecastsQuery = useQuery<ForecastDataPoint[]>({
    queryKey: ["forecasts", dateRange.from.toISOString(), dateRange.to.toISOString()],
    queryFn: () => fetchForecasts(dateRange.from, dateRange.to),
    staleTime: Infinity,
  });

  const selectedForecasts: SelectedForecast[] =
    forecastsQuery.data
      ? selectForecasts(forecastsQuery.data, horizonHours)
      : [];

  return {
    actuals: actualsQuery.data ?? [],
    forecasts: forecastsQuery.data ?? [],
    selectedForecasts,
    isLoading: actualsQuery.isLoading || forecastsQuery.isLoading,
    error: actualsQuery.error || forecastsQuery.error,
  };
}
