"use client";

// Not from the doc page: the printed notes-card.tsx imports this from
// "./_components/..." but the page does not print it. Minimal stand-in.

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
}

export function Button({ variant: _variant, size: _size, className = "", ...props }: ButtonProps) {
  return <button className={`rounded border px-3 py-1 ${className}`} {...props} />;
}
