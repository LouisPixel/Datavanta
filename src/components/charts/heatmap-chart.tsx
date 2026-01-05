"use client"

import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  ZAxis,
  Legend,
  ScatterChart,
  Scatter
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useMemo } from "react";

interface HeatmapChartProps {
  data: { label: string; value: number; value2?: number; color?: string; }[];
  categories: string[];
  index: string;
  colors: string[];
  chartColor: string;
  chartColor2?: string;
  backgroundColor: string;
  gridColor: string;
  textColor: string;
  valueFormatter: (value: number) => string;
  mt: string;
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

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  categories,
  index,
  colors,
  chartColor,
  chartColor2,
  backgroundColor,
  gridColor,
  textColor,
  valueFormatter,
  mt
}) => {
  const updatedChartConfig: ChartConfig = useMemo(() => ({
    ...chartConfig,
    value: { ...chartConfig.value, color: chartColor },
    ...(chartColor2 && { value2: { ...chartConfig.value2, color: chartColor2 } }),
  }), [chartColor, chartColor2]);

  // For a simple heatmap, we'll use value as the intensity. For a more complex one, we'd need more data structure.
  const getFillColor = (value: number) => {
    // Simple color scale: lower value = lighter color, higher value = darker color
    const minVal = Math.min(...(data || []).map(d => d.value));
    const maxVal = Math.max(...(data || []).map(d => d.value));
    const range = maxVal - minVal;

    if (range === 0) return chartColor; // All values are the same

    const normalizedValue = (value - minVal) / range;
    // Interpolate between a light version of chartColor and chartColor
    const r = parseInt(chartColor.slice(1, 3), 16);
    const g = parseInt(chartColor.slice(3, 5), 16);
    const b = parseInt(chartColor.slice(5, 7), 16);

    const startColor = { r: 240, g: 240, b: 240 }; // Light gray
    const endColor = { r, g, b };

    const interpolatedR = Math.round(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    const interpolatedG = Math.round(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    const interpolatedB = Math.round(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    return `rgb(${interpolatedR},${interpolatedG},${interpolatedB})`;
  };

  return (
    <ChartContainer config={updatedChartConfig} className={`min-h-[200px] w-full ${mt}`} style={{ backgroundColor: backgroundColor }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke={gridColor} />
          <XAxis type="category" dataKey={index} tickLine={false} axisLine={false} stroke={textColor} />
          <YAxis type="category" dataKey="categoryLabel" tickLine={false} axisLine={false} stroke={textColor} /> {/* Assuming a category for y-axis */}
          <ZAxis type="number" dataKey="value" range={[10, 200]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number) => valueFormatter(value)} />
          {/* A basic heatmap simulation using scatter plots with varying sizes/colors */}
          <Scatter name="A school" data={(data || []).map(d => ({ ...d, categoryLabel: d.label, z: d.value }))} fill={chartColor} >
            {(data || []).map((entry, index) => (
              <Rectangle
                key={`cell-${index}`}
                x={0} // These x, y, width, height would need to be calculated based on data and chart dimensions
                y={0}
                width={10}
                height={10}
                fill={getFillColor(entry.value)}
              />
            ))}
          </Scatter>
          <Legend wrapperStyle={{ color: textColor }} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
