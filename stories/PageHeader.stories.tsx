import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { PageHeader } from "../src/layout/page-header"
import { PageTitle } from "../src/layout/page-title"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 (탭 없음) */
export const Default: Story = {
  args: {
    title: "대시보드",
    subtitle: "Dashboard",
  },
}

/** 북마크 포함 */
export const WithBookmark: Story = {
  args: {
    title: "상품 관리",
    subtitle: "Product Management",
    bookmarked: false,
    onBookmark: () => {},
  },
}

/** 탭 포함 (우측 정렬) - PageHeader + Tabs 방식 */
export const WithTabs: Story = {
  args: {
    title: "출고 내역",
    subtitle: "Shipment History",
  },
  render: (args) => (
    <div className="w-full">
      <PageHeader
        {...args}
        tabs={
          <Tabs defaultValue="b2c" className="w-full">
            <TabsList align="end">
              <TabsTrigger value="b2c">B2C 출고</TabsTrigger>
              <TabsTrigger value="b2b">B2B 출고</TabsTrigger>
            </TabsList>
            <TabsContent value="b2c" className="hidden" />
            <TabsContent value="b2b" className="hidden" />
          </Tabs>
        }
      />
    </div>
  ),
}

/** 닫기 버튼 있는 탭 - 전역 탭 (PageHeader + Tabs 방식) */
export const GlobalTabsWithPageHeader: Story = {
  args: {
    title: "관리 페이지",
    subtitle: "Management",
  },
  render: function Story(args) {
    const [tabs, setTabs] = useState([
      { id: "tab1", label: "상품 관리" },
      { id: "tab2", label: "주문 관리" },
      { id: "tab3", label: "고객 관리" },
    ])
    const [activeTab, setActiveTab] = useState("tab1")

    const handleClose = (tabId: string) => {
      const newTabs = tabs.filter((t) => t.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id)
      }
    }

    return (
      <div className="w-full">
        <PageHeader
          {...args}
          tabs={
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList align="end">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    closable
                    onClose={() => handleClose(tab.id)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="hidden" />
              ))}
            </Tabs>
          }
        />
      </div>
    )
  },
}

/** 페이지 내부 탭 (좌측 정렬) */
export const InternalTabs: Story = {
  args: {
    title: "출고 내역",
    subtitle: "Shipment History",
  },
  render: (args) => (
    <div className="w-full space-y-4">
      {/* PageTitle만 사용 */}
      <PageTitle title={args.title} subtitle={args.subtitle} />

      {/* 페이지 내부에서 Tabs 사용 (좌측 정렬) */}
      <Tabs defaultValue="b2c" className="w-full">
        <TabsList>
          <TabsTrigger value="b2c">B2C 출고</TabsTrigger>
          <TabsTrigger value="b2b">B2B 출고</TabsTrigger>
        </TabsList>
        <TabsContent value="b2c">
          <div className="p-4 rounded-lg border">B2C 출고 콘텐츠</div>
        </TabsContent>
        <TabsContent value="b2b">
          <div className="p-4 rounded-lg border">B2B 출고 콘텐츠</div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}

/** 스크롤 시 상단 고정 (Sticky) */
export const Sticky: Story = {
  args: {
    title: "상품 목록",
    subtitle: "Product List",
    sticky: true,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="h-[400px] overflow-auto bg-slate-50">
      <div className="p-4">
        <PageHeader
          {...args}
          tabs={
            <Tabs defaultValue="all" className="w-full">
              <TabsList align="end">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="active">사용</TabsTrigger>
                <TabsTrigger value="inactive">미사용</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="hidden" />
              <TabsContent value="active" className="hidden" />
              <TabsContent value="inactive" className="hidden" />
            </Tabs>
          }
        />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg border">
              스크롤 테스트용 콘텐츠 {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
