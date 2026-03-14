export const API_BASE = "https://data.elexon.co.uk/bmrs/api/v1";

export const DATASETS = {
  ACTUALS: "FUELHH",
  FORECASTS: "WINDFOR",
} as const;

export const CHART_COLORS = {
  actual: "#4A90D9",
  forecast: "#5CB85C",
  accent: "#F5A623",
  grid: "#E8E4DD",
  tooltip: "#FEFDFB",
} as const;

export const DEFAULT_DATE_RANGE = {
  from: new Date(2024, 0, 1),
  to: new Date(2024, 0, 7),
};

export const DEFAULT_HORIZON_HOURS = 4;
export const MIN_HORIZON = 0;
export const MAX_HORIZON = 48;

export const FORECAST_FETCH_BUFFER_HOURS = 48;

export const CHART_HEIGHTS = {
  mobile: 300,
  tablet: 400,
  desktop: 500,
} as const;
