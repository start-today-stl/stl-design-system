import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadialChart } from "../src/charts/radial-chart"

const meta = {
  title: "Charts/RadialChart",
  component: RadialChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadialChart>

export default meta
type Story = StoryObj<typeof meta>

const potionData = [
  { name: "Potion A", value: 90 },
  { name: "Potion B", value: 75 },
  { name: "Potion C", value: 60 },
  { name: "Potion D", value: 45 },
  { name: "Potion E", value: 30 },
]

export const Default: Story = {
  args: {
    data: potionData,
    centerLabel: "90%",
    centerSubLabel: "Score",
    legend: [
      { label: "Potion A" },
      { label: "Potion B" },
      { label: "Potion C" },
      { label: "Potion D" },
      { label: "Potion E" },
    ],
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const SyncedCenter: Story = {
  args: {
    data: potionData,
    centerLabelFormatter: (active) => (active ? `${active.value}%` : "—"),
    centerSubLabelFormatter: (active) =>
      active ? active.name : "호버 / 클릭 → 고정",
    legend: [
      { label: "Potion A" },
      { label: "Potion B" },
      { label: "Potion C" },
      { label: "Potion D" },
      { label: "Potion E" },
    ],
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const WithTrack: Story = {
  args: {
    data: potionData,
    centerLabel: "90%",
    showTrack: true,
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const SingleRing: Story = {
  args: {
    data: [{ name: "Progress", value: 72 }],
    centerLabel: "72%",
    centerSubLabel: "완료",
    size: 200,
    barSize: 12,
    tooltipFormatter: (v) => `${v}%`,
  },
}

export const CustomColors: Story = {
  args: {
    data: [
      { name: "성공", value: 80, color: "var(--color-green-500)" },
      { name: "진행중", value: 60, color: "var(--color-primary)" },
      { name: "실패", value: 20, color: "var(--color-red-500)" },
    ],
    centerLabel: "80%",
    centerSubLabel: "성공률",
    legend: [{ label: "성공" }, { label: "진행중" }, { label: "실패" }],
    tooltipFormatter: (v) => `${v}%`,
  },
}
