import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartStackedCompProps {
  data: { label: string; value: number; value2: number }[];
  chartColor: string;
  chartColor2: string;
  backgroundColor: string;
  gridColor: string;
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

export function BarChartStackedComp({ data, chartColor, chartColor2, backgroundColor, gridColor, textColor }: BarChartStackedCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: chartConfig.value?.label || "Value", color: chartColor },
    value2: { label: chartConfig.value2?.label || "Value 2", color: chartColor2 },
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
          domain={[0, 'dataMax'] as [number, string]}
          stroke={textColor}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Legend wrapperStyle={{ color: textColor }} />
        {/* @ts-expect-error - Recharts type mismatch with stackId prop */}
        <Bar dataKey="value" stackId="a" fill={chartColor} radius={[8, 8, 0, 0]} />
        {/* @ts-expect-error - Recharts type mismatch with stackId prop */}
        <Bar dataKey="value2" stackId="a" fill={chartColor2} radius={[0, 0, 8, 8]} />
      </BarChart>
    </ChartContainer>
  )
}
