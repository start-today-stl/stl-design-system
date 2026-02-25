import type { Meta, StoryObj } from "@storybook/react"
import { FormLabel } from "@/components/form/form-label"
import { InputField } from "@/components/ui/input"

const meta: Meta<typeof FormLabel> = {
  title: "Form/FormLabel",
  component: FormLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
      description: "필수 입력 표시",
    },
    invisible: {
      control: "boolean",
      description: "라벨 숨김 (공간 유지)",
    },
  },
}

export default meta
type Story = StoryObj<typeof FormLabel>

/** 기본 사용 */
export const Default: Story = {
  args: {
    children: "라벨 텍스트",
  },
}

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    children: "유통기한 마지노선",
    required: true,
  },
}

/** 숨김 상태 (공간 유지) */
export const Invisible: Story = {
  args: {
    children: "숨겨진 라벨",
    invisible: true,
  },
}

/** htmlFor 연결 */
export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <FormLabel htmlFor="custom-input" required>
        커스텀 필드
      </FormLabel>
      <input
        id="custom-input"
        type="text"
        className="border rounded px-2 py-1 text-sm"
        placeholder="입력하세요"
      />
    </div>
  ),
}

/** 커스텀 레이아웃 예시 - 유통기한 마지노선 */
export const CustomLayoutExample: Story = {
  render: () => (
    <div className="w-[400px] flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <FormLabel required>유통기한 마지노선</FormLabel>
        <label className="flex items-center gap-1 text-xs">
          <input type="checkbox" />
          해당 사항 없음
        </label>
      </div>
      <div className="bg-slate-100 rounded px-3 py-2 flex items-center gap-2">
        <span className="text-xs text-slate-600">유통기한으로 부터</span>
        <InputField size="sm" placeholder="일수" />
        <span className="text-xs text-slate-600">일 전까지</span>
      </div>
    </div>
  ),
}

/** 커스텀 레이아웃 예시 - 입고 시 입수량 */
export const QuantityLayoutExample: Story = {
  render: () => (
    <div className="w-[400px] flex flex-col gap-1">
      <FormLabel required>입고 시 입수량</FormLabel>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-slate-600 shrink-0">1PLT</span>
          <InputField placeholder="BOX" size="full" />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-slate-600 shrink-0">1BOX</span>
          <InputField placeholder="PCS" size="full" />
        </div>
      </div>
    </div>
  ),
}

/** InputField와 비교 */
export const CompareWithInputField: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div>
        <p className="text-sm text-slate-500 mb-2">InputField 내장 라벨:</p>
        <InputField label="상품명" required placeholder="입력하세요" size="full" />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-2">FormLabel + 커스텀 구조:</p>
        <div className="flex flex-col gap-1">
          <FormLabel required>상품명</FormLabel>
          <InputField placeholder="입력하세요" size="full" />
        </div>
      </div>
    </div>
  ),
}
