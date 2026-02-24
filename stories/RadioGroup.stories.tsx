import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem, RadioGroupField } from "@/components/ui/radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

/** 기본 라디오 그룹 */
export const Default: Story = {
  render: () => (
    <RadioGroupField label="옵션 선택" defaultValue="option1">
      <RadioGroupItem value="option1" label="옵션 1" />
      <RadioGroupItem value="option2" label="옵션 2" />
      <RadioGroupItem value="option3" label="옵션 3" />
    </RadioGroupField>
  ),
}

/** 라벨 없이 */
export const WithoutLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="flex gap-4">
      <RadioGroupItem value="a" aria-label="옵션 A" />
      <RadioGroupItem value="b" aria-label="옵션 B" />
      <RadioGroupItem value="c" aria-label="옵션 C" />
    </RadioGroup>
  ),
}

/** 가로 배치 */
export const Horizontal: Story = {
  render: () => (
    <RadioGroupField label="언어 선택" defaultValue="ko" className="flex gap-6">
      <RadioGroupItem value="ko" label="한국어" />
      <RadioGroupItem value="en" label="English" />
      <RadioGroupItem value="ja" label="日本語" />
    </RadioGroupField>
  ),
}

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1" label="선택됨 (비활성화)" disabled />
      <RadioGroupItem value="option2" label="옵션 2 (비활성화)" disabled />
    </RadioGroup>
  ),
}

/** Controlled */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState("medium")

    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="small" label="Small" />
          <RadioGroupItem value="medium" label="Medium" />
          <RadioGroupItem value="large" label="Large" />
        </RadioGroup>
        <p className="text-xs text-slate-500">선택된 값: {value}</p>
      </div>
    )
  },
}

/** Variant 변형 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">Primary (기본)</span>
        <RadioGroup defaultValue="a" className="flex gap-4">
          <RadioGroupItem value="a" variant="primary" label="옵션 A" />
          <RadioGroupItem value="b" variant="primary" label="옵션 B" />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">Success</span>
        <RadioGroup defaultValue="a" className="flex gap-4">
          <RadioGroupItem value="a" variant="success" label="옵션 A" />
          <RadioGroupItem value="b" variant="success" label="옵션 B" />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">Danger</span>
        <RadioGroup defaultValue="a" className="flex gap-4">
          <RadioGroupItem value="a" variant="danger" label="옵션 A" />
          <RadioGroupItem value="b" variant="danger" label="옵션 B" />
        </RadioGroup>
      </div>
    </div>
  ),
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroupField label="기본" defaultValue="a">
        <RadioGroupItem value="a" label="옵션 A" />
        <RadioGroupItem value="b" label="옵션 B" />
      </RadioGroupField>
      <RadioGroupField label="가로 배치" defaultValue="x" className="flex gap-6">
        <RadioGroupItem value="x" label="X" />
        <RadioGroupItem value="y" label="Y" />
        <RadioGroupItem value="z" label="Z" />
      </RadioGroupField>
      <RadioGroupField label="비활성화" defaultValue="selected" disabled>
        <RadioGroupItem value="selected" label="선택됨" />
        <RadioGroupItem value="unselected" label="선택 안됨" />
      </RadioGroupField>
    </div>
  ),
}
