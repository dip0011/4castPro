"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WindChart } from "./wind-chart";
import { ChartPoint } from "@/lib/types";
import { BarChart3 } from "lucide-react";

interface ChartSectionProps {
  data: ChartPoint[];
  isLoading: boolean;
  horizonHours: number;
}

export function ChartSection({ data, isLoading, horizonHours }: ChartSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-warm-500" />
            <CardTitle className="text-base sm:text-lg">
              Wind Generation vs Forecast
            </CardTitle>
          </div>
          <span className="text-xs text-warm-400 bg-cream-100 px-2.5 py-1 rounded-full">
            Horizon: {horizonHours}h
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px]" />
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-warm-400 text-sm">
            No data available for the selected range
          </div>
        ) : (
          <WindChart data={data} />
        )}
      </CardContent>
    </Card>
  );
}
