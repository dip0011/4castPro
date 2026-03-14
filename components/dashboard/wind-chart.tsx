"use client";

import { useCallback, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartPoint } from "@/lib/types";
import { CHART_COLORS } from "@/lib/constants";
import { formatXAxisShort, formatYAxis, getChartHeight } from "@/lib/chart-config";
import { ChartTooltip } from "./chart-tooltip";

interface WindChartProps {
  data: ChartPoint[];
}

export function WindChart({ data }: WindChartProps) {
  const [chartHeight, setChartHeight] = useState(500);

  useEffect(() => {
    function handleResize() {
      setChartHeight(getChartHeight(window.innerWidth));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const xTickFormatter = useCallback(
    (value: number) => formatXAxisShort(value),
    []
  );

  return (
    <div style={{ height: chartHeight }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            vertical={false}
          />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={xTickFormatter}
            tick={{ fontSize: 11, fill: "#9C9489" }}
            tickLine={false}
            axisLine={{ stroke: CHART_COLORS.grid }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: "#9C9489" }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke={CHART_COLORS.actual}
            strokeWidth={2}
            dot={false}
            name="Actual Generation"
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke={CHART_COLORS.forecast}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            name="Forecast"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
