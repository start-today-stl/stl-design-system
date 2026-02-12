import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToggleGroup } from "../src/components/ui/toggle-group"

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 토글 그룹 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("all")

    return (
      <ToggleGroup
        value={value}
        onValueChange={setValue}
        options={[
          { label: "전체", value: "all" },
          { label: "판매중", value: "active" },
          { label: "품절", value: "soldout" },
        ]}
      />
    )
  },
}

/** 라벨이 있는 토글 그룹 */
export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState("all")

    return (
      <ToggleGroup
        label="상태"
        value={value}
        onValueChange={setValue}
        options={[
          { label: "전체", value: "all" },
          { label: "판매중", value: "active" },
          { label: "품절", value: "soldout" },
          { label: "단종", value: "discontinued" },
        ]}
      />
    )
  },
}

/** 기본값 설정 (비제어) */
export const WithDefaultValue: Story = {
  args: {
    defaultValue: "active",
    options: [
      { label: "전체", value: "all" },
      { label: "판매중", value: "active" },
      { label: "품절", value: "soldout" },
    ],
  },
}

/** 비활성화된 옵션 */
export const WithDisabledOption: Story = {
  render: () => {
    const [value, setValue] = useState("all")

    return (
      <ToggleGroup
        label="배송 상태"
        value={value}
        onValueChange={setValue}
        options={[
          { label: "전체", value: "all" },
          { label: "배송준비", value: "preparing" },
          { label: "배송중", value: "shipping" },
          { label: "배송완료", value: "delivered", disabled: true },
        ]}
      />
    )
  },
}

/** 전체 비활성화 */
export const Disabled: Story = {
  args: {
    label: "상태",
    defaultValue: "all",
    disabled: true,
    options: [
      { label: "전체", value: "all" },
      { label: "판매중", value: "active" },
      { label: "품절", value: "soldout" },
    ],
  },
}

/** 두 개 옵션 */
export const TwoOptions: Story = {
  render: () => {
    const [value, setValue] = useState("active")

    return (
      <ToggleGroup
        label="활성 여부"
        value={value}
        onValueChange={setValue}
        options={[
          { label: "활성", value: "active" },
          { label: "비활성", value: "inactive" },
        ]}
      />
    )
  },
}
