import type { Meta, StoryObj } from "@storybook/react-vite"

import { BarChart } from "../src/charts/bar-chart"

const meta = {
  title: "Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

const satisfactionData = [
  { month: "01", value: 5 },
  { month: "02", value: 8 },
  { month: "03", value: 10 },
  { month: "04", value: 15 },
  { month: "05", value: 22 },
  { month: "06", value: 30 },
  { month: "07", value: 42 },
  { month: "08", value: 60 },
  { month: "09", value: 78 },
  { month: "10", value: 90 },
  { month: "11", value: 85 },
  { month: "12", value: 75 },
]

const yearComparisonData = [
  ...Array.from({ length: 12 }, (_, i) => ({
    label: `25/${String(i + 1).padStart(2, "0")}`,
    value: Math.round(20 + Math.sin(i * 0.6) * 30 + i * 4),
    year: 25,
  })),
  ...Array.from({ length: 9 }, (_, i) => ({
    label: `26/${String(i + 1).padStart(2, "0")}`,
    value: Math.round(80 - i * 6),
    year: 26,
  })),
]

const centerSales = [
  { center: "1센터", sales: 240 },
  { center: "2센터", sales: 180 },
  { center: "3센터", sales: 120 },
  { center: "4센터", sales: 90 },
  { center: "5센터", sales: 65 },
]

export const Default: Story = {
  args: {
    data: satisfactionData,
    xKey: "month",
    yKey: "value",
    tooltipLabel: "값",
    tooltipFormatter: (v) => `${v}`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <BarChart {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    data: satisfactionData,
    xKey: "month",
    yKey: "value",
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    height: 160,
    tooltipLabel: "값",
    tooltipFormatter: (v) => `${v}`,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <BarChart {...args} />
    </div>
  ),
}

export const HighlightMax: Story = {
  args: {
    data: satisfactionData,
    xKey: "month",
    yKey: "value",
    highlightMax: true,
    showGrid: false,
    tooltipLabel: "값",
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <BarChart {...args} />
    </div>
  ),
}

export const ColorByYear: Story = {
  args: {
    data: yearComparisonData,
    xKey: "label",
    yKey: "value",
    colorBy: (row) =>
      (row as { year: number }).year === 25
        ? "var(--color-primary)"
        : "var(--color-blue-300)",
    legend: [{ label: "2025" }, { label: "2026" }],
    tooltipLabel: "월별 값",
  },
  render: (args) => (
    <div style={{ width: 720 }}>
      <BarChart {...args} />
    </div>
  ),
}

export const CustomColor: Story = {
  args: {
    data: satisfactionData,
    xKey: "month",
    yKey: "value",
    color: "var(--color-green-500)",
    tooltipLabel: "건수",
    tooltipFormatter: (v) => `${v}건`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <BarChart {...args} />
    </div>
  ),
}

export const Horizontal: Story = {
  args: {
    data: centerSales,
    xKey: "center",
    yKey: "sales",
    orientation: "horizontal",
    tooltipLabel: "매출",
    tooltipFormatter: (v) => `${v.toLocaleString()}만원`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <BarChart {...args} />
    </div>
  ),
}
