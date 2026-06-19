import type { Meta, StoryObj } from "@storybook/react-vite"

import { GaugeChart } from "../src/charts/gauge-chart"

const meta = {
  title: "Charts/GaugeChart",
  component: GaugeChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GaugeChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 99,
    caption: "99% of Accuracy of shipping",
    badge: 68,
  },
}

export const WithoutBadge: Story = {
  args: {
    value: 72,
    caption: "72% 완료율",
  },
}

export const WithoutTrack: Story = {
  args: {
    value: 50,
    caption: "50%",
    showTrack: false,
  },
}

export const CustomColor: Story = {
  args: {
    value: 85,
    caption: "85% 성공률",
    color: "var(--color-green-500)",
    badge: "Target",
  },
}

export const Large: Story = {
  args: {
    value: 90,
    caption: "90% 만족도",
    size: 320,
    badge: 100,
  },
}

export const ThinRing: Story = {
  args: {
    value: 65,
    caption: "65% 진행",
    innerRadiusRatio: 0.7,
  },
}
