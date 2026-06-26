import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScatterChart } from "../src/charts/scatter-chart"

const meta = {
  title: "Charts/ScatterChart",
  component: ScatterChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>

export default meta
type Story = StoryObj<typeof meta>

// 피그마 "Positioning Map" 매칭 데이터
const positioningData = [
  { x: 3, y: 110, name: "센터 A" },
  { x: 3, y: 310, name: "센터 B" },
  { x: 5, y: 170, name: "센터 C" },
  { x: 5, y: 300, name: "센터 D" },
  { x: 6, y: 250, name: "센터 E" },
  { x: 6, y: 350, name: "센터 F" },
  { x: 7, y: 160, name: "센터 G" },
  { x: 7, y: 350, name: "센터 H" },
  { x: 7, y: 450, name: "센터 I" },
  { x: 8, y: 300, name: "센터 J" },
  { x: 8, y: 450, name: "센터 K" },
  { x: 8, y: 530, name: "센터 L" },
  { x: 9, y: 300, name: "센터 M" },
  { x: 9, y: 420, name: "센터 N" },
  { x: 9, y: 450, name: "센터 O" },
  { x: 9, y: 480, name: "센터 P" },
  { x: 10, y: 450, name: "센터 Q" },
]

export const Default: Story = {
  args: {
    title: "Positioning Map",
    series: [{ name: "Positioning Map", data: positioningData }],
    xDomain: [0, 10],
    yDomain: [0, 600],
    height: 280,
    className: "w-[480px]",
  },
}

export const NoTrendLine: Story = {
  args: {
    title: "Positioning Map",
    series: [{ name: "Positioning Map", data: positioningData }],
    xDomain: [0, 10],
    yDomain: [0, 600],
    trendLine: false,
    height: 280,
    className: "w-[480px]",
  },
}

export const WithTickFormatter: Story = {
  args: {
    title: "Positioning Map",
    series: [{ name: "Positioning Map", data: positioningData }],
    xDomain: [0, 10],
    yDomain: [0, 600],
    xTickFormatter: (v) => v.toString().padStart(2, "0"),
    yTickFormatter: (v) => `${v}건`,
    height: 280,
    className: "w-[480px]",
  },
}

export const MultiSeries: Story = {
  args: {
    title: "센터별 처리량",
    series: [
      {
        name: "1센터",
        data: [
          { x: 2, y: 200 },
          { x: 4, y: 280 },
          { x: 6, y: 360 },
          { x: 7, y: 410 },
          { x: 8, y: 480 },
        ],
      },
      {
        name: "2센터",
        data: [
          { x: 3, y: 150 },
          { x: 5, y: 230 },
          { x: 6, y: 300 },
          { x: 8, y: 380 },
          { x: 9, y: 450 },
        ],
      },
    ],
    xDomain: [0, 10],
    yDomain: [0, 600],
    height: 280,
    className: "w-[480px]",
  },
}
