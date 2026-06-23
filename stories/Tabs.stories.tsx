import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 탭 (2개) */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1" className="flex-1">B2C 출고</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">B2B 출고</TabsTrigger>
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
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="tab1" className="flex-1">전체</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">진행중</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">완료</TabsTrigger>
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

/** 좌측 정렬 (flex-1 없음) */
export const AlignStart: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1">개요</TabsTrigger>
        <TabsTrigger value="tab2">분석</TabsTrigger>
        <TabsTrigger value="tab3">리포트</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">개요 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 rounded-lg border">분석 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">리포트 콘텐츠</div>
      </TabsContent>
    </Tabs>
  ),
}

/** 비활성화된 탭 */
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1" className="flex-1">활성 탭</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1" disabled>비활성 탭</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">다른 탭</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 rounded-lg border">활성 탭 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 rounded-lg border">다른 탭 콘텐츠</div>
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
          <TabsTrigger value="overview" className="flex-1">개요</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">분석</TabsTrigger>
          <TabsTrigger value="reports" className="flex-1">리포트</TabsTrigger>
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
