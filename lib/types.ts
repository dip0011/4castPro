export interface ActualDataPoint {
  startTime: string;
  generation: number;
}

export interface ForecastDataPoint {
  startTime: string;
  publishTime: string;
  generation: number;
}

export interface ChartPoint {
  time: string;
  timestamp: number;
  actual: number | null;
  forecast: number | null;
}

export interface StatsData {
  peakActual: number;
  avgGeneration: number;
  peakForecast: number;
  mae: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface WindDataResult {
  actuals: ActualDataPoint[];
  forecasts: ForecastDataPoint[];
  isLoading: boolean;
  error: Error | null;
}

export interface SelectedForecast {
  startTime: string;
  generation: number;
  publishTime: string;
  leadTimeHours: number;
}
