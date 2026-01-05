"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface PieChartCompProps {
  data: { label: string; value: number; value2?: number; color?: string }[];
  category: string;
  index: string;
  colors: string[]; // Change to colors array
  chartColor: string;
  backgroundColor: string;
  textColor: string;
  valueFormatter: (number: number) => string; // Add this line
  showLegend?: boolean;
  legendLabel?: string;
  mt?: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export function PieChartComp({ data, category, index, colors, chartColor, backgroundColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', mt }: PieChartCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { ...chartConfig.value, color: chartColor, label: legendLabel },
  };

  // Remove local COLORS definition

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            // fill={chartColor} // Use colors array instead
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color || colors[idx % colors.length]} />
            ))}
          </Pie>
          <ChartTooltip 
            content={<ChartTooltipContent formatter={valueFormatter} />}
            contentStyle={{ backgroundColor: backgroundColor, color: textColor }}
            itemStyle={{ color: textColor }}
          />
          {showLegend && <Legend wrapperStyle={{ color: textColor }} />}
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
