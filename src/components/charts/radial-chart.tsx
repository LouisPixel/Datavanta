"use client"

import React, { useMemo } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface RadialChartProps {
  data: { label: string; value: number; color?: string; }[];
  category: string;
  index: string;
  colors: string[];
  chartColor: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  valueFormatter: (value: number) => string;
  showLegend?: boolean;
  legendLabel?: string;
  mt: string;
}

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export const RadialChart: React.FC<RadialChartProps> = ({
  data,
  category,
  index,
  colors,
  chartColor,
  backgroundColor,
  gridColor,
  textColor,
  valueFormatter,
  showLegend = false,
  legendLabel = 'Value',
  mt
}) => {
  const updatedChartConfig: ChartConfig = useMemo(() => ({
    ...chartConfig,
    value: { ...chartConfig.value, color: chartColor, label: legendLabel },
  }), [chartColor, legendLabel]);

  // Custom legend content that shows only one item
  const CustomLegendContent = React.useCallback((props: any) => {
    if (!props?.payload || props.payload.length === 0) return null;
    
    const itemConfig = updatedChartConfig[category as keyof typeof updatedChartConfig] || updatedChartConfig.value;

    return (
      <div className={cn("flex items-center justify-center gap-4", "pt-3")}>
        <div className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}>
          {itemConfig?.icon ? (
            <itemConfig.icon />
          ) : (
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: chartColor,
              }}
            />
          )}
          {itemConfig?.label || legendLabel}
        </div>
      </div>
    );
  }, [updatedChartConfig, category, chartColor, legendLabel]);

  // RadialBar uses dataKey for values, data is already in the correct format

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="20%" 
          outerRadius="80%" 
          data={data} 
          startAngle={90} 
          endAngle={-270}
          barSize={10}
        >
          <PolarAngleAxis type="number" domain={[0, 'dataMax']} angleAxisId={0} tick={false} />
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: textColor }}
            background
            dataKey={category}
            angleAxisId={0}
            fill={chartColor}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent formatter={(value: number) => valueFormatter(value)} style={{ backgroundColor: backgroundColor, color: textColor }} />}
          />
          {showLegend && <ChartLegend content={<CustomLegendContent />} />}
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
