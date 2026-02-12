import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "@/components/ui/slider"

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Slider>

/** 기본 슬라이더 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} />
    </div>
  ),
}

/** 라벨 포함 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="볼륨" defaultValue={[50]} />
    </div>
  ),
}

/** 툴팁 표시 */
export const WithTooltip: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="밝기" defaultValue={[75]} showTooltip />
    </div>
  ),
}

/** Min/Max 라벨 표시 */
export const WithLabels: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="투명도" defaultValue={[30]} showLabels />
    </div>
  ),
}

/** 툴팁 + Min/Max 라벨 모두 표시 */
export const WithTooltipAndLabels: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider
        label="크기 조절"
        defaultValue={[60]}
        showTooltip
        showLabels
      />
    </div>
  ),
}

/** 커스텀 범위 */
export const CustomRange: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider
        label="온도 (°C)"
        min={-10}
        max={40}
        defaultValue={[20]}
        showTooltip
        showLabels
      />
    </div>
  ),
}

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="비활성화됨" defaultValue={[50]} disabled />
    </div>
  ),
}

/** Controlled */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState([25])

    return (
      <div className="w-[300px] flex flex-col gap-4">
        <Slider
          label="조절 가능"
          value={value}
          onValueChange={setValue}
          showTooltip
          showLabels
        />
        <p className="text-xs text-slate-500">현재 값: {value[0]}</p>
      </div>
    )
  },
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[300px]">
      <Slider label="기본" defaultValue={[50]} />
      <Slider label="툴팁 표시" defaultValue={[75]} showTooltip />
      <Slider label="라벨 표시" defaultValue={[30]} showLabels />
      <Slider
        label="툴팁 + 라벨"
        defaultValue={[60]}
        showTooltip
        showLabels
      />
      <Slider
        label="커스텀 범위"
        min={0}
        max={1000}
        defaultValue={[500]}
        showTooltip
        showLabels
      />
      <Slider label="비활성화" defaultValue={[50]} disabled />
    </div>
  ),
}
