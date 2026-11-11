"use client";

// Not from the doc page: the page's printed code imports this component but
// does not print it. Minimal stand-in, labelled as such.

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <div className="rounded border p-4">
      <p className="text-xs uppercase">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {trend && <p className="text-sm">{trend}</p>}
    </div>
  );
}
