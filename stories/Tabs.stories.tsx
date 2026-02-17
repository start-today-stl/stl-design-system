import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 탭 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">B2C 출고</TabsTrigger>
        <TabsTrigger value="tab2">B2B 출고</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">B2C 출고 콘텐츠입니다.</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">B2B 출고 콘텐츠입니다.</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 탭 3개 */
export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1">전체</TabsTrigger>
        <TabsTrigger value="tab2">진행중</TabsTrigger>
        <TabsTrigger value="tab3">완료</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">전체 목록입니다.</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">진행중인 항목입니다.</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">완료된 항목입니다.</div>
      </TabsContent>
    </Tabs>
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[500px]">
        <TabsList>
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
          <TabsContent key={tab.id} value={tab.id}>
            <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
          </TabsContent>
        ))}
      </Tabs>
    )
  },
}

/** 비활성화된 탭 */
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">활성 탭</TabsTrigger>
        <TabsTrigger value="tab2" disabled>비활성 탭</TabsTrigger>
        <TabsTrigger value="tab3">다른 탭</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">활성 탭 콘텐츠입니다.</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">다른 탭 콘텐츠입니다.</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 카드 내 탭 */
export const InCard: Story = {
  render: () => (
    <div className="w-[500px] p-6 rounded-2xl border bg-card">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="reports">리포트</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="space-y-2">
            <h4 className="font-medium">개요</h4>
            <p className="text-sm text-muted-foreground">
              전체 현황을 한눈에 확인할 수 있습니다.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="space-y-2">
            <h4 className="font-medium">분석</h4>
            <p className="text-sm text-muted-foreground">
              상세 분석 데이터를 확인할 수 있습니다.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="space-y-2">
            <h4 className="font-medium">리포트</h4>
            <p className="text-sm text-muted-foreground">
              생성된 리포트를 확인할 수 있습니다.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}

/** 많은 탭 */
export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[700px]">
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
        <TabsTrigger value="tab4">탭 4</TabsTrigger>
        <TabsTrigger value="tab5">탭 5</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">탭 1 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">탭 2 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">탭 3 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="p-4 rounded-lg border">탭 4 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab5">
        <div className="p-4 rounded-lg border">탭 5 콘텐츠</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 우측 정렬 */
export const AlignEnd: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList align="end">
        <TabsTrigger value="tab1">B2C 출고</TabsTrigger>
        <TabsTrigger value="tab2">B2B 출고</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">B2C 출고 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">B2B 출고 콘텐츠</div>
      </TabsContent>
    </Tabs>
  ),
}
