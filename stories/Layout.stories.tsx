import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AppShell, Sidebar, Header } from "../src/layout";
import { NavGroup } from "../src/layout/nav-group";
import { NavItem } from "../src/layout/nav-item";
import { NavRenderer } from "../src/layout/nav-renderer";
import { Button } from "../src/components/ui/button";
import { SearchBar } from "../src/layout/search-bar";
import { VisitTag } from "../src/layout/visit-tag";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../src/components/ui/dropdown";
import {
  SolidHomeIcon,
  SolidProductIcon,
  SolidPostIcon,
  SolidShipIcon,
  SolidStockIcon,
  NoticeIcon,
  PhoneIcon,
  LocationIcon,
  STLArrowIcon,
  ShipIcon,
  AlarmIcon,
  ProfileIcon,
  UpIcon,
  DownIcon,
} from "../src/icons";
import type { NavigationConfig } from "../src/layout/types";

/** 스토리북 샘플 네비게이션 데이터 */
const sampleNavigation: NavigationConfig = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: SolidHomeIcon,
    href: "/dashboard",
    active: true,
    hasIndicator: true,
  },
  {
    id: "sales",
    label: "판매 관리",
    icon: SolidProductIcon,
    children: [
      { id: "products", label: "상품 관리", href: "/sales/products" },
      { id: "packages", label: "패키지 관리", href: "/sales/packages" },
    ],
  },
  {
    id: "orders",
    label: "주문 관리",
    icon: SolidPostIcon,
    defaultExpanded: true,
    children: [
      {
        id: "b2c-orders",
        label: "B2C 주문",
        defaultExpanded: true,
        children: [
          { id: "b2c-order-management", label: "B2C 주문 관리", href: "/orders/b2c" },
          { id: "order-collection", label: "주문 수집", href: "/orders/collection" },
        ],
      },
    ],
  },
  {
    id: "shipping",
    label: "배송 관리",
    icon: SolidShipIcon,
    children: [
      { id: "b2c-shipping", label: "B2C 배송 관리", href: "/shipping/b2c" },
    ],
  },
  {
    id: "inventory",
    label: "재고 관리",
    icon: SolidStockIcon,
    defaultExpanded: true,
    children: [
      { id: "inbound", label: "입고 관리", href: "/inventory/inbound" },
    ],
  },
];

const languages = [
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

/** 언어 선택 드롭다운 */
function LanguageSelector() {
  const [language, setLanguage] = useState("ko");
  const [open, setOpen] = useState(false);
  const currentLang = languages.find((l) => l.code === language);

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-0.5 text-sm text-gray-700 dark:text-gray-300 tracking-[-0.14px] hover:text-primary dark:hover:text-primary-300 transition-colors"
        >
          <span>{currentLang?.label || "Language"}</span>
          {open ? <DownIcon size={24} /> : <UpIcon size={24} />}
        </button>
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
  );
}

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleRecentSearches = [
  { id: "1", text: "최근 검색어 1" },
  { id: "2", text: "최근 검색어 2" },
  { id: "3", text: "최근 검색어 3" },
  { id: "4", text: "최근 검색어 4" },
  { id: "5", text: "최근 검색어 5" },
];

/** 기본 레이아웃 - Compound Component + 데이터 기반 네비게이션 */
export const Default: Story = {
  render: function Render() {
    const [visits, setVisits] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
      { id: "3", label: "사은품 관리" },
    ]);

    const handleRemoveVisit = (id: string) => {
      setVisits(visits.filter((v) => v.id !== id));
    };

    return (
      <div style={{ height: "800px" }}>
        <AppShell>
          <AppShell.Sidebar
            noticeIcon={<NoticeIcon size={20} />}
            noticeTitle="CBT 시스템 정기 점검 안내 (12/15 02:00–05:00)"
            noticeDescription="안녕하세요. 더 안정적인 서비스 제공을 위해 CBT 시스템의 정기 점검이 진행될 예정입니다."
            infoItems={[
              {
                icon: <PhoneIcon size={20} />,
                text: "1800-4636",
                href: "tel:1800-4636",
              },
              {
                icon: <LocationIcon size={20} />,
                text: "경기도 파주시 조리읍 대원로 95-5 스타트투데이 2센터",
              },
            ]}
          >
            <NavRenderer items={sampleNavigation} />
          </AppShell.Sidebar>

          <AppShell.Header
            search={
              <SearchBar
                placeholder="주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소"
                recentSearches={sampleRecentSearches}
                className="w-full"
              />
            }
            recentVisits={
              <div className="flex items-center gap-1.5">
                {visits.map((visit) => (
                  <VisitTag
                    key={visit.id}
                    label={visit.label}
                    onNavigate={() => console.log(`Navigate to ${visit.label}`)}
                    onRemove={() => handleRemoveVisit(visit.id)}
                  />
                ))}
              </div>
            }
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="설정">
                  <ShipIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <AlarmIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
                <LanguageSelector />
              </div>
            }
          />

          <AppShell.Content>
            <div className="bg-white dark:bg-dark-500 rounded-lg p-6 h-full">
              <h1 className="text-xl font-bold mb-4">대시보드</h1>
              <p className="text-muted-foreground">
                여기에 대시보드 콘텐츠가 들어갑니다.
              </p>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

/** 사이드바만 (개별 컴포넌트 테스트) */
export const SidebarOnly: Story = {
  render: () => (
    <div style={{ height: "800px" }}>
      <Sidebar
        noticeIcon={<NoticeIcon size={20} />}
        noticeTitle="시스템 점검 안내"
        noticeDescription="12/15 02:00–05:00 점검 예정"
        infoItems={[
          {
            icon: <PhoneIcon size={20} />,
            text: "1800-4636",
            href: "tel:1800-4636",
          },
        ]}
      >
        <NavItem
          icon={<SolidHomeIcon size={24} />}
          label="대시보드"
          active
          indicator={<STLArrowIcon size={24} />}
        />
        <NavGroup icon={<SolidProductIcon size={24} />} label="판매 관리">
          <NavItem label="상품 관리" depth={2} />
        </NavGroup>
        <NavGroup
          icon={<SolidPostIcon size={24} />}
          label="주문 관리"
          defaultExpanded
        >
          <NavItem label="B2C 주문 관리" depth={2} />
        </NavGroup>
      </Sidebar>
    </div>
  ),
};

/** 헤더만 (개별 컴포넌트 테스트) */
export const HeaderOnly: Story = {
  render: function Render() {
    const [visits, setVisits] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
      { id: "3", label: "사은품 관리" },
    ]);

    const handleRemoveVisit = (id: string) => {
      setVisits(visits.filter((v) => v.id !== id));
    };

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
          <div className="flex items-center gap-1.5">
            {visits.map((visit) => (
              <VisitTag
                key={visit.id}
                label={visit.label}
                onNavigate={() => console.log(`Navigate to ${visit.label}`)}
                onRemove={() => handleRemoveVisit(visit.id)}
              />
            ))}
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" aria-label="설정">
              <ShipIcon size={24} />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="알림">
              <AlarmIcon size={24} />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="프로필">
              <ProfileIcon size={24} />
            </Button>
            <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
              <span>Language</span>
            </div>
          </div>
        }
      />
    );
  },
};

/** 사이드바 없는 레이아웃 - Compound Component 패턴 */
export const NoSidebar: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <AppShell>
        <AppShell.Header
          search={
            <SearchBar
              placeholder="전체 검색..."
              recentSearches={sampleRecentSearches}
              className="w-[400px]"
            />
          }
          actions={
            <Button variant="action" size="sm">
              로그인
            </Button>
          }
        />

        <AppShell.Content>
          <div className="bg-white dark:bg-dark-500 rounded-lg p-4 h-full">
            <h1 className="text-xl font-bold">사이드바 없는 레이아웃</h1>
          </div>
        </AppShell.Content>
      </AppShell>
    </div>
  ),
};
