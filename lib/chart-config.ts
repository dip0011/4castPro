import { format } from "date-fns";

export function formatXAxis(timestamp: number): string {
  return format(new Date(timestamp), "MMM d HH:mm");
}

export function formatXAxisShort(timestamp: number): string {
  return format(new Date(timestamp), "d/M HH:mm");
}

export function formatYAxis(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}GW`;
  }
  return `${value}MW`;
}

export function getChartHeight(width: number): number {
  if (width < 640) return 300;
  if (width < 1024) return 400;
  return 500;
}
