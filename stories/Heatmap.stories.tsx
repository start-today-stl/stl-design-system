import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heatmap } from "../src/charts/heatmap"

const meta = {
  title: "Charts/Heatmap",
  component: Heatmap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heatmap>

export default meta
type Story = StoryObj<typeof meta>

// 12행(1~12월) × 31열(1~31일) — 듬성듬성한 핫스팟 분포
const generateMonthlyRate = (): number[][] => {
  // 핫스팟 중심들 (col, row, intensity). row=0 은 12월, row=11 은 1월
  const hotspots = [
    { c: 5, r: 3, intensity: 12 },
    { c: 7, r: 1, intensity: 10 },
    { c: 14, r: 2, intensity: 11 },
    { c: 15, r: 4, intensity: 8 },
    { c: 23, r: 3, intensity: 12 },
    { c: 25, r: 2, intensity: 9 },
    { c: 8, r: 7, intensity: 7 },
    { c: 21, r: 8, intensity: 6 },
    { c: 12, r: 10, intensity: 8 },
  ]
  const rows: number[][] = []
  for (let r = 0; r < 12; r++) {
    const row: number[] = []
    for (let c = 0; c < 31; c++) {
      let val = 0
      for (const hot of hotspots) {
        const dist = Math.sqrt((c - hot.c) ** 2 + (r - hot.r) ** 2)
        // 좁은 반경(2.5) 안에서만 영향 → 핫스팟 외 영역은 거의 0
        if (dist < 2.5) {
          val += Math.max(0, hot.intensity * (1 - dist / 2.5))
        }
      }
      row.push(Math.round(val))
    }
    rows.push(row)
  }
  return rows
}

const monthlyData = generateMonthlyRate()

// 빽빽한 분포 — NoLegend 데모용
const generateDenseRate = (): number[][] => {
  const rows: number[][] = []
  for (let r = 0; r < 12; r++) {
    const row: number[] = []
    for (let c = 0; c < 31; c++) {
      const d1 = Math.sqrt((c - 6) ** 2 + (r - 3) ** 2)
      const d2 = Math.sqrt((c - 15) ** 2 + (r - 2) ** 2)
      const d3 = Math.sqrt((c - 24) ** 2 + (r - 4) ** 2)
      const val =
        Math.max(0, 10 - d1) +
        Math.max(0, 8 - d2) +
        Math.max(0, 9 - d3) +
        Math.random() * 2
      row.push(Math.round(val))
    }
    rows.push(row)
  }
  return rows
}
const denseData = generateDenseRate()

const xLabels = Array.from({ length: 31 }, (_, i) => i + 1)
const yLabels = Array.from({ length: 12 }, (_, i) => 12 - i)

export const Default: Story = {
  args: {
    title: "Monthly Rate",
    data: monthlyData,
    xLabels,
    yLabels,
  },
}

export const Compact: Story = {
  args: {
    title: "Weekly Rate",
    data: [
      [5, 8, 12, 6, 3, 1, 0],
      [3, 6, 10, 8, 5, 2, 1],
      [1, 4, 8, 12, 9, 6, 3],
      [0, 2, 5, 10, 14, 11, 7],
    ],
    xLabels: ["월", "화", "수", "목", "금", "토", "일"],
    yLabels: ["1주", "2주", "3주", "4주"],
    cellSize: 32,
    tooltipFormatter: (value, x, y) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {y} {x}요일
        </span>
        <span className="font-medium">{value}건</span>
      </div>
    ),
  },
}

export const NoLegend: Story = {
  args: {
    title: "Monthly Rate (범례 없음)",
    data: denseData,
    xLabels,
    yLabels,
    showLegend: false,
  },
}

export const CustomColor: Story = {
  args: {
    title: "성공률",
    data: monthlyData,
    xLabels,
    yLabels,
    color: "var(--color-green-500)",
    legendLabel: () => "Sort Deep Green",
  },
}
