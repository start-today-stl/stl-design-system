import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
      description: "에러 상태",
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/** 기본 인풋 */
export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    className: "w-[260px]",
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    error: true,
    placeholder: "내용을 채워주세요.",
    className: "w-[260px]",
  },
}

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    disabled: true,
    className: "w-[260px]",
  },
}

/** 값이 입력된 상태 */
export const WithValue: Story = {
  args: {
    defaultValue: "입력된 내용",
    className: "w-[260px]",
    "aria-label": "입력 필드",
  },
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Default</span>
        <Input placeholder="내용을 입력하세요." className="w-[260px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <Input error placeholder="내용을 채워주세요." className="w-[260px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <Input placeholder="내용을 입력하세요." disabled className="w-[260px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Value</span>
        <Input defaultValue="입력된 내용" className="w-[260px]" aria-label="입력 필드" />
      </div>
    </div>
  ),
}
