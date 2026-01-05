import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, Label } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface StackedBarChartCompProps {
  data: { label: string; value: number; value2?: number; color?: string }[];
  categories: string[];
  index: string;
  colors: string[]; // Add this line
  chartColor: string;
  chartColor2: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  valueFormatter: (number: number) => string; // Add this line
  showLegend?: boolean;
  legendLabel?: string;
  legendLabel2?: string;
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
  value2: {
    label: "Value 2",
    color: "hsl(var(--chart-2))",
  },
}

export function StackedBarChartComp({ data, categories, index, colors, chartColor, chartColor2, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', legendLabel2 = 'Value 2', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: StackedBarChartCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { label: legendLabel, color: chartColor },
    value2: { label: legendLabel2, color: chartColor2 },
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
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} stroke={gridColor} />
          {showXAxis && (
            <XAxis
              dataKey={index}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
              tickMargin={10}
              axisLine={false}
              stroke={textColor}
              tickFormatter={valueFormatter}
              domain={getYAxisDomain()}
            >
              {yAxisLabel && (
                <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ fill: textColor, textAnchor: 'middle' }} />
              )}
            </YAxis>
          )}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" style={{ backgroundColor: backgroundColor, color: textColor }} />}
          />
          {showLegend && <Legend wrapperStyle={{ color: textColor }} />}
          <Bar dataKey={categories[0]} stackId="a" fill={colors[0]}>
            {showLabels && <LabelList dataKey={categories[0]} position="top" fill={textColor} formatter={valueFormatter} />}
          </Bar>
          <Bar dataKey={categories[1]} stackId="a" fill={colors[1]}>
            {showLabels && <LabelList dataKey={categories[1]} position="top" fill={textColor} formatter={valueFormatter} />}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
