import type { Meta, StoryObj } from "@storybook/react"
import { Textarea, TextareaField } from "@/components/ui/textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
type Story = StoryObj<typeof Textarea>

/** 기본 텍스트아리아 */
export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    className: "w-[360px]",
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    error: true,
    placeholder: "내용을 채워주세요.",
    className: "w-[360px]",
  },
}

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    disabled: true,
    className: "w-[360px]",
  },
}

/** 값이 입력된 상태 */
export const WithValue: Story = {
  args: {
    defaultValue: "입력된 내용입니다.\n여러 줄로 입력할 수 있습니다.",
    className: "w-[360px]",
    "aria-label": "텍스트 입력 필드",
  },
}

/** TextareaField - 라벨 포함 */
export const WithLabel: Story = {
  render: () => (
    <TextareaField
      label="설명"
      placeholder="설명을 입력하세요."
      className="w-[360px]"
    />
  ),
}

/** TextareaField - 에러 메시지 포함 */
export const WithErrorMessage: Story = {
  render: () => (
    <TextareaField
      label="설명"
      placeholder="설명을 입력하세요."
      error
      errorMessage="설명은 필수 입력 항목입니다."
      className="w-[360px]"
    />
  ),
}

/** TextareaField - 필수 입력 표시 */
export const Required: Story = {
  render: () => (
    <TextareaField
      label="상품 설명"
      placeholder="상품 설명을 입력하세요."
      required
      className="w-[360px]"
    />
  ),
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Default</span>
        <Textarea placeholder="내용을 입력하세요." className="w-[360px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <Textarea error placeholder="내용을 채워주세요." className="w-[360px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <Textarea placeholder="내용을 입력하세요." disabled className="w-[360px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Value</span>
        <Textarea
          defaultValue="입력된 내용입니다."
          className="w-[360px]"
          aria-label="텍스트 입력 필드"
        />
      </div>
    </div>
  ),
}

/** TextareaField 모든 상태 */
export const FieldAllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[360px]">
      <TextareaField
        label="기본"
        placeholder="내용을 입력하세요."
      />
      <TextareaField
        label="에러 상태"
        placeholder="내용을 입력하세요."
        error
        errorMessage="필수 입력 항목입니다."
      />
      <TextareaField
        label="비활성화"
        placeholder="내용을 입력하세요."
        disabled
      />
    </div>
  ),
}
