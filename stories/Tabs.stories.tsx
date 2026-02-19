import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SortableTabsList,
  SortableTabsTrigger,
} from "../src/components/ui/tabs"

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

/** 긴 텍스트 말줄임 + 툴팁 */
export const Truncated: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1">짧은 탭</TabsTrigger>
        <TabsTrigger value="tab2">이것은 매우 긴 탭 이름입니다</TabsTrigger>
        <TabsTrigger value="tab3">B2C 출고 관리 페이지</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">짧은 탭 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">긴 탭 콘텐츠 - 마우스를 탭에 올리면 전체 이름이 툴팁으로 표시됩니다.</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">B2C 출고 관리 페이지 콘텐츠</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 닫기 버튼 + 긴 텍스트 */
export const ClosableWithLongText: Story = {
  render: function ClosableLongTabs() {
    const [tabs, setTabs] = useState([
      { id: "tab1", label: "대시보드" },
      { id: "tab2", label: "상품 관리 - 전체 목록 보기" },
      { id: "tab3", label: "주문 수집 현황 및 처리 페이지" },
      { id: "tab4", label: "B2C 배송 추적 관리" },
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[600px]">
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

/** maxWidth 커스텀 */
export const CustomMaxWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="tab1" maxWidth={80}>
          좁은 탭 (80px)
        </TabsTrigger>
        <TabsTrigger value="tab2" maxWidth={200}>
          넓은 탭 - 이것은 긴 이름입니다 (200px)
        </TabsTrigger>
        <TabsTrigger value="tab3">
          기본값 (120px)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">maxWidth: 80px</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">maxWidth: 200px</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">maxWidth: 120px (기본값)</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 드래그 앤 드롭으로 순서 변경 */
export const Sortable: Story = {
  render: function SortableTabs() {
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

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          탭을 드래그하여 순서를 변경할 수 있습니다.
        </p>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[600px]">
          <SortableTabsList
            items={tabs.map((t) => t.id)}
            onReorder={handleReorder}
          >
            {tabs.map((tab) => (
              <SortableTabsTrigger key={tab.id} id={tab.id} value={tab.id}>
                {tab.label}
              </SortableTabsTrigger>
            ))}
          </SortableTabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-xs text-muted-foreground">
          현재 순서: {tabs.map((t) => t.label).join(" → ")}
        </p>
      </div>
    )
  },
}

/** 드래그 + 닫기 버튼 */
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

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          탭을 드래그하여 순서 변경, X 버튼으로 닫기
        </p>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[600px]">
          <SortableTabsList
            items={tabs.map((t) => t.id)}
            onReorder={handleReorder}
          >
            {tabs.map((tab) => (
              <SortableTabsTrigger
                key={tab.id}
                id={tab.id}
                value={tab.id}
                closable
                onClose={() => handleClose(tab.id)}
              >
                {tab.label}
              </SortableTabsTrigger>
            ))}
          </SortableTabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
            </TabsContent>
          ))}
        </Tabs>
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
          탭이 많으면 자동으로 너비가 줄어들고 말줄임 표시됩니다. (마우스 올리면 툴팁)
        </p>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[700px]">
          <SortableTabsList
            items={tabs.map((t) => t.id)}
            onReorder={handleReorder}
          >
            {tabs.map((tab) => (
              <SortableTabsTrigger
                key={tab.id}
                id={tab.id}
                value={tab.id}
                closable
                onClose={() => handleClose(tab.id)}
              >
                {tab.label}
              </SortableTabsTrigger>
            ))}
          </SortableTabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="p-4 rounded-lg border">{tab.label} 콘텐츠입니다.</div>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-xs text-muted-foreground">
          탭 개수: {tabs.length}개
        </p>
      </div>
    )
  },
}
