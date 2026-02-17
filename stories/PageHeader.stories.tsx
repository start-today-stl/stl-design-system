import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { PageHeader } from "../src/layout/page-header"
import { PageTitle } from "../src/layout/page-title"
import { Header } from "../src/layout/header"
import { VisitTag } from "../src/layout/visit-tag"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs"
import { SearchBar } from "../src/layout/search-bar"

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

/** 닫기 버튼 있는 탭 - 전역 최근방문 탭 (PageHeader + Tabs 방식) */
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

/** 전역 최근방문 탭 (Header + VisitTag 방식) */
export const GlobalTabsWithVisitTag: Story = {
  args: {
    title: "상품 관리",
    subtitle: "Product Management",
  },
  render: function Story(args) {
    const [tags, setTags] = useState([
      { id: "1", label: "상품 관리" },
      { id: "2", label: "주문 관리" },
      { id: "3", label: "고객 관리" },
    ])

    const handleRemove = (id: string) => {
      setTags(tags.filter((t) => t.id !== id))
    }

    return (
      <div className="w-full space-y-4">
        {/* Header 영역 (전역) */}
        <Header
          search={<SearchBar placeholder="검색어를 입력하세요" />}
          recentVisits={
            <>
              {tags.map((tag) => (
                <VisitTag
                  key={tag.id}
                  label={tag.label}
                  onRemove={() => handleRemove(tag.id)}
                />
              ))}
            </>
          }
        />

        {/* Page 영역 */}
        <div className="px-6">
          <PageTitle title={args.title} subtitle={args.subtitle} />
          <div className="mt-4 p-4 border rounded-lg">
            페이지 콘텐츠 영역
          </div>
        </div>
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

/** 비교: 두 가지 전역 탭 방식 */
export const Comparison: Story = {
  args: {
    title: "비교",
    subtitle: "Comparison",
  },
  render: function Story() {
    const [tags, setTags] = useState([
      { id: "1", label: "상품 관리", subtitle: "Product Management" },
      { id: "2", label: "주문 관리", subtitle: "Order Management" },
    ])
    const [activeTag, setActiveTag] = useState("1")

    const [tabs, setTabs] = useState([
      { id: "tab1", label: "상품 관리", subtitle: "Product Management" },
      { id: "tab2", label: "주문 관리", subtitle: "Order Management" },
    ])
    const [activeTab, setActiveTab] = useState("tab1")

    const activeTagData = tags.find((t) => t.id === activeTag)
    const activeTabData = tabs.find((t) => t.id === activeTab)

    return (
      <div className="w-full space-y-8">
        {/* 방식 1: Header + VisitTag */}
        <div className="space-y-2">
          <p className="text-lg font-semibold">방식 1: Header + VisitTag (기존)</p>
          <p className="text-sm text-muted-foreground">헤더 영역에 최근방문 태그 표시, 클릭 시 페이지 이동</p>
          <div className="border rounded-lg overflow-hidden">
            <Header
              search={<SearchBar placeholder="검색" className="max-w-[300px]" />}
              recentVisits={
                <>
                  {tags.map((tag) => (
                    <VisitTag
                      key={tag.id}
                      label={tag.label}
                      active={activeTag === tag.id}
                      onNavigate={() => setActiveTag(tag.id)}
                      onRemove={() => {
                        const newTags = tags.filter((t) => t.id !== tag.id)
                        setTags(newTags)
                        if (activeTag === tag.id && newTags.length > 0) {
                          setActiveTag(newTags[0].id)
                        }
                      }}
                    />
                  ))}
                </>
              }
            />
            <div className="p-4 border-t">
              <PageTitle
                title={activeTagData?.label || "페이지"}
                subtitle={activeTagData?.subtitle}
              />
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                현재 페이지: {activeTagData?.label}
              </div>
            </div>
          </div>
        </div>

        {/* 방식 2: PageHeader + Tabs */}
        <div className="space-y-2">
          <p className="text-lg font-semibold">방식 2: PageHeader + Tabs (신규)</p>
          <p className="text-sm text-muted-foreground">페이지 타이틀 우측에 탭 표시, 탭 선택 시 타이틀 변경</p>
          <div className="border rounded-lg p-4">
            <PageHeader
              title={activeTabData?.label || "페이지"}
              subtitle={activeTabData?.subtitle}
              tabs={
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList align="end">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        closable
                        onClose={() => {
                          const newTabs = tabs.filter((t) => t.id !== tab.id)
                          setTabs(newTabs)
                          if (activeTab === tab.id && newTabs.length > 0) {
                            setActiveTab(newTabs[0].id)
                          }
                        }}
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
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              현재 페이지: {activeTabData?.label}
            </div>
          </div>
        </div>
      </div>
    )
  },
}
