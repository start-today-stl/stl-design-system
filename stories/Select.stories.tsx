import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "@/components/ui/select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
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
    searchable: {
      control: "boolean",
      description: "검색 기능 활성화",
    },
    multiple: {
      control: "boolean",
      description: "다중 선택 모드",
    },
    clearable: {
      control: "boolean",
      description: "전체 삭제 버튼 표시 (기본: true)",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태 (스피너 표시)",
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = [
  { label: "옵션1", value: "option1" },
  { label: "옵션2", value: "option2" },
  { label: "옵션3", value: "option3" },
  { label: "옵션4", value: "option4" },
  { label: "옵션5", value: "option5" },
]

const manyOptions = [
  { label: "서울", value: "seoul" },
  { label: "부산", value: "busan" },
  { label: "대구", value: "daegu" },
  { label: "인천", value: "incheon" },
  { label: "광주", value: "gwangju" },
  { label: "대전", value: "daejeon" },
  { label: "울산", value: "ulsan" },
  { label: "세종", value: "sejong" },
  { label: "경기", value: "gyeonggi" },
  { label: "강원", value: "gangwon" },
  { label: "충북", value: "chungbuk" },
  { label: "충남", value: "chungnam" },
  { label: "전북", value: "jeonbuk" },
  { label: "전남", value: "jeonnam" },
  { label: "경북", value: "gyeongbuk" },
  { label: "경남", value: "gyeongnam" },
  { label: "제주", value: "jeju" },
]

// ============================================
// 기본 (Basic)
// ============================================

/** 기본 셀렉트 */
export const Default: Story = {
  args: {
    placeholder: "선택하세요",
    options: defaultOptions,
    size: "md",
    "aria-label": "옵션 선택",
    clearable: false,
  },
}

/** 라벨이 있는 셀렉트 */
export const WithLabel: Story = {
  args: {
    label: "상품명",
    placeholder: "선택하세요",
    options: defaultOptions,
    size: "md",
  },
}

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    label: "브랜드",
    placeholder: "브랜드를 선택하세요",
    options: defaultOptions,
    size: "md",
    required: true,
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

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "상품명",
    placeholder: "선택하세요",
    options: defaultOptions,
    disabled: true,
    size: "md",
  },
}

// ============================================
// 에러 상태 (Error States)
// ============================================

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

// ============================================
// 검색 & 다중 선택 (Searchable & Multiple)
// ============================================

/** 검색 가능한 셀렉트 */
export const Searchable: Story = {
  args: {
    label: "지역 선택",
    placeholder: "지역을 선택하세요",
    options: manyOptions,
    searchable: true,
    size: "md",
  },
}

/** 다중 선택 셀렉트 */
export const Multiple: Story = {
  args: {
    label: "지역 선택 (다중)",
    placeholder: "지역을 선택하세요",
    options: manyOptions,
    multiple: true,
    size: "md",
  },
}

/** 다중 선택 - Controlled */
export const MultipleControlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul", "busan"])

    return (
      <div className="flex flex-col gap-4">
        <Select
          label="지역 선택 (다중)"
          placeholder="지역을 선택하세요"
          options={manyOptions}
          multiple
          value={value}
          onValueChange={setValue}
          size="lg"
        />
        <div className="text-xs text-slate-500">
          선택된 값: {value.join(", ") || "없음"}
        </div>
      </div>
    )
  },
}

// ============================================
// 다중 선택 옵션 (Multiple Select Options)
// ============================================

/** 다중 선택 - 최대 표시 개수 변경 */
export const MultipleMaxDisplayCount: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul", "busan", "daegu", "incheon", "gwangju"])

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">maxDisplayCount=1</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={value}
            onValueChange={setValue}
            maxDisplayCount={1}
            size="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">maxDisplayCount=2 (기본값)</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={value}
            onValueChange={setValue}
            maxDisplayCount={2}
            size="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">maxDisplayCount=3</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={value}
            onValueChange={setValue}
            maxDisplayCount={3}
            size="md"
          />
        </div>
      </div>
    )
  },
}

/** 다중 선택 - 오버플로우 모드 비교 */
export const MultipleOverflowModes: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul", "busan", "daegu", "incheon", "gwangju"])

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">truncate 모드 (기본) - 2개 표시 + "+N" 칩</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={value}
            onValueChange={setValue}
            overflowMode="truncate"
            size="lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">wrap 모드 - 모든 칩 표시, 줄바꿈</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={value}
            onValueChange={setValue}
            overflowMode="wrap"
            size="lg"
          />
        </div>
      </div>
    )
  },
}

// ============================================
// Clearable (삭제 버튼)
// ============================================

/** Clearable 비교 - 모든 Select 타입 */
export const Clearable: Story = {
  render: function Render() {
    const [basicValue, setBasicValue] = useState<string>("option2")
    const [searchValue, setSearchValue] = useState<string>("seoul")
    const [multiValue, setMultiValue] = useState<string[]>(["seoul", "busan"])

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">Basic Select (clearable=true, 기본값)</span>
          <Select
            placeholder="선택하세요"
            options={defaultOptions}
            value={basicValue}
            onValueChange={setBasicValue}
            size="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">Searchable Select (clearable)</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            searchable
            value={searchValue}
            onValueChange={setSearchValue}
            size="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">Multiple Select (clearable - 전체 삭제)</span>
          <Select
            placeholder="지역을 선택하세요"
            options={manyOptions}
            multiple
            value={multiValue}
            onValueChange={setMultiValue}
            size="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">clearable=false (X 버튼 없음)</span>
          <Select
            placeholder="선택하세요"
            options={defaultOptions}
            value={basicValue}
            onValueChange={setBasicValue}
            clearable={false}
            size="md"
          />
        </div>
        <div className="text-xs text-slate-500 mt-2">
          각 Select에 hover하면 오른쪽에 X 버튼이 표시됩니다
        </div>
      </div>
    )
  },
}

// ============================================
// 로딩 상태 (Loading)
// ============================================

/** 로딩 상태 - API에서 옵션을 불러올 때 */
export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Basic Select - 로딩 중</span>
        <Select
          placeholder="선택하세요"
          options={defaultOptions}
          loading
          size="md"
          aria-label="로딩 중"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Searchable Select - 로딩 중</span>
        <Select
          placeholder="지역을 선택하세요"
          options={manyOptions}
          searchable
          loading
          size="md"
          aria-label="로딩 중"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Multiple Select - 로딩 중</span>
        <Select
          placeholder="지역을 선택하세요"
          options={manyOptions}
          multiple
          loading
          size="md"
          aria-label="로딩 중"
        />
      </div>
      <div className="text-xs text-slate-500 mt-2">
        로딩 중일 때는 화살표 대신 스피너가 표시되고, 클릭이 비활성화됩니다
      </div>
    </div>
  ),
}

/** 로딩 상태 - 라벨과 함께 */
export const LoadingWithLabel: Story = {
  args: {
    label: "카테고리",
    placeholder: "카테고리를 선택하세요",
    options: [],
    loading: true,
    size: "md",
  },
}

// ============================================
// 비교 (Comparison)
// ============================================

/** 모든 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">sm (160px)</span>
        <Select placeholder="선택하세요" options={defaultOptions} size="sm" aria-label="선택 (sm)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">md (260px)</span>
        <Select placeholder="선택하세요" options={defaultOptions} size="md" aria-label="선택 (md)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">lg (360px)</span>
        <Select placeholder="선택하세요" options={defaultOptions} size="lg" aria-label="선택 (lg)" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">full (100%)</span>
        <div className="w-[400px]">
          <Select placeholder="선택하세요" options={defaultOptions} size="full" aria-label="선택 (full)" />
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
        <span className="text-sm text-slate-500">Default</span>
        <Select placeholder="선택하세요" options={defaultOptions} size="md" aria-label="기본 선택" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">With Label</span>
        <Select label="상품명" placeholder="선택하세요" options={defaultOptions} size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error</span>
        <Select label="상품명" placeholder="선택하세요" options={defaultOptions} error size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Error with Message</span>
        <Select label="상품명" placeholder="선택하세요" options={defaultOptions} error errorMessage="필수 선택 항목입니다." size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Disabled</span>
        <Select label="상품명" placeholder="선택하세요" options={defaultOptions} disabled size="md" />
      </div>
    </div>
  ),
}

/** 모든 모드 비교 */
export const AllModes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Basic (기본)</span>
        <Select
          label="상품명"
          placeholder="선택하세요"
          options={defaultOptions}
          size="md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Searchable (검색 가능)</span>
        <Select
          label="지역"
          placeholder="지역을 선택하세요"
          options={manyOptions}
          searchable
          size="md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">Multiple (다중 선택)</span>
        <Select
          label="지역 (다중)"
          placeholder="지역을 선택하세요"
          options={manyOptions}
          multiple
          size="md"
        />
      </div>
    </div>
  ),
}
