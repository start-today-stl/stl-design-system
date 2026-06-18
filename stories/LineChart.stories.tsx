import type { Meta, StoryObj } from "@storybook/react-vite"

import { LineChart } from "../src/charts/line-chart"

const meta = {
  title: "Charts/LineChart",
  component: LineChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

const compareData = [
  { day: "06-08", current: 0, previous: 4 },
  { day: "06-09", current: 1, previous: 6 },
  { day: "06-10", current: 2, previous: 5 },
  { day: "06-11", current: 2, previous: 5 },
  { day: "06-12", current: 3, previous: 6 },
  { day: "06-13", current: 4, previous: 6 },
  { day: "06-14", current: 5, previous: 3 },
  { day: "06-15", current: 2, previous: 3 },
  { day: "06-16", current: 6, previous: 2 },
  { day: "06-17", current: 7, previous: -1 },
]

export const SingleLine: Story = {
  args: {
    data: compareData,
    xKey: "day",
    lines: [{ dataKey: "current", name: "현재 주" }],
    tooltipLabel: "Now Sales Rate",
    tooltipFormatter: (value) => `${value.toLocaleString()}$`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <LineChart {...args} />
    </div>
  ),
}

export const MultiLine: Story = {
  args: {
    data: compareData,
    xKey: "day",
    lines: [
      { dataKey: "current", name: "현재 주" },
      { dataKey: "previous", name: "지난 주" },
    ],
    tooltipLabel: "Now Sales Rate",
    tooltipFormatter: (value) => `${value.toLocaleString()}$`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <LineChart {...args} />
    </div>
  ),
}

export const CustomColors: Story = {
  args: {
    data: compareData,
    xKey: "day",
    lines: [
      { dataKey: "current", name: "성공", color: "var(--color-green-500)" },
      { dataKey: "previous", name: "실패", color: "var(--color-red-500)" },
    ],
    tooltipLabel: "건수",
    tooltipFormatter: (value) => `${value}건`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <LineChart {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    data: compareData,
    xKey: "day",
    lines: [{ dataKey: "current" }],
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    showDots: false,
    height: 120,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <LineChart {...args} />
    </div>
  ),
}
