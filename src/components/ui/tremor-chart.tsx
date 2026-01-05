import { Card, Title, AreaChart } from "@tremor/react";

interface ChartData {
  date: string;
  [key: string]: string | number;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  categories: string[];
  index: string;
  valueFormatter: (number: number) => string;
}

export function ShadCNChart({
  title,
  data,
  categories,
  index,
  valueFormatter,
}: ChartProps) {
  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className="mt-4 h-72"
        data={data}
        index={index}
        categories={categories}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
