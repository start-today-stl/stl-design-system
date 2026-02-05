import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "@/components/ui/dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
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
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const defaultOptions = [
  { label: "옵션1", value: "option1" },
  { label: "옵션2", value: "option2" },
  { label: "옵션3", value: "option3" },
  { label: "옵션4", value: "option4" },
  { label: "옵션5", value: "option5" },
]

/** 기본 드롭다운 */
export const Default: Story = {
  args: {
    placeholder: "접수일",
    options: defaultOptions,
    size: "md",
    "aria-label": "접수일 선택",
  },
}

/** 라벨이 있는 드롭다운 */
export const WithLabel: Story = {
  args: {
    label: "상품명",
    placeholder: "접수일",
    options: defaultOptions,
    size: "md",
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    label: "상품명",
    placeholder: "선택하세요",
    options: defaultOptions,
    error: true,
    size: "md",
  },
}

/** 에러 메시지 포함 */
export const ErrorWithMessage: Story = {
  args: {
    label: "상품명",
    placeholder: "선택하세요",
    options: defaultOptions,
    error: true,
    errorMessage: "필수 선택 항목입니다.",
    size: "md",
  },
}

/** 작은 너비 (sm: 160px) */
export const SizeSmall: Story = {
  args: {
    label: "상품명",
    placeholder: "접수일",
    options: defaultOptions,
    size: "sm",
  },
}

/** 큰 너비 (lg: 360px) */
export const SizeLarge: Story = {
  args: {
    label: "상품명",
    placeholder: "접수일",
    options: defaultOptions,
    size: "lg",
  },
}

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "상품명",
    placeholder: "접수일",
    options: defaultOptions,
    disabled: true,
    size: "md",
  },
}

/** 기본값이 선택된 상태 */
export const WithDefaultValue: Story = {
  args: {
    label: "상품명",
    options: defaultOptions,
    defaultValue: "option2",
    size: "md",
  },
}

/** 모든 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">sm (160px)</span>
        <Dropdown placeholder="접수일" options={defaultOptions} size="sm" aria-label="접수일 선택 (sm)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">md (260px)</span>
        <Dropdown placeholder="접수일" options={defaultOptions} size="md" aria-label="접수일 선택 (md)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">lg (360px)</span>
        <Dropdown placeholder="접수일" options={defaultOptions} size="lg" aria-label="접수일 선택 (lg)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">full (100%)</span>
        <div className="w-[400px]">
          <Dropdown placeholder="접수일" options={defaultOptions} size="full" aria-label="접수일 선택 (full)" />
        </div>
      </div>
    </div>
  ),
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Default</span>
        <Dropdown placeholder="접수일" options={defaultOptions} size="md" aria-label="접수일 선택" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">With Label</span>
        <Dropdown label="상품명" placeholder="접수일" options={defaultOptions} size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Error</span>
        <Dropdown label="상품명" placeholder="선택하세요" options={defaultOptions} error size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Error with Message</span>
        <Dropdown label="상품명" placeholder="선택하세요" options={defaultOptions} error errorMessage="필수 선택 항목입니다." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Disabled</span>
        <Dropdown label="상품명" placeholder="접수일" options={defaultOptions} disabled size="md" />
      </div>
    </div>
  ),
}
