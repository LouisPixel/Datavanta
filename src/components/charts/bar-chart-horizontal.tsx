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

interface BarChartHorizontalCompProps {
  data: { label: string; value: number; value2?: number; color?: string }[];
  categories: string[];
  index: string;
  colors: string[];
  chartColor: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  valueFormatter: (number: number) => string;
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

export function BarChartHorizontalComp({ data, categories, index, colors, chartColor, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: BarChartHorizontalCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: legendLabel, color: chartColor },
  };

  const getXAxisDomain = () => {
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
      <BarChart accessibilityLayer data={data} layout="vertical">
        <CartesianGrid horizontal={false} stroke={gridColor} />
        {showYAxis && (
          <YAxis
            dataKey={index}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            type="category"
            stroke={textColor}
          >
            {yAxisLabel && (
              <Label value={yAxisLabel} position="insideLeft" style={{ fill: textColor, textAnchor: 'middle' }} />
            )}
          </YAxis>
        )}
        {showXAxis && (
          <XAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
            domain={getXAxisDomain()}
            type="number"
            stroke={textColor}
          >
            {xAxisLabel && (
              <Label value={xAxisLabel} position="insideBottom" offset={-5} style={{ fill: textColor, textAnchor: 'middle' }} />
            )}
          </XAxis>
        )}
        <ChartTooltip 
          cursor={false} 
          content={<ChartTooltipContent hideLabel style={{ backgroundColor: backgroundColor, color: textColor }} />} 
        />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey={categories[0]} fill={colors[0]} radius={8}>
          {showLabels && <LabelList dataKey={categories[0]} position="right" fill={textColor} formatter={valueFormatter} />}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

