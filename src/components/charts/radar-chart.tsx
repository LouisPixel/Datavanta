"use client"

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import React, { useMemo } from "react";

interface RadarChartProps {
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
  showLegend?: boolean;
  legendLabel?: string;
  legendLabel2?: string;
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

export const RadarChart: React.FC<RadarChartProps> = ({
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
  showLegend = false,
  legendLabel = 'Value',
  legendLabel2 = 'Value 2',
  mt
}) => {
  const updatedChartConfig: ChartConfig = useMemo(() => ({
    ...chartConfig,
    value: { label: legendLabel, color: chartColor },
    ...(chartColor2 && { value2: { label: legendLabel2, color: chartColor2 } }),
  }), [chartColor, chartColor2, legendLabel, legendLabel2]);

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey={index} tick={{ fill: textColor }} />
          <PolarRadiusAxis angle={90} domain={[0, 'dataMax'] as [number, string]} tick={false} axisLine={false} />
          {(categories || []).map((cat, i) => (
            <Radar
              key={cat}
              name={cat}
              dataKey={cat}
              stroke={colors[i] || chartColor}
              fill={colors[i] || chartColor}
              fillOpacity={0.6}
            />
          ))}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" style={{ backgroundColor: backgroundColor, color: textColor }} />}
            formatter={(value: number) => valueFormatter(value)}
          />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
