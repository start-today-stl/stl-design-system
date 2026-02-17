import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Header } from "../src/layout"
import { Button } from "../src/components/ui/button"
import { SearchBar } from "../src/layout/search-bar"
import { VisitTag } from "../src/layout/visit-tag"
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
    recentVisits: {
      control: false,
      description: "최근 방문 태그 영역",
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

/** 기본 헤더 (전체 구성) */
export const Default: Story = {
  render: function Render() {
    const [visits, setVisits] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
      { id: "3", label: "사은품 관리" },
    ])

    const handleRemoveVisit = (id: string) => {
      setVisits(visits.filter((v) => v.id !== id))
    }

    return (
      <Header
        search={
          <SearchBar
            placeholder="주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소"
            recentSearches={sampleRecentSearches}
            className="w-full"
          />
        }
        recentVisits={
          <>
            {visits.map((visit) => (
              <VisitTag
                key={visit.id}
                label={visit.label}
                onNavigate={() => console.log(`Navigate to ${visit.label}`)}
                onRemove={() => handleRemoveVisit(visit.id)}
              />
            ))}
          </>
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
    )
  },
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

/** 최근 방문 태그 포함 */
export const WithRecentVisits: Story = {
  render: function Render() {
    const [visits, setVisits] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
    ])

    const handleRemoveVisit = (id: string) => {
      setVisits(visits.filter((v) => v.id !== id))
    }

    return (
      <Header
        search={
          <SearchBar
            placeholder="검색어를 입력하세요"
            recentSearches={sampleRecentSearches}
            className="w-[400px]"
          />
        }
        recentVisits={
          <>
            {visits.map((visit) => (
              <VisitTag
                key={visit.id}
                label={visit.label}
                onNavigate={() => console.log(`Navigate to ${visit.label}`)}
                onRemove={() => handleRemoveVisit(visit.id)}
              />
            ))}
          </>
        }
      />
    )
  },
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

/** 최근 방문 태그 스크롤 (태그 많을 때) */
export const WithManyVisits: Story = {
  render: function Render() {
    const [visits, setVisits] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
      { id: "3", label: "사은품 관리" },
      { id: "4", label: "주문 관리" },
      { id: "5", label: "배송 관리" },
      { id: "6", label: "재고 관리" },
      { id: "7", label: "고객 관리" },
    ])

    const handleRemoveVisit = (id: string) => {
      setVisits(visits.filter((v) => v.id !== id))
    }

    return (
      <Header
        search={
          <SearchBar
            placeholder="검색어를 입력하세요"
            recentSearches={sampleRecentSearches}
            className="w-full"
          />
        }
        recentVisits={
          <>
            {visits.map((visit) => (
              <VisitTag
                key={visit.id}
                label={visit.label}
                onNavigate={() => console.log(`Navigate to ${visit.label}`)}
                onRemove={() => handleRemoveVisit(visit.id)}
              />
            ))}
          </>
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
    )
  },
}
