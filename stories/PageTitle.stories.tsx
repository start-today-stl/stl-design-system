import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { PageTitle } from "../src/layout/page-title"
import { Breadcrumb } from "../src/components/ui/breadcrumb"

const meta = {
  title: "Layout/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "메인 타이틀",
    },
    subtitle: {
      description: "보조 타이틀 (선택)",
    },
    bookmarked: {
      control: "boolean",
      description: "북마크 상태",
    },
    onBookmark: {
      description: "북마크 클릭 핸들러 (없으면 북마크 버튼 숨김)",
    },
  },
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 (타이틀만) */
export const Default: Story = {
  args: {
    title: "대시보드",
  },
}

/** 타이틀 + 서브타이틀 */
export const WithSubtitle: Story = {
  args: {
    title: "대시보드",
    subtitle: "Dashboard",
  },
}

/** 북마크 포함 */
export const WithBookmark: Story = {
  args: {
    title: "대시보드",
    subtitle: "Dashboard",
    bookmarked: false,
    onBookmark: () => {},
  },
}

/** 북마크됨 */
export const Bookmarked: Story = {
  args: {
    title: "주문 관리",
    subtitle: "Order Management",
    bookmarked: true,
    onBookmark: () => {},
  },
}

/** 인터랙티브 북마크 */
export const InteractiveBookmark: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = useState(false)
    return (
      <PageTitle
        title="B2C 주문관리"
        subtitle="B2C Order"
        bookmarked={bookmarked}
        onBookmark={() => setBookmarked(!bookmarked)}
      />
    )
  },
}

/** Breadcrumb과 함께 사용 */
export const WithBreadcrumb: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = useState(false)
    return (
      <div className="flex flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "홈", href: "/" },
            { label: "판매 관리", href: "/sales" },
            { label: "B2C 주문관리" },
          ]}
        />
        <PageTitle
          title="B2C 주문관리"
          subtitle="B2C Order Management"
          bookmarked={bookmarked}
          onBookmark={() => setBookmarked(!bookmarked)}
        />
      </div>
    )
  },
}

/** 영문만 */
export const EnglishOnly: Story = {
  args: {
    title: "Dashboard",
  },
}

/** 긴 타이틀 */
export const LongTitle: Story = {
  args: {
    title: "주문 관리 및 배송 현황 모니터링",
    subtitle: "Order Management and Shipping Status Monitoring",
    onBookmark: () => {},
  },
}
