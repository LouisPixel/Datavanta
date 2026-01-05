"use client"

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useMemo } from "react";

interface ScatterPlotChartProps {
  data: { label: string; value: number; value2?: number; color?: string; }[];
  categories: string[];
  index: string;
  colors: string[];
  chartColor: string;
  chartColor2?: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  valueFormatter: (value: number) => string;
  mt: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
  value2: {
    label: "Value 2",
    color: "hsl(var(--chart-2))",
  },
}

export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = ({
  data,
  categories,
  index,
  colors,
  chartColor,
  chartColor2,
  backgroundColor,
  gridColor,
  textColor,
  valueFormatter,
  mt
}) => {
  const updatedChartConfig: ChartConfig = useMemo(() => ({
    ...chartConfig,
    value: { ...chartConfig.value, color: chartColor },
    ...(chartColor2 && { value2: { ...chartConfig.value2, color: chartColor2 } }),
  }), [chartColor, chartColor2]);

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke={gridColor} />
          <XAxis type="category" dataKey={index} tickLine={false} axisLine={false} stroke={textColor} tickFormatter={(value: string) => value.slice(0, 3)} />
          <YAxis type="number" dataKey={(categories || [])[0]} stroke={textColor} tickFormatter={valueFormatter} />
          {(categories || []).map((cat, i) => (
            <Scatter
              key={cat}
              name={cat}
              dataKey={cat}
              fill={colors[i] || chartColor}
            />
          ))}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
            formatter={(value: number) => valueFormatter(value)}
            wrapperStyle={{ backgroundColor: backgroundColor, color: textColor }}
            itemStyle={{ color: textColor }}
            labelStyle={{ color: textColor }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
