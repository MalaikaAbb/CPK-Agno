"use client";

// Not from the doc page: the page's printed code imports this component but
// does not print it. Minimal stand-in, labelled as such.

export interface MetricCardComponentProps {
  label: string;
  value: string;
  trend?: string | null;
}

export function MetricCard({ label, value, trend }: MetricCardComponentProps) {
  return (
    <div className="rounded border p-4">
      <div className="text-xs uppercase">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {trend ? <div className="text-sm">{trend}</div> : null}
    </div>
  );
}
