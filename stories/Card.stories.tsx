import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 카드 */
export const Default: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 설명이 들어갑니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 내용이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  ),
}

/** 프로모션 카드 (피그마 디자인 예시) */
export const Promotion: Story = {
  render: () => (
    <Card className="w-[240px]">
      <CardHeader>
        {/* 이미지/그래픽 영역 */}
        <div className="bg-slate-50 rounded h-[140px] w-full" />
        <CardTitle>
          STL
          <br />
          상품을 등록하고
          <br />
          사은품 받아가세요
        </CardTitle>
        <CardDescription>
          STL CBT에 상품 등록하는
          <br />전 고객에게 사은품 증정
        </CardDescription>
      </CardHeader>
    </Card>
  ),
}

/** 액션 버튼이 있는 카드 */
export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
        <CardDescription>알림 수신 방법을 선택하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">
          이메일, SMS, 푸시 알림 중 원하는 방법을 선택할 수 있습니다.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  ),
}

/** 이미지가 있는 카드 */
export const WithImage: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-[160px]" />
      <CardHeader>
        <CardTitle>새로운 기능</CardTitle>
        <CardDescription>더 나은 경험을 위한 업데이트</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">
          새로운 대시보드 기능이 추가되었습니다. 지금 바로 확인해보세요.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">자세히 보기</Button>
      </CardFooter>
    </Card>
  ),
}

/** 여러 카드 그리드 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="w-[200px]">
          <CardHeader>
            <div className="bg-slate-100 rounded h-[100px] w-full" />
            <CardTitle className="text-base">카드 {i}</CardTitle>
            <CardDescription>카드 설명</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
}

/** 로딩 상태 (스켈레톤) */
export const Loading: Story = {
  render: () => (
    <Card className="w-[240px]" loading />
  ),
}

/** 로딩 상태 비교 */
export const LoadingComparison: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-slate-500">로딩 중</span>
        <Card className="w-[240px]" loading />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-slate-500">로딩 완료</span>
        <Card className="w-[240px]">
          <CardHeader>
            <div className="bg-slate-50 rounded h-[140px] w-full" />
            <CardTitle>
              STL
              <br />
              상품을 등록하고
              <br />
              사은품 받아가세요
            </CardTitle>
            <CardDescription>
              STL CBT에 상품 등록하는
              <br />전 고객에게 사은품 증정
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  ),
}
