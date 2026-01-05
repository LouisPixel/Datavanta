import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Label } from "recharts"

interface CustomLabelProps {
  x?: number;
  y?: number;
  payload?: {
    value?: number | string;
  };
  fill?: string;
  backgroundColor?: string;
  formatter?: (value: number) => string;
}

// Custom label component with background
const CustomLabel = ({ x, y, payload, fill, backgroundColor, formatter }: CustomLabelProps) => {
  if (!payload || payload.value === undefined || x === undefined || y === undefined) return null;
  const value = payload.value;
  const formattedValue = formatter && typeof value === 'number' ? formatter(value) : value;
  const textWidth = formattedValue.toString().length * 7;
  const rectWidth = Math.max(textWidth + 8, 40);
  return (
    <g>
      <rect
        x={x - rectWidth / 2}
        y={y - 20}
        width={rectWidth}
        height={16}
        fill={backgroundColor}
        fillOpacity={0.9}
        rx={4}
      />
      <text
        x={x}
        y={y - 8}
        fill={fill}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="500"
      >
        {formattedValue}
      </text>
    </g>
  );
};
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface StackedAreaChartCompProps {
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

export function StackedAreaChartComp({ data, categories, index, colors, chartColor, chartColor2, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', legendLabel2 = 'Value 2', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: StackedAreaChartCompProps) {
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
        <AreaChart data={data} margin={{ top: showLabels ? 20 : 12 }}>
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
              domain={getYAxisDomain() as [number, number] | [number, string] | [string, number]}
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
          {/* @ts-expect-error - Recharts type mismatch with stackId and label props */}
          <Area
            dataKey={categories[0]}
            type="monotone"
            stackId="a"
            fill={colors[0]}
            stroke={colors[0]}
            label={showLabels ? (props: CustomLabelProps) => (
              <CustomLabel
                {...props}
                fill={textColor}
                backgroundColor={backgroundColor}
                formatter={valueFormatter}
              />
            ) : false}
          />
          {/* @ts-expect-error - Recharts type mismatch with stackId and label props */}
          <Area
            dataKey={categories[1]}
            type="monotone"
            stackId="a"
            fill={colors[1]}
            stroke={colors[1]}
            label={showLabels ? (props: CustomLabelProps) => (
              <CustomLabel
                {...props}
                fill={textColor}
                backgroundColor={backgroundColor}
                formatter={valueFormatter}
              />
            ) : false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
