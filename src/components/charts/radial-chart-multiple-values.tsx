import { RadialBar, RadialBarChart, ResponsiveContainer, Legend } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface RadialChartMultipleValuesCompProps {
  data: { label: string; value: number; value2: number; fill?: string }[];
  chartColor: string;
  chartColor2: string;
  backgroundColor: string;
  textColor: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value 1",
    color: "hsl(var(--chart-1))",
  },
  value2: {
    label: "Value 2",
    color: "hsl(var(--chart-2))",
  },
}

export function RadialChartMultipleValuesComp({ data, chartColor, chartColor2, backgroundColor, textColor }: RadialChartMultipleValuesCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: chartConfig.value?.label || "Value", color: chartColor },
    value2: { label: chartConfig.value2?.label || "Value 2", color: chartColor2 },
  };

  return (
    <ChartContainer config={updatedChartConfig} className="min-h-[200px] w-full" style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: textColor }}
            background
            clockWise
            dataKey="value"
            fill={chartColor}
          />
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: textColor }}
            background
            clockWise
            dataKey="value2"
            fill={chartColor2}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, left: 0, color: textColor }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
