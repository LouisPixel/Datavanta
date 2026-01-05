'use client';
import React from 'react';
import { NewHeader } from '@/components/header-2';
import FooterSection from '@/components/footer';
import {
  BarChart,
  BarChartHorizontal,
  LineChart,
  LineDotsChart,
  LineStepChart,
  PieChart,
  DonutChart,
  AreaChart,
  AreaStepChart,
  AreaGradientChart,
  StackedBarChart,
  StackedAreaChart,
  StackedLineChart,
  StackedLineDotsChart,
  RadarChart,
  RadarLinesChart,
  RadarDotsChart,
} from '@/components/charts';

// Sample data for different chart types
const sampleData = {
  bar: [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
  ],
  line: [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 61 },
    { label: 'May', value: 55 },
  ],
  stacked: [
    { label: 'Jan', value: 45, value2: 30 },
    { label: 'Feb', value: 52, value2: 35 },
    { label: 'Mar', value: 48, value2: 28 },
    { label: 'Apr', value: 61, value2: 42 },
    { label: 'May', value: 55, value2: 38 },
  ],
  pie: [
    { label: 'Product A', value: 35, color: '#9B99FE' },
    { label: 'Product B', value: 25, color: '#2BC8B7' },
    { label: 'Product C', value: 20, color: '#FFC107' },
    { label: 'Product D', value: 20, color: '#FF5722' },
  ],
  radar: [
    { label: 'Speed', value: 85 },
    { label: 'Reliability', value: 90 },
    { label: 'Comfort', value: 75 },
    { label: 'Safety', value: 95 },
    { label: 'Efficiency', value: 80 },
  ],
};

const chartCategories = [
  {
    name: 'Bar Charts',
    description: 'Bar charts are ideal for comparing values across different categories. They excel at showing discrete data points and making it easy to identify which category has the highest or lowest value. Perfect for business reports, surveys, and performance dashboards where categorical comparisons are key.',
    charts: [
      {
        type: 'bar',
        title: 'Vertical Bar Chart',
        description: 'Perfect for comparing values across categories',
        component: BarChart,
        data: sampleData.bar,
      },
      {
        type: 'bar-horizontal',
        title: 'Horizontal Bar Chart',
        description: 'Ideal for displaying long category names',
        component: BarChartHorizontal,
        data: sampleData.bar,
      },
      {
        type: 'stacked-bar',
        title: 'Stacked Bar Chart',
        description: 'Compare parts of a whole across categories',
        component: StackedBarChart,
        data: sampleData.stacked,
      },
    ],
  },
  {
    name: 'Line Charts',
    description: 'Line charts are the go-to choice for visualizing trends and changes over time. They excel at showing continuous data, patterns, and relationships between data points. Essential for financial analysis, sales tracking, and monitoring metrics that change over time periods.',
    charts: [
      {
        type: 'line',
        title: 'Line Chart',
        description: 'Track trends and changes over time',
        component: LineChart,
        data: sampleData.line,
      },
      {
        type: 'line-dots',
        title: 'Line Chart with Dots',
        description: 'Highlight individual data points',
        component: LineDotsChart,
        data: sampleData.line,
      },
      {
        type: 'line-step',
        title: 'Step Chart',
        description: 'Show discrete changes between values',
        component: LineStepChart,
        data: sampleData.line,
      },
      {
        type: 'stacked-line',
        title: 'Stacked Line Chart',
        description: 'Compare multiple series over time',
        component: StackedLineChart,
        data: sampleData.stacked,
      },
      {
        type: 'stacked-line-dots',
        title: 'Stacked Line with Dots',
        description: 'Stacked lines with highlighted points',
        component: StackedLineDotsChart,
        data: sampleData.stacked,
      },
    ],
  },
  {
    name: 'Area Charts',
    description: 'Area charts emphasize the magnitude and volume of change over time. The filled areas make it easier to see the total value and cumulative impact, making them ideal for showing growth, decline, or the contribution of different components to a total.',
    charts: [
      {
        type: 'area',
        title: 'Area Chart',
        description: 'Show magnitude of change over time',
        component: AreaChart,
        data: sampleData.line,
      },
      {
        type: 'area-step',
        title: 'Step Area Chart',
        description: 'Discrete changes with filled areas',
        component: AreaStepChart,
        data: sampleData.line,
      },
      {
        type: 'area-gradient',
        title: 'Gradient Area Chart',
        description: 'Beautiful gradient fills for visual appeal',
        component: AreaGradientChart,
        data: sampleData.line,
      },
      {
        type: 'stacked-area',
        title: 'Stacked Area Chart',
        description: 'Compare multiple series with filled areas',
        component: StackedAreaChart,
        data: sampleData.stacked,
      },
    ],
  },
  {
    name: 'Pie Charts',
    description: 'Pie charts instantly communicate proportions and percentages, making them perfect for showing parts of a whole. They are most effective when comparing a few categories and when the total represents 100% of something, such as market share, budget allocation, or survey responses.',
    charts: [
      {
        type: 'pie',
        title: 'Pie Chart',
        description: 'Show proportions of a whole',
        component: PieChart,
        data: sampleData.pie,
      },
      {
        type: 'donut',
        title: 'Donut Chart',
        description: 'Modern alternative to pie charts',
        component: DonutChart,
        data: sampleData.pie,
      },
    ],
  },
  {
    name: 'Radar Charts',
    description: 'Radar charts provide a unique way to visualize multi-dimensional data by displaying multiple variables on axes starting from the same point. Perfect for comparing performance across different attributes, such as product features, employee skills, competitive analysis, or any scenario where you need to evaluate multiple dimensions simultaneously.',
    charts: [
      {
        type: 'radar',
        title: 'Radar Chart',
        description: 'Compare multiple variables across dimensions',
        component: RadarChart,
        data: sampleData.radar,
      },
      {
        type: 'radar-lines',
        title: 'Radar Lines Chart',
        description: 'Radar chart with line connections',
        component: RadarLinesChart,
        data: sampleData.radar,
      },
      {
        type: 'radar-dots',
        title: 'Radar Dots Chart',
        description: 'Radar chart with dot markers',
        component: RadarDotsChart,
        data: sampleData.radar,
      },
    ],
  },
];

export default function GraphsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020202]">
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6">
              Chart Types
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Explore our comprehensive collection of data visualization charts, 
              each designed to tell your data&apos;s story beautifully.
            </p>
          </div>
        </div>
      </section>

      {/* Charts Showcase */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {chartCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-32 last:mb-0">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
                    {category.name}
                  </h2>
                  <div className="h-px w-24 bg-gradient-to-r from-[#ec3e52] to-[#2b6ac4] mb-4"></div>
                  <p className="text-lg text-muted-foreground max-w-3xl">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.charts.map((chart, chartIndex) => {
                    const ChartComponent = chart.component;
                    type ChartDataItem = {
                      label: string;
                      value: number;
                      value2?: number;
                      color?: string;
                    };
                    const chartData = chart.data.map((item: ChartDataItem) => ({
                      ...item,
                      label: item.label,
                      value: item.value,
                      value2: item.value2,
                      color: item.color,
                    }));

                    const isStacked = chart.type === 'stacked-bar' || chart.type === 'stacked-area' || chart.type === 'stacked-line' || chart.type === 'stacked-line-dots';
                    const isPie = chart.type === 'pie' || chart.type === 'donut';

                    return (
                      <div
                        key={chartIndex}
                        className="group"
                      >
                        <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col">
                          <div className="mb-4 flex-1">
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {chart.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {chart.description}
                            </p>
                          </div>
                          
                          <div className="relative h-64 w-full bg-transparent rounded-lg overflow-hidden">
                            {isPie ? (
                              <ChartComponent
                                {...({
                                  data: chartData,
                                  category: "value",
                                  index: "label",
                                  colors: chartData.map((d: ChartDataItem) => d.color || '#9B99FE'),
                                  chartColor: "#9B99FE",
                                  chartColor2: "#2BC8B7",
                                  backgroundColor: "transparent",
                                  gridColor: "rgba(255, 255, 255, 0.1)",
                                  textColor: "rgba(255, 255, 255, 0.8)",
                                  valueFormatter: (value: number) => `${value}`,
                                  showLegend: false,
                                  showXAxis: true,
                                  showYAxis: true,
                                  mt: "h-full"
                                } as Record<string, unknown>)}
                              />
                            ) : (
                              <ChartComponent
                                {...({
                                  data: chartData,
                                  categories: isStacked ? ['value', 'value2'] : ['value'],
                                  index: "label",
                                  colors: ['#9B99FE'],
                                  chartColor: "#9B99FE",
                                  chartColor2: "#2BC8B7",
                                  backgroundColor: "transparent",
                                  gridColor: "rgba(255, 255, 255, 0.1)",
                                  textColor: "rgba(255, 255, 255, 0.8)",
                                  valueFormatter: (value: number) => `${value}`,
                                  showLegend: false,
                                  showXAxis: true,
                                  showYAxis: true,
                                  mt: "h-full"
                                } as Record<string, unknown>)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
