import type { Meta, StoryObj } from "@storybook/react-vite"

import { AreaChart } from "../src/charts/area-chart"

const meta = {
  title: "Charts/AreaChart",
  component: AreaChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>

export default meta
type Story = StoryObj<typeof meta>

const salesData = [
  { day: "06-08", sales: 0 },
  { day: "06-09", sales: 3 },
  { day: "06-10", sales: 3 },
  { day: "06-11", sales: 2 },
  { day: "06-12", sales: 4 },
  { day: "06-13", sales: 5 },
  { day: "06-14", sales: 4 },
  { day: "06-15", sales: 2 },
  { day: "06-16", sales: 5 },
  { day: "06-17", sales: 7 },
]

export const Default: Story = {
  args: {
    data: salesData,
    xKey: "day",
    yKey: "sales",
    tooltipLabel: "Now Sales Rate",
    tooltipFormatter: (value) => `${value.toLocaleString()}$`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <AreaChart {...args} />
    </div>
  ),
}

export const SmallDataset: Story = {
  args: {
    data: [
      { x: "Jan", y: 1 },
      { x: "Feb", y: 4 },
      { x: "Mar", y: 2 },
      { x: "Apr", y: 6 },
    ],
    xKey: "x",
    yKey: "y",
    tooltipLabel: "값",
    tooltipFormatter: (value) => `${value}`,
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <AreaChart {...args} />
    </div>
  ),
}

export const NoGrid: Story = {
  args: {
    data: salesData,
    xKey: "day",
    yKey: "sales",
    showGrid: false,
    tooltipLabel: "Sales",
    tooltipFormatter: (value) => `${value}$`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <AreaChart {...args} />
    </div>
  ),
}

export const NoDots: Story = {
  args: {
    data: salesData,
    xKey: "day",
    yKey: "sales",
    showDots: false,
    tooltipLabel: "Sales",
    tooltipFormatter: (value) => `${value}$`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <AreaChart {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    data: salesData,
    xKey: "day",
    yKey: "sales",
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    showDots: false,
    height: 120,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <AreaChart {...args} />
    </div>
  ),
}
