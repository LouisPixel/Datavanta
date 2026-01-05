"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts"

// Custom label component with background
const CustomLabel = ({ x, y, payload, fill, backgroundColor, formatter }: any) => {
  if (!payload || payload.value === undefined) return null;
  const value = payload.value;
  const formattedValue = formatter ? formatter(value) : value;
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

interface AreaGradientChartCompProps {
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

export function AreaGradientChartComp({ data, categories, index, colors, chartColor, backgroundColor, gridColor, textColor, valueFormatter, showLegend = false, legendLabel = 'Value', showXAxis = true, showYAxis = true, xAxisLabel, yAxisLabel, yAxisMin, yAxisMax, showLabels = false, mt }: AreaGradientChartCompProps) {
  const updatedChartConfig: ChartConfig = {
    ...chartConfig,
    value: { ...chartConfig.value, color: chartColor, label: legendLabel },
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
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
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
            domain={getYAxisDomain()}
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
          type="monotone"
          fill="url(#gradient)"
          stroke={colors[0]}
          baseValue={getBaseValue()}
          connectNulls={true}
          isAnimationActive={false}
          label={showLabels ? (props: any) => (
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

