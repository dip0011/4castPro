"use client";

import { Activity, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsData } from "@/lib/types";
import { formatMW } from "@/lib/utils";

interface StatsCardsProps {
  stats: StatsData | null;
  isLoading: boolean;
}

const statConfig = [
  {
    key: "peakActual" as const,
    label: "Peak Actual",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    key: "avgGeneration" as const,
    label: "Avg Generation",
    icon: Activity,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    key: "peakForecast" as const,
    label: "Peak Forecast",
    icon: TrendingUp,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    key: "mae" as const,
    label: "Mean Abs Error",
    icon: AlertTriangle,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
];

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statConfig.map((config) => (
        <Card
          key={config.key}
          className="hover:shadow-md transition-all duration-300 ease-out"
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <config.icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-warm-500 font-medium uppercase tracking-wider truncate">
                  {config.label}
                </p>
                {isLoading ? (
                  <Skeleton className="h-6 w-20 mt-1" />
                ) : (
                  <p className="text-lg sm:text-xl font-bold text-warm-900 tabular-nums">
                    {stats ? formatMW(stats[config.key]) : "-"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
