import type { Meta, StoryObj } from "@storybook/react-vite"

import { BoxPlot } from "../src/charts/box-plot"

const meta = {
  title: "Charts/BoxPlot",
  component: BoxPlot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BoxPlot>

export default meta
type Story = StoryObj<typeof meta>

// 피그마 "Transaction success rate" 매칭 데이터 — 19개 카테고리
const transactionData = [
  { name: "1", q1: 30, median: 55, q3: 80 },
  { name: "2", q1: 35, median: 60, q3: 78 },
  { name: "3", q1: 40, median: 65, q3: 82 },
  { name: "4", q1: 45, median: 70, q3: 85 },
  { name: "5", q1: 50, median: 72, q3: 88 },
  { name: "6", q1: 48, median: 68, q3: 86 },
  { name: "7", q1: 52, median: 74, q3: 90 },
  { name: "8", q1: 55, median: 76, q3: 92 },
  { name: "9", q1: 58, median: 78, q3: 94 },
  { name: "10", q1: 60, median: 80, q3: 95 },
  { name: "11", q1: 62, median: 82, q3: 96 },
  { name: "12", q1: 64, median: 84, q3: 97 },
  { name: "13", q1: 66, median: 85, q3: 98 },
  { name: "14", q1: 65, median: 83, q3: 96 },
  { name: "15", q1: 63, median: 81, q3: 94 },
  { name: "16", q1: 61, median: 79, q3: 92 },
  { name: "17", q1: 58, median: 76, q3: 90 },
  { name: "18", q1: 55, median: 74, q3: 88 },
  { name: "19", q1: 52, median: 71, q3: 86 },
]

export const Default: Story = {
  args: {
    title: "Transaction success rate",
    data: transactionData,
    height: 200,
    className: "w-[480px]",
  },
}

export const WithAxes: Story = {
  args: {
    title: "Transaction success rate",
    data: transactionData,
    height: 240,
    showYAxis: true,
    showXAxis: true,
    yTickFormatter: (v) => `${v}%`,
    className: "w-[520px]",
  },
}

export const CustomTooltip: Story = {
  args: {
    title: "Transaction success rate",
    data: transactionData,
    height: 200,
    tooltipFormatter: (item) => (
      <div className="flex flex-col items-center">
        <span className="font-medium">{item.median}%</span>
      </div>
    ),
    className: "w-[480px]",
  },
}

// 적은 카테고리 (월별)
const monthlyData = [
  { name: "1월", q1: 40, median: 60, q3: 85 },
  { name: "2월", q1: 45, median: 65, q3: 82 },
  { name: "3월", q1: 50, median: 70, q3: 88 },
  { name: "4월", q1: 55, median: 75, q3: 90 },
  { name: "5월", q1: 60, median: 80, q3: 92 },
  { name: "6월", q1: 58, median: 78, q3: 90 },
]

export const Monthly: Story = {
  args: {
    title: "월별 성공률",
    data: monthlyData,
    height: 220,
    boxWidth: 12,
    showYAxis: true,
    showXAxis: true,
    yTickFormatter: (v) => `${v}%`,
    tooltipFormatter: (item) => (
      <div className="flex flex-col items-center">
        <span className="font-medium">{item.median}%</span>
      </div>
    ),
    className: "w-[480px]",
  },
}

export const CustomColors: Story = {
  args: {
    title: "성공률",
    data: transactionData,
    height: 200,
    upperColor: "var(--color-green-200)",
    lowerColor: "var(--color-slate-300)",
    activeUpperColor: "var(--color-green-500)",
    activeLowerColor: "var(--color-green-300)",
    className: "w-[480px]",
  },
}
