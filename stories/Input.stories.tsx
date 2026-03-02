import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/icons"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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
    loading: {
      control: "boolean",
      description: "로딩 상태 (스피너 표시)",
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
type Story = StoryObj<typeof Input>

/** 기본 인풋 */
export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
    size: "md",
  },
}

/** 라벨이 있는 인풋 */
export const WithLabel: Story = {
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요.",
    size: "md",
  },
}

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    label: "상품명",
    placeholder: "상품명을 입력하세요.",
    size: "md",
    required: true,
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
        <Input placeholder="내용을 입력하세요." size="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">md (260px)</span>
        <Input placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">lg (360px)</span>
        <Input placeholder="내용을 입력하세요." size="lg" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">full (100%)</span>
        <div className="w-[400px]">
          <Input placeholder="내용을 입력하세요." size="full" />
        </div>
      </div>
    </div>
  ),
}

/** 우측 아이콘 포함 */
export const WithRightIcon: Story = {
  args: {
    label: "검색어",
    size: "md",
    placeholder: "검색어를 입력하세요.",
    rightIcon: <SearchIcon size={24} />,
    onRightIconClick: () => alert("검색"),
  },
}

/** 비밀번호 입력 (자동 토글) */
export const Password: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요.",
    size: "md",
  },
}

/** 로딩 상태 */
export const Loading: Story = {
  args: {
    label: "Product",
    defaultValue: "버튼",
    size: "md",
    loading: true,
  },
}

/** 테이블 모드 (wrapper 없음) */
export const TableMode: Story = {
  args: {
    placeholder: "테이블 셀 내 입력",
    size: "full",
    tableMode: true,
  },
}

/** 테이블 모드 비교 */
export const TableModeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">일반 모드 (파란 glow)</span>
        <Input placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">테이블 모드 (border 강조)</span>
        <Input placeholder="내용을 입력하세요." size="md" tableMode />
      </div>
    </div>
  ),
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Default</span>
        <Input placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <Input error placeholder="내용을 채워주세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error with Message</span>
        <Input error errorMessage="필수 입력 항목입니다." placeholder="내용을 채워주세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Label</span>
        <Input label="라벨" placeholder="내용을 입력하세요." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <Input label="라벨" placeholder="내용을 입력하세요." disabled size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Right Icon</span>
        <Input
          label="검색어"
          size="md"
          placeholder="검색어를 입력하세요."
          rightIcon={<SearchIcon size={24} />}
          onRightIconClick={() => console.log("검색")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Password</span>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          size="md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Loading</span>
        <Input
          label="Product"
          defaultValue="버튼"
          size="md"
          loading
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Table Mode</span>
        <Input
          placeholder="테이블 셀 내 입력"
          size="md"
          tableMode
        />
      </div>
    </div>
  ),
}
