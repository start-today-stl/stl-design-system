import type { Meta, StoryObj } from "@storybook/react"

import { InputGroup } from "../src/components/ui/input-group"
import { Input } from "../src/components/ui/input"
import { Button } from "../src/components/ui/button"
import { SearchIcon } from "../src/icons"

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
  },
}

export default meta
type Story = StoryObj<typeof InputGroup>

/** 기본 - 인풋 + 버튼 */
export const Default: Story = {
  render: () => (
    <InputGroup size="md">
      <Input placeholder="검색어를 입력하세요" className="flex-1" />
      <Button variant="primary">검색</Button>
    </InputGroup>
  ),
}

/** 라벨 포함 */
export const WithLabel: Story = {
  render: () => (
    <InputGroup label="검색" size="md">
      <Input placeholder="검색어를 입력하세요" className="flex-1" />
      <Button variant="primary">검색</Button>
    </InputGroup>
  ),
}

/** 아이콘 버튼 */
export const WithIconButton: Story = {
  render: () => (
    <InputGroup size="md">
      <Input placeholder="검색어를 입력하세요" className="flex-1" />
      <Button variant="primary" size="icon" aria-label="검색">
        <SearchIcon size={20} />
      </Button>
    </InputGroup>
  ),
}

/** 에러 상태 */
export const WithError: Story = {
  render: () => (
    <InputGroup label="검색" error errorMessage="검색어를 입력해주세요" size="md">
      <Input placeholder="검색어를 입력하세요" error className="flex-1" />
      <Button variant="primary">검색</Button>
    </InputGroup>
  ),
}

/** 버튼이 앞에 있는 경우 */
export const ButtonFirst: Story = {
  render: () => (
    <InputGroup size="md">
      <Button variant="ghost">선택</Button>
      <Input placeholder="값을 입력하세요" className="flex-1" />
    </InputGroup>
  ),
}

/** 여러 요소 조합 */
export const MultipleElements: Story = {
  render: () => (
    <InputGroup label="금액" size="lg">
      <Button variant="ghost">KRW</Button>
      <Input placeholder="금액을 입력하세요" type="number" className="flex-1" />
      <Button variant="primary">확인</Button>
    </InputGroup>
  ),
}

/** 모든 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">sm (160px)</span>
        <InputGroup size="sm">
          <Input placeholder="검색" className="flex-1" />
          <Button variant="primary">검색</Button>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">md (260px)</span>
        <InputGroup size="md">
          <Input placeholder="검색어를 입력하세요" className="flex-1" />
          <Button variant="primary">검색</Button>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">lg (360px)</span>
        <InputGroup size="lg">
          <Input placeholder="검색어를 입력하세요" className="flex-1" />
          <Button variant="primary">검색</Button>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-500">full (100%)</span>
        <div className="w-[500px]">
          <InputGroup size="full">
            <Input placeholder="검색어를 입력하세요" className="flex-1" />
            <Button variant="primary">검색</Button>
          </InputGroup>
        </div>
      </div>
    </div>
  ),
}
