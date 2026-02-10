import type { Meta, StoryObj } from "@storybook/react"
import { InputField } from "@/components/ui/input"
import { CalenderIcon } from "@/icons"

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
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
    rightIcon: {
      control: false,
      description: "우측 아이콘 (ReactNode)",
    },
    onRightIconClick: {
      action: "clicked",
      description: "우측 아이콘 클릭 핸들러",
    },
  },
}

export default meta
type Story = StoryObj<typeof InputField>

/** 기본 인풋필드 */
export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    size: "md",
  },
}

/** 라벨이 있는 인풋필드 */
export const WithLabel: Story = {
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요.",
    size: "md",
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    error: true,
    placeholder: "내용을 채워주세요.",
    size: "md",
  },
}

/** 에러 메시지 포함 */
export const ErrorWithMessage: Story = {
  args: {
    label: "라벨",
    error: true,
    errorMessage: "필수 입력 항목입니다.",
    placeholder: "내용을 채워주세요.",
    size: "md",
  },
}

/** 작은 너비 (sm: 160px) */
export const SizeSmall: Story = {
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요.",
    size: "sm",
  },
}

/** 큰 너비 (lg: 360px) */
export const SizeLarge: Story = {
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요.",
    size: "lg",
  },
}

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요.",
    disabled: true,
    size: "md",
  },
}

/** 값이 입력된 상태 */
export const WithValue: Story = {
  args: {
    label: "라벨",
    defaultValue: "입력된 내용",
    size: "md",
  },
}

/** 모든 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">sm (160px)</span>
        <InputField placeholder="내용을 입력하세요." size="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">md (260px)</span>
        <InputField placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">lg (360px)</span>
        <InputField placeholder="내용을 입력하세요." size="lg" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">full (100%)</span>
        <div className="w-[400px]">
          <InputField placeholder="내용을 입력하세요." size="full" />
        </div>
      </div>
    </div>
  ),
}

/** 우측 아이콘 포함 */
export const WithRightIcon: Story = {
  args: {
    label: "날짜",
    placeholder: "2025-00-00",
    size: "md",
    rightIcon: <CalenderIcon size={24} />,
    onRightIconClick: () => alert("캘린더 열기"),
  },
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Default</span>
        <InputField placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <InputField error placeholder="내용을 채워주세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error with Message</span>
        <InputField error errorMessage="필수 입력 항목입니다." placeholder="내용을 채워주세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Label</span>
        <InputField label="라벨" placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <InputField label="라벨" placeholder="내용을 입력하세요." disabled size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Right Icon</span>
        <InputField
          label="날짜"
          placeholder="2025-00-00"
          size="md"
          rightIcon={<CalenderIcon size={18} />}
          onRightIconClick={() => console.log("캘린더 열기")}
        />
      </div>
    </div>
  ),
}
