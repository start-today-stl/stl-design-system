import type { Meta, StoryObj } from "@storybook/react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownGroup,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
} from "@/components/ui/dropdown"
import { Button } from "@/components/ui/button"
import { SettingsIcon } from "@/icons"
import { useState } from "react"

const meta: Meta = {
  title: "Components/Dropdown",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

/** 기본 드롭다운 메뉴 */
export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost-outline">메뉴 열기</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>프로필</DropdownItem>
        <DropdownItem>설정</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>로그아웃</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

/** 아이콘 버튼 트리거 */
export const WithIconTrigger: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="설정 메뉴">
          <SettingsIcon size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>수정</DropdownItem>
        <DropdownItem>복제</DropdownItem>
        <DropdownSeparator />
        <DropdownItem className="text-destructive">삭제</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

/** 라벨과 그룹 */
export const WithLabelAndGroup: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost-outline">계정</Button>
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <DropdownLabel>내 계정</DropdownLabel>
        <DropdownSeparator />
        <DropdownGroup>
          <DropdownItem>프로필</DropdownItem>
          <DropdownItem>청구</DropdownItem>
          <DropdownItem>설정</DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />
        <DropdownItem>로그아웃</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

/** 체크박스 아이템 */
export const WithCheckboxItems: Story = {
  render: function CheckboxExample() {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">보기 설정</Button>
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <DropdownLabel>패널 표시</DropdownLabel>
          <DropdownSeparator />
          <DropdownCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            상태 바
          </DropdownCheckboxItem>
          <DropdownCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            활동 바
          </DropdownCheckboxItem>
          <DropdownCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            패널
          </DropdownCheckboxItem>
        </DropdownContent>
      </Dropdown>
    )
  },
}

/** 라디오 그룹 (선택 상태 표시) */
export const WithRadioGroup: Story = {
  render: function RadioExample() {
    const [language, setLanguage] = useState("ko")

    return (
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">언어 선택</Button>
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <DropdownLabel>언어</DropdownLabel>
          <DropdownSeparator />
          <DropdownRadioGroup value={language} onValueChange={setLanguage}>
            <DropdownRadioItem value="ko">한국어</DropdownRadioItem>
            <DropdownRadioItem value="en">English</DropdownRadioItem>
            <DropdownRadioItem value="ja">日本語</DropdownRadioItem>
          </DropdownRadioGroup>
        </DropdownContent>
      </Dropdown>
    )
  },
}

/** 비활성화 아이템 */
export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="ghost-outline">작업</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>편집</DropdownItem>
        <DropdownItem disabled>복사 (권한 없음)</DropdownItem>
        <DropdownSeparator />
        <DropdownItem disabled>삭제 (권한 없음)</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

/** 방향 설정 (side & align) */
export const Positioning: Story = {
  render: () => (
    <div className="flex gap-8">
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">아래 (기본)</Button>
        </DropdownTrigger>
        <DropdownContent side="bottom" align="start">
          <DropdownItem>옵션 1</DropdownItem>
          <DropdownItem>옵션 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">오른쪽</Button>
        </DropdownTrigger>
        <DropdownContent side="right" align="start">
          <DropdownItem>옵션 1</DropdownItem>
          <DropdownItem>옵션 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">위</Button>
        </DropdownTrigger>
        <DropdownContent side="top" align="start">
          <DropdownItem>옵션 1</DropdownItem>
          <DropdownItem>옵션 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">왼쪽</Button>
        </DropdownTrigger>
        <DropdownContent side="left" align="start">
          <DropdownItem>옵션 1</DropdownItem>
          <DropdownItem>옵션 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
}

/** 수동 선택 상태 표시 (언어 선택기 스타일) */
export const ManualActiveState: Story = {
  render: function ManualActiveExample() {
    const [selected, setSelected] = useState("option1")

    const options = [
      { value: "option1", label: "옵션 1" },
      { value: "option2", label: "옵션 2" },
      { value: "option3", label: "옵션 3" },
    ]

    return (
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="ghost-outline">
            {options.find((o) => o.value === selected)?.label}
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={selected === option.value ? "bg-accent" : ""}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    )
  },
}
