"use client";

// Not from the doc page: the page's printed code imports this component but
// does not print it. Minimal stand-in, labelled as such.

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  title: string;
  description?: string;
  data: { label: string; value: number }[];
}

export function BarChart({ title, description, data }: BarChartProps) {
  return (
    <div className="my-3 rounded border p-4">
      <div className="font-semibold">{title}</div>
      {description ? <div className="text-sm">{description}</div> : null}
      <ResponsiveContainer width="100%" height={240}>
        <RechartsBarChart data={Array.isArray(data) ? data : []}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
