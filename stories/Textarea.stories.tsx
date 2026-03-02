import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/components/ui/textarea"

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
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    required: {
      control: "boolean",
      description: "필수 입력 표시",
    },
    tableMode: {
      control: "boolean",
      description: "테이블 모드 (wrapper 최소화)",
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

/** 라벨 포함 */
export const WithLabel: Story = {
  args: {
    label: "설명",
    placeholder: "설명을 입력하세요.",
    className: "w-[360px]",
  },
}

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    label: "상품 설명",
    placeholder: "상품 설명을 입력하세요.",
    required: true,
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

/** 에러 메시지 포함 */
export const WithErrorMessage: Story = {
  args: {
    label: "설명",
    placeholder: "설명을 입력하세요.",
    error: true,
    errorMessage: "설명은 필수 입력 항목입니다.",
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

/** 테이블 모드 */
export const TableMode: Story = {
  args: {
    placeholder: "테이블 셀 내 입력",
    tableMode: true,
    className: "w-[360px]",
  },
}

/** 테이블 모드 비교 */
export const TableModeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">일반 모드 (파란 glow)</span>
        <Textarea placeholder="내용을 입력하세요." className="w-[360px]" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">테이블 모드 (border 강조)</span>
        <Textarea placeholder="내용을 입력하세요." tableMode className="w-[360px]" />
      </div>
    </div>
  ),
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[360px]">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Default</span>
        <Textarea placeholder="내용을 입력하세요." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Label</span>
        <Textarea label="기본" placeholder="내용을 입력하세요." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Required</span>
        <Textarea label="필수 입력" placeholder="내용을 입력하세요." required />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <Textarea error placeholder="내용을 채워주세요." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error with Message</span>
        <Textarea
          label="에러 상태"
          placeholder="내용을 입력하세요."
          error
          errorMessage="필수 입력 항목입니다."
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <Textarea label="비활성화" placeholder="내용을 입력하세요." disabled />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Value</span>
        <Textarea
          defaultValue="입력된 내용입니다."
          aria-label="텍스트 입력 필드"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Table Mode</span>
        <Textarea placeholder="테이블 셀 내 입력" tableMode />
      </div>
    </div>
  ),
}
