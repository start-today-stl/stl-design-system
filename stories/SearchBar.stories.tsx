import type { Meta, StoryObj } from "@storybook/react"
import { SearchBar } from "@/layout/search-bar"

const meta: Meta<typeof SearchBar> = {
  title: "Layout/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

const recentSearches = [
  { id: "1", text: "최근 검색어 1" },
  { id: "2", text: "최근 검색어 2" },
  { id: "3", text: "최근 검색어 3" },
  { id: "4", text: "최근 검색어 4" },
  { id: "5", text: "최근 검색어 5" },
]

/** 기본 검색바 */
export const Default: Story = {
  args: {
    placeholder: "주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소",
  },
  decorators: [
    (Story) => (
      <div className="w-[593px]">
        <Story />
      </div>
    ),
  ],
}

/** 최근 검색어 포함 */
export const WithRecentSearches: Story = {
  args: {
    placeholder: "주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소",
    recentSearches,
  },
  decorators: [
    (Story) => (
      <div className="w-[593px]">
        <Story />
      </div>
    ),
  ],
}

/** 짧은 플레이스홀더 */
export const ShortPlaceholder: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    recentSearches,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
}

/** 헤더 내 사용 예시 */
export const InHeader: Story = {
  render: () => (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg w-[800px]">
      <div className="text-lg font-bold text-slate-900 dark:text-slate-50">Logo</div>
      <div className="flex-1">
        <SearchBar
          placeholder="주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소"
          recentSearches={recentSearches}
        />
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  ),
}
