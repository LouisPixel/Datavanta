"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface AreaStepChartCompProps {
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

export function AreaStepChartComp({ data, categories, index, colors, chartColor, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: AreaStepChartCompProps) {
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

  const getBaseValue = () => {
    if (yAxisMin !== undefined) {
      return yAxisMin;
    }
    return 0;
  };

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: showLabels ? 20 : 12,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} stroke={gridColor} />
        {showXAxis && (
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
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
          content={<ChartTooltipContent indicator="dashed" style={{ backgroundColor: backgroundColor, color: textColor }} />}
        />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        <Area
          dataKey={categories[0]}
          type="stepAfter"
          fill={colors[0]}
          stroke={colors[0]}
          baseValue={getBaseValue()}
          connectNulls={true}
          isAnimationActive={false}
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
    </ChartContainer>
  )
}

