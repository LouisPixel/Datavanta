"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartWithLabelsCompProps {
  data: { label: string; value: number }[];
  chartColor: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export function BarChartWithLabelsComp({ data, chartColor, backgroundColor, gridColor, textColor }: BarChartWithLabelsCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: chartConfig.value?.label || "Value", color: chartColor },
  };

  return (
    <ChartContainer config={updatedChartConfig} className="min-h-[200px] w-full" style={{ backgroundColor: backgroundColor }}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={textColor}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.toLocaleString()}
          domain={[0, 'dataMax']}
          stroke={textColor}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel style={{ backgroundColor, color: textColor }} />} />
        <Bar dataKey="value" fill={chartColor} radius={8}>
          <LabelList dataKey="value" position="top" fill={textColor} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

