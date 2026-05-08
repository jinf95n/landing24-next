"use client";

export type ChartConfig = Record<string, { label?: string; color?: string }>;

export const ChartContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ChartTooltip = () => null;
export const ChartTooltipContent = () => null;
export const ChartLegend = () => null;
export const ChartLegendContent = () => null;
export const ChartStyle = () => null;