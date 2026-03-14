import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateStr: string): string {
  return format(new Date(dateStr), "MMM d, HH:mm");
}

export function formatTime(dateStr: string): string {
  return format(new Date(dateStr), "HH:mm");
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateDisplay(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function formatMW(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} GW`;
  }
  return `${Math.round(value)} MW`;
}
