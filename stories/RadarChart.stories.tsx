import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadarChart } from "../src/charts/radar-chart"

const meta = {
  title: "Charts/RadarChart",
  component: RadarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadarChart>

export default meta
type Story = StoryObj<typeof meta>

const singleSeriesData = [
  { axis: "정시 출고", value: 92 },
  { axis: "재고 정확도", value: 88 },
  { axis: "검수 정확도", value: 95 },
  { axis: "처리 속도", value: 78 },
  { axis: "고객 만족", value: 85 },
  { axis: "비용 효율", value: 72 },
]

const multiSeriesData = [
  { axis: "정시 출고", centerA: 92, centerB: 80 },
  { axis: "재고 정확도", centerA: 88, centerB: 85 },
  { axis: "검수 정확도", centerA: 95, centerB: 90 },
  { axis: "처리 속도", centerA: 78, centerB: 88 },
  { axis: "고객 만족", centerA: 85, centerB: 75 },
  { axis: "비용 효율", centerA: 72, centerB: 82 },
]

export const Default: Story = {
  args: {
    title: "18 Elements of Data",
    data: [
      { axis: "01", value: 85 },
      { axis: "02", value: 70 },
      { axis: "03", value: 92 },
      { axis: "04", value: 65 },
      { axis: "05", value: 80 },
      { axis: "06", value: 55 },
      { axis: "07", value: 75 },
      { axis: "08", value: 88 },
      { axis: "09", value: 60 },
      { axis: "10", value: 78 },
      { axis: "11", value: 82 },
      { axis: "12", value: 68 },
      { axis: "13", value: 90 },
      { axis: "14", value: 72 },
      { axis: "15", value: 85 },
      { axis: "16", value: 58 },
      { axis: "17", value: 70 },
      { axis: "18", value: 80 },
    ],
    series: [{ key: "value", name: "점수" }],
    size: 320,
  },
}

export const WithAxisLabels: Story = {
  args: {
    title: "센터 KPI",
    data: singleSeriesData,
    series: [{ key: "value", name: "평균" }],
    showAxisLabels: true,
    tooltipFormatter: (v) => `${v}점`,
  },
}

export const MultiSeries: Story = {
  args: {
    data: multiSeriesData,
    series: [
      { key: "centerA", name: "1센터" },
      { key: "centerB", name: "2센터" },
    ],
    tooltipFormatter: (v) => `${v}점`,
  },
}

export const ManyAxes: Story = {
  args: {
    data: [
      { axis: "지표 1", value: 80 },
      { axis: "지표 2", value: 65 },
      { axis: "지표 3", value: 90 },
      { axis: "지표 4", value: 78 },
      { axis: "지표 5", value: 85 },
      { axis: "지표 6", value: 72 },
      { axis: "지표 7", value: 88 },
      { axis: "지표 8", value: 60 },
      { axis: "지표 9", value: 75 },
      { axis: "지표 10", value: 92 },
      { axis: "지표 11", value: 68 },
      { axis: "지표 12", value: 80 },
    ],
    series: [{ key: "value", name: "종합 점수" }],
    size: 320,
    tooltipFormatter: (v) => `${v}`,
  },
}

export const CustomColors: Story = {
  args: {
    data: multiSeriesData,
    series: [
      { key: "centerA", name: "1센터", color: "var(--color-primary)" },
      { key: "centerB", name: "2센터", color: "var(--color-green-500)" },
    ],
    fillOpacity: 0.25,
    tooltipFormatter: (v) => `${v}점`,
  },
}

export const NoGrid: Story = {
  args: {
    data: singleSeriesData,
    series: [{ key: "value", name: "평균" }],
    showGrid: false,
    tooltipFormatter: (v) => `${v}점`,
  },
}
