"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList, Label } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface BarChartCompProps {
  data: { label: string; value: number; value2?: number; color?: string }[];
  categories: string[];
  index: string;
  colors: string[]; // Add this line
  chartColor: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string; // Add this line
  valueFormatter: (number: number) => string; // Add this line
  showLegend?: boolean;
  legendLabel?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  yAxisMin?: number;
  yAxisMax?: number;
  showLabels?: boolean;
  mt?: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export function BarChartComp({ data, categories, index, colors, chartColor, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: BarChartCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: legendLabel, color: chartColor },
  };

  const getYAxisDomain = () => {
    if (yAxisMin !== undefined && yAxisMax !== undefined) {
      return [yAxisMin, yAxisMax];
    } else if (yAxisMin !== undefined) {
      return [yAxisMin, 'dataMax'];
    } else if (yAxisMax !== undefined) {
      return [0, yAxisMax];
    }
    return [0, 'dataMax'];
  };

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} stroke={gridColor} />
        {showXAxis && (
          <XAxis
            dataKey={index}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            stroke={textColor}
          >
            {xAxisLabel && (
              <Label value={xAxisLabel} position="insideBottom" offset={-5} style={{ fill: textColor, textAnchor: 'middle' }} />
            )}
          </XAxis>
        )}
        {showYAxis && (
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
            domain={getYAxisDomain() as [number, number] | [number, string] | [string, number]}
            stroke={textColor}
          >
            {yAxisLabel && (
              <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ fill: textColor, textAnchor: 'middle' }} />
            )}
          </YAxis>
        )}
        <ChartTooltip 
          cursor={false} 
          content={<ChartTooltipContent hideLabel style={{ backgroundColor: backgroundColor, color: textColor }} />}
        />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey={categories[0]} fill={colors[0]} radius={8}>
          {showLabels && <LabelList dataKey={categories[0]} position="top" fill={textColor} formatter={valueFormatter} />}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
