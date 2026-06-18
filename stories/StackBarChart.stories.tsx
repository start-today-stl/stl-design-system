import type { Meta, StoryObj } from "@storybook/react-vite"

import { StackBarChart } from "../src/charts/stack-bar-chart"

const meta = {
  title: "Charts/StackBarChart",
  component: StackBarChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StackBarChart>

export default meta
type Story = StoryObj<typeof meta>

// 부분-전체: 각 월의 상태 구성 (완료 + 진행중)
const statusData = [
  { month: "01", completed: 70, inProgress: 30 },
  { month: "02", completed: 65, inProgress: 35 },
  { month: "03", completed: 80, inProgress: 20 },
  { month: "04", completed: 55, inProgress: 45 },
  { month: "05", completed: 42, inProgress: 18 },
  { month: "06", completed: 30, inProgress: 10 },
  { month: "07", completed: 25, inProgress: 8 },
  { month: "08", completed: 18, inProgress: 5 },
  { month: "09", completed: 12, inProgress: 4 },
  { month: "10", completed: 10, inProgress: 3 },
  { month: "11", completed: 7, inProgress: 2 },
  { month: "12", completed: 5, inProgress: 1 },
]

// LMS 대시보드 패턴: 센터별 출고방식 비율 누적
const centerCompletionData = [
  { center: "1센터", domesticB2c: 28, b2b: 22, overseas: 30, kandotsu: 10 },
  { center: "2센터", domesticB2c: 35, b2b: 20, overseas: 15, kandotsu: 8 },
  { center: "3센터", domesticB2c: 20, b2b: 25, overseas: 18, kandotsu: 12 },
  { center: "4센터", domesticB2c: 15, b2b: 18, overseas: 22, kandotsu: 6 },
  { center: "5센터", domesticB2c: 10, b2b: 12, overseas: 14, kandotsu: 4 },
]

export const Default: Story = {
  args: {
    data: statusData,
    xKey: "month",
    bars: [
      { dataKey: "completed", name: "완료" },
      { dataKey: "inProgress", name: "진행중" },
    ],
    tooltipLabel: "건수",
    tooltipFormatter: (value) => `${value}건`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <StackBarChart {...args} />
    </div>
  ),
}

export const Minimal: Story = {
  args: {
    data: statusData,
    xKey: "month",
    bars: [
      { dataKey: "completed", name: "완료" },
      { dataKey: "inProgress", name: "진행중" },
    ],
    showXAxis: false,
    showYAxis: false,
    showGrid: false,
    height: 160,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <StackBarChart {...args} />
    </div>
  ),
}

export const WithLegend: Story = {
  args: {
    data: statusData,
    xKey: "month",
    bars: [
      { dataKey: "completed", name: "완료" },
      { dataKey: "inProgress", name: "진행중" },
    ],
    legend: [{ label: "완료" }, { label: "진행중" }],
    tooltipLabel: "건수",
    tooltipFormatter: (v) => `${v}건`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <StackBarChart {...args} />
    </div>
  ),
}

export const RoundedTop: Story = {
  args: {
    data: statusData,
    xKey: "month",
    bars: [
      { dataKey: "completed", name: "완료" },
      { dataKey: "inProgress", name: "진행중" },
    ],
    barRadius: 4,
    tooltipLabel: "건수",
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <StackBarChart {...args} />
    </div>
  ),
}

export const CustomColors: Story = {
  args: {
    data: statusData,
    xKey: "month",
    bars: [
      { dataKey: "completed", name: "성공", color: "var(--color-green-500)" },
      { dataKey: "inProgress", name: "실패", color: "var(--color-red-500)" },
    ],
    legend: [{ label: "성공" }, { label: "실패" }],
    tooltipLabel: "건수",
    tooltipFormatter: (v) => `${v}건`,
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <StackBarChart {...args} />
    </div>
  ),
}

export const Horizontal: Story = {
  args: {
    data: centerCompletionData,
    xKey: "center",
    bars: [
      { dataKey: "domesticB2c", name: "국내 B2C", color: "var(--color-blue-500)" },
      { dataKey: "b2b", name: "B2B", color: "var(--color-blue-300)" },
      { dataKey: "overseas", name: "해외 일반", color: "var(--color-green-500)" },
      { dataKey: "kandotsu", name: "해외 칸닷슈", color: "var(--color-red-500)" },
    ],
    legend: [
      { label: "국내 B2C" },
      { label: "B2B" },
      { label: "해외 일반" },
      { label: "해외 칸닷슈" },
    ],
    orientation: "horizontal",
    barRadius: 8,
    tooltipLabel: "완료율",
    tooltipFormatter: (v) => `${v}%`,
  },
  render: (args) => (
    <div style={{ width: 640 }}>
      <StackBarChart {...args} />
    </div>
  ),
}
