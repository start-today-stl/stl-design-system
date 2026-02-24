import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Header } from "../src/layout"
import { Button } from "../src/components/ui/button"
import { SearchBar } from "../src/layout/search-bar"
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../src/components/ui/dropdown"
import {
  ShipIcon,
  BellIcon,
  ProfileIcon,
  UpIcon,
  DownIcon,
} from "../src/icons"

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    search: {
      control: false,
      description: "검색 영역 (Search Input)",
    },
    center: {
      control: false,
      description: "중앙 커스텀 영역",
    },
    actions: {
      control: false,
      description: "기능 버튼 영역 (아이콘 등)",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

const sampleRecentSearches = [
  { id: "1", text: "최근 검색어 1" },
  { id: "2", text: "최근 검색어 2" },
  { id: "3", text: "최근 검색어 3" },
]

const languages = [
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
]

/** 언어 선택 드롭다운 */
function LanguageSelector() {
  const [language, setLanguage] = useState("ko")
  const [open, setOpen] = useState(false)
  const currentLang = languages.find((l) => l.code === language)

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <Button variant="text" className="text-sm tracking-[-0.14px]">
          <span>{currentLang?.label || "Language"}</span>
          {open ? <DownIcon size={24} /> : <UpIcon size={24} />}
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end" className="min-w-[100px]">
        {languages.map((lang) => (
          <DropdownItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-accent" : ""}
          >
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  )
}

/** 기본 헤더 */
export const Default: Story = {
  render: () => (
    <Header
      search={
        <SearchBar
          placeholder="주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소"
          recentSearches={sampleRecentSearches}
          className="w-full"
        />
      }
      actions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="설정">
            <ShipIcon size={24} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="알림">
            <BellIcon size={24} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="프로필">
            <ProfileIcon size={24} />
          </Button>
          <LanguageSelector />
        </div>
      }
    />
  ),
}

/** 검색바만 */
export const SearchOnly: Story = {
  render: () => (
    <Header
      search={
        <SearchBar
          placeholder="검색어를 입력하세요"
          recentSearches={sampleRecentSearches}
          className="w-[400px]"
        />
      }
    />
  ),
}

/** 액션 버튼만 */
export const WithActions: Story = {
  render: () => (
    <Header
      search={
        <SearchBar
          placeholder="검색어를 입력하세요"
          className="w-[400px]"
        />
      }
      actions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="알림">
            <BellIcon size={24} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="프로필">
            <ProfileIcon size={24} />
          </Button>
          <LanguageSelector />
        </div>
      }
    />
  ),
}

/** 중앙 커스텀 영역 (center prop) */
export const WithCenter: Story = {
  render: () => (
    <Header
      search={
        <SearchBar
          placeholder="검색어를 입력하세요"
          recentSearches={sampleRecentSearches}
          className="w-full"
        />
      }
      center={
        <span className="text-sm text-slate-500">
          중앙 커스텀 영역
        </span>
      }
      actions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="알림">
            <BellIcon size={24} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="프로필">
            <ProfileIcon size={24} />
          </Button>
          <LanguageSelector />
        </div>
      }
    />
  ),
}
