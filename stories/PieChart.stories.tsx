import type { Meta, StoryObj } from "@storybook/react-vite"

import { PieChart } from "../src/charts/pie-chart"

const meta = {
  title: "Charts/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>

export default meta
type Story = StoryObj<typeof meta>

const sortColorData = [
  { name: "Sort Color 1", value: 45 },
  { name: "Sort Color 2", value: 25 },
  { name: "Sort Color 3", value: 18 },
  { name: "Sort Color 4", value: 8 },
  { name: "Sort Color 5", value: 4 },
]

export const Default: Story = {
  args: {
    data: sortColorData,
    centerLabel: "81%",
    centerSubLabel: "Satisfaction Rate",
    legend: [
      { label: "Sort Color 1" },
      { label: "Sort Color 2" },
      { label: "Sort Color 3" },
      { label: "Sort Color 4" },
      { label: "Sort Color 5" },
    ],
    badge: 68,
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const LegendBottom: Story = {
  args: {
    data: sortColorData,
    centerLabel: "81%",
    centerSubLabel: "Satisfaction Rate",
    legendPosition: "bottom",
    legend: [
      { label: "Sort Color 1" },
      { label: "Sort Color 2" },
      { label: "Sort Color 3" },
      { label: "Sort Color 4" },
      { label: "Sort Color 5" },
    ],
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const SyncedCenter: Story = {
  args: {
    data: sortColorData,
    centerLabelFormatter: (active) => (active ? `${active.value}%` : "전체"),
    centerSubLabelFormatter: (active) =>
      active ? active.name : "호버 / 클릭 → 고정",
    legend: [
      { label: "Sort Color 1" },
      { label: "Sort Color 2" },
      { label: "Sort Color 3" },
      { label: "Sort Color 4" },
      { label: "Sort Color 5" },
    ],
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const CustomColors: Story = {
  args: {
    data: [
      { name: "성공", value: 60, color: "var(--color-green-500)" },
      { name: "진행중", value: 25, color: "var(--color-primary)" },
      { name: "실패", value: 15, color: "var(--color-red-500)" },
    ],
    centerLabel: "60%",
    centerSubLabel: "성공률",
    legend: [{ label: "성공" }, { label: "진행중" }, { label: "실패" }],
    tooltipFormatter: (v) => `${v}건`,
  },
}
