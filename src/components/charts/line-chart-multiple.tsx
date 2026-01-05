import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface LineChartMultipleCompProps {
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

export function LineChartMultipleComp({ data, chartColor, chartColor2, backgroundColor, gridColor, textColor }: LineChartMultipleCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: chartConfig.value?.label || "Value", color: chartColor },
    value2: { label: chartConfig.value2?.label || "Value 2", color: chartColor2 },
  };

  return (
    <ChartContainer config={updatedChartConfig} className="min-h-[200px] w-full" style={{ backgroundColor: backgroundColor }}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
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
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Legend wrapperStyle={{ color: textColor }} />
        <Line
          dataKey="value"
          type="monotone"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="value2"
          type="monotone"
          stroke={chartColor2}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
