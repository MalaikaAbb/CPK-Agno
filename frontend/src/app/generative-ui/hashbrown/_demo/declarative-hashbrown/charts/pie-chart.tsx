"use client";

// Not from the doc page: the page's printed code imports this component but
// does not print it. Minimal stand-in, labelled as such.

import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  title: string;
  description?: string;
  data: { label: string; value: number }[];
}

export function PieChart({ title, description, data }: PieChartProps) {
  return (
    <div className="my-3 rounded border p-4">
      <div className="font-semibold">{title}</div>
      {description ? <div className="text-sm">{description}</div> : null}
      <ResponsiveContainer width="100%" height={240}>
        <RechartsPieChart>
          <Pie
            data={Array.isArray(data) ? data : []}
            dataKey="value"
            nameKey="label"
            fill="#8884d8"
            label
          />
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
