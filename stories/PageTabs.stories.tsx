import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  PageTabs,
  PageTabsList,
  PageTabsTrigger,
  PageTabsContent,
  PageTabsSortableList,
  PageTabsSortableTrigger,
} from "../src/components/ui/page-tabs"

const meta = {
  title: "Components/PageTabs",
  component: PageTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof PageTabs>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 탭 */
export const Default: Story = {
  render: () => (
    <PageTabs defaultValue="tab1" className="w-[400px]">
      <PageTabsList>
        <PageTabsTrigger value="tab1">B2C 출고</PageTabsTrigger>
        <PageTabsTrigger value="tab2">B2B 출고</PageTabsTrigger>
      </PageTabsList>
      <PageTabsContent value="tab1">
        <div className="p-4 rounded-lg border">B2C 출고 콘텐츠입니다.</div>
      </PageTabsContent>
      <PageTabsContent value="tab2">
        <div className="p-4 rounded-lg border">B2B 출고 콘텐츠입니다.</div>
      </PageTabsContent>
    </PageTabs>
  ),
}

/** 닫기 버튼 있는 탭 */
export const Closable: Story = {
  render: function ClosableTabs() {
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
      <PageTabs value={activeTab} onValueChange={setActiveTab} className="w-[500px]">
        <PageTabsList>
          {tabs.map((tab) => (
            <PageTabsTrigger
              key={tab.id}
              value={tab.id}
              closable
              onClose={() => handleClose(tab.id)}
            >
              {tab.label}
            </PageTabsTrigger>
          ))}
        </PageTabsList>
        {tabs.map((tab) => (
          <PageTabsContent key={tab.id} value={tab.id}>
            <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
          </PageTabsContent>
        ))}
      </PageTabs>
    )
  },
}

/** 긴 텍스트 말줄임 + 툴팁 */
export const Truncated: Story = {
  render: () => (
    <PageTabs defaultValue="tab1" className="w-[500px]">
      <PageTabsList>
        <PageTabsTrigger value="tab1">짧은 탭</PageTabsTrigger>
        <PageTabsTrigger value="tab2">이것은 매우 긴 탭 이름입니다</PageTabsTrigger>
        <PageTabsTrigger value="tab3">B2C 출고 관리 페이지</PageTabsTrigger>
      </PageTabsList>
      <PageTabsContent value="tab1">
        <div className="p-4 rounded-lg border">짧은 탭 콘텐츠</div>
      </PageTabsContent>
      <PageTabsContent value="tab2">
        <div className="p-4 rounded-lg border">긴 탭 콘텐츠 — 호버 시 툴팁 표시</div>
      </PageTabsContent>
      <PageTabsContent value="tab3">
        <div className="p-4 rounded-lg border">B2C 출고 관리 페이지 콘텐츠</div>
      </PageTabsContent>
    </PageTabs>
  ),
}

/** 드래그 + 닫기 + 컨텍스트 메뉴 */
export const SortableWithClose: Story = {
  render: function SortableClosableTabs() {
    const [tabs, setTabs] = useState([
      { id: "tab1", label: "대시보드" },
      { id: "tab2", label: "상품 관리" },
      { id: "tab3", label: "주문 관리" },
      { id: "tab4", label: "고객 관리" },
    ])
    const [activeTab, setActiveTab] = useState("tab1")

    const handleReorder = (newOrder: string[]) => {
      const reorderedTabs = newOrder.map((id) => tabs.find((t) => t.id === id)!)
      setTabs(reorderedTabs)
    }

    const handleClose = (tabId: string) => {
      const newTabs = tabs.filter((t) => t.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id)
      }
    }

    const handleCloseTabsToRight = (tabId: string) => {
      const tabIndex = tabs.findIndex((t) => t.id === tabId)
      const tabsToClose = tabs.slice(tabIndex + 1)
      const newTabs = tabs.slice(0, tabIndex + 1)
      setTabs(newTabs)
      if (tabsToClose.some((t) => t.id === activeTab)) {
        setActiveTab(tabId)
      }
    }

    const handleCloseOtherTabs = (tabId: string) => {
      const newTabs = tabs.filter((t) => t.id === tabId)
      setTabs(newTabs)
      setActiveTab(tabId)
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          드래그로 순서 변경, X 버튼으로 닫기, 우클릭 시 컨텍스트 메뉴
        </p>
        <PageTabs value={activeTab} onValueChange={setActiveTab} className="w-[600px]">
          <PageTabsSortableList
            items={tabs.map((t) => t.id)}
            onReorder={handleReorder}
          >
            {tabs.map((tab, index) => (
              <PageTabsSortableTrigger
                key={tab.id}
                id={tab.id}
                value={tab.id}
                closable
                onClose={() => handleClose(tab.id)}
                onCloseTabsToRight={index < tabs.length - 1 ? () => handleCloseTabsToRight(tab.id) : undefined}
                onCloseOtherTabs={tabs.length > 1 ? () => handleCloseOtherTabs(tab.id) : undefined}
              >
                {tab.label}
              </PageTabsSortableTrigger>
            ))}
          </PageTabsSortableList>
          {tabs.map((tab) => (
            <PageTabsContent key={tab.id} value={tab.id}>
              <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
            </PageTabsContent>
          ))}
        </PageTabs>
      </div>
    )
  },
}

/** 반응형 탭 (많은 탭 - 자동 축소) */
export const ResponsiveManyTabs: Story = {
  render: function ResponsiveTabs() {
    const [tabs, setTabs] = useState([
      { id: "tab1", label: "대시보드" },
      { id: "tab2", label: "상품 관리" },
      { id: "tab3", label: "주문 관리" },
      { id: "tab4", label: "고객 관리" },
      { id: "tab5", label: "재고 현황" },
      { id: "tab6", label: "배송 추적" },
      { id: "tab7", label: "정산 관리" },
      { id: "tab8", label: "통계 분석" },
    ])
    const [activeTab, setActiveTab] = useState("tab1")

    const handleReorder = (newOrder: string[]) => {
      const reorderedTabs = newOrder.map((id) => tabs.find((t) => t.id === id)!)
      setTabs(reorderedTabs)
    }

    const handleClose = (tabId: string) => {
      const newTabs = tabs.filter((t) => t.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id)
      }
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          탭이 많으면 자동으로 너비가 줄어들고 말줄임 표시됩니다.
        </p>
        <PageTabs value={activeTab} onValueChange={setActiveTab} className="w-[700px]">
          <PageTabsSortableList
            items={tabs.map((t) => t.id)}
            onReorder={handleReorder}
          >
            {tabs.map((tab) => (
              <PageTabsSortableTrigger
                key={tab.id}
                id={tab.id}
                value={tab.id}
                closable
                onClose={() => handleClose(tab.id)}
              >
                {tab.label}
              </PageTabsSortableTrigger>
            ))}
          </PageTabsSortableList>
          {tabs.map((tab) => (
            <PageTabsContent key={tab.id} value={tab.id}>
              <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
            </PageTabsContent>
          ))}
        </PageTabs>
      </div>
    )
  },
}
