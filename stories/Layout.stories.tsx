import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AppShell, Sidebar, Header, PageTitle, PageHeader, Notice, NavInfo, NavMenu } from "../src/layout";
import { Tabs, TabsList, TabsTrigger } from "../src/components/ui/tabs";
import { stlLogoLight, stlLogoDark } from "../src/assets";
import { NavGroup } from "../src/layout/nav-group";
import { NavItem } from "../src/layout/nav-item";
import { NavRenderer } from "../src/layout/nav-renderer";
import { Button } from "../src/components/ui/button";
import { Breadcrumb } from "../src/components/ui/breadcrumb";
import { SearchBar } from "../src/layout/search-bar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../src/components/ui/dropdown";
import {
  NaviHomeIcon,
  NaviSaleIcon,
  NaviOrderIcon,
  NaviShipIcon,
  NaviStockIcon,
  NoticeIcon,
  PhoneIcon,
  LocationIcon,
  STLArrowIcon,
  ShipIcon,
  BellIcon,
  ProfileIcon,
  KoreanIcon,
  JapaneseIcon,
  EnglishIcon,
  UpIcon,
  DownIcon,
} from "../src/icons";
import type { NavigationConfig } from "../src/layout/types";

/** 스토리북 샘플 네비게이션 데이터 */
const sampleNavigation: NavigationConfig = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: NaviHomeIcon,
    href: "/dashboard",
    hasIndicator: true,
  },
  {
    id: "sales",
    label: "판매 관리",
    icon: NaviSaleIcon,
    children: [
      { id: "products", label: "상품 관리", href: "/sales/products" },
      { id: "packages", label: "패키지 관리", href: "/sales/packages" },
    ],
  },
  {
    id: "orders",
    label: "주문 관리",
    icon: NaviOrderIcon,
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
    icon: NaviShipIcon,
    children: [
      { id: "b2c-shipping", label: "B2C 배송 관리", href: "/shipping/b2c" },
    ],
  },
  {
    id: "inventory",
    label: "재고 관리",
    icon: NaviStockIcon,
    defaultExpanded: true,
    children: [
      { id: "inbound", label: "입고 관리", href: "/inventory/inbound" },
    ],
  },
];

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

// ============================================================================
// 기본 레이아웃
// ============================================================================

/**
 * 기본 레이아웃 - 사이드바(Mini 축소 모드) + 헤더 + 콘텐츠
 *
 * 사이드바 토글 버튼으로 펼침/축소가 가능하며, 축소 시 아이콘만 표시됩니다.
 */
export const Default: Story = {
  render: function Render() {
    const [currentPath, setCurrentPath] = useState("/dashboard");
    const [bookmarked, setBookmarked] = useState(false);
    // 언어 선택 상태
    const [locale, setLocale] = useState("ko");
    const [langOpen, setLangOpen] = useState(false);
    const languages = [
      { code: "ko", label: "한국어", icon: KoreanIcon },
      { code: "ja", label: "日本語", icon: JapaneseIcon },
      { code: "en", label: "English", icon: EnglishIcon },
    ];
    const currentLang = languages.find((l) => l.code === locale);
    const CurrentLangIcon = currentLang?.icon || KoreanIcon;

    return (
      <div style={{ height: "800px" }}>
        <AppShell>
          <AppShell.Sidebar
            logo={(collapsed) =>
              collapsed ? (
                <STLArrowIcon size={36} className="text-primary" />
              ) : (
                <div className="relative h-8">
                  <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
                  <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
                </div>
              )
            }
            footer={
              <>
                <Notice
                  icon={<NoticeIcon size={20} />}
                  title="CBT 시스템 정기 점검 안내 (12/15 02:00–05:00)"
                  description="안녕하세요. 더 안정적인 서비스 제공을 위해 CBT 시스템의 정기 점검이 진행될 예정입니다."
                  className="mb-5"
                />
                <NavInfo
                  items={[
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
                />
              </>
            }
          >
            <NavRenderer
              items={sampleNavigation}
              currentPath={currentPath}
              onItemClick={(href) => setCurrentPath(href)}
            />
          </AppShell.Sidebar>

          <AppShell.Header
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
                {/* 언어 선택 드롭다운 */}
                <Dropdown open={langOpen} onOpenChange={setLangOpen}>
                  <DropdownTrigger asChild>
                    <Button variant="text" className="text-sm tracking-[-0.14px]">
                      <CurrentLangIcon size={20} />
                      <span>{currentLang?.label || "Language"}</span>
                      {langOpen ? <DownIcon size={24} /> : <UpIcon size={24} />}
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent align="end" className="min-w-[120px]">
                    {languages.map((lang) => {
                      const LangIcon = lang.icon;
                      return (
                        <DropdownItem
                          key={lang.code}
                          onClick={() => setLocale(lang.code)}
                          className={locale === lang.code ? "bg-accent" : ""}
                        >
                          <LangIcon size={20} />
                          <span>{lang.label}</span>
                        </DropdownItem>
                      );
                    })}
                  </DropdownContent>
                </Dropdown>
              </div>
            }
          />

          <AppShell.Content>
            <div className="flex flex-col gap-4">
              <PageTitle
                title="대시보드"
                subtitle="Dashboard"
                bookmarked={bookmarked}
                onBookmark={() => setBookmarked(!bookmarked)}
              />
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 flex-1">
                <p className="text-muted-foreground">
                  여기에 대시보드 콘텐츠가 들어갑니다.
                </p>
              </div>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

// ============================================================================
// 사이드바 모드
// ============================================================================

/**
 * 사이드바 Hidden 모드 - 완전히 숨기고 헤더 메뉴로 토글
 *
 * `collapseMode="hidden"` 사용 시 사이드바가 완전히 숨겨지고,
 * 헤더에 메뉴 버튼이 자동으로 추가됩니다.
 */
export const SidebarHiddenMode: Story = {
  render: function Render() {
    const [collapsed, setCollapsed] = useState(true);
    const [currentPath, setCurrentPath] = useState("/dashboard");

    return (
      <div style={{ height: "800px" }}>
        <AppShell>
          <AppShell.Sidebar
            collapseMode="hidden"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            showToggle={false}
            logo={(isCollapsed) =>
              isCollapsed ? null : (
                <div className="relative h-8">
                  <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
                  <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
                </div>
              )
            }
          >
            <NavRenderer
              items={sampleNavigation}
              currentPath={currentPath}
              onItemClick={(href) => setCurrentPath(href)}
            />
          </AppShell.Sidebar>

          <AppShell.Header
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <BellIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
              </div>
            }
          >
            <SearchBar
              placeholder="검색..."
              recentSearches={sampleRecentSearches}
              className="w-full"
            />
          </AppShell.Header>

          <AppShell.Content>
            <div className="flex flex-col gap-4">
              <PageTitle title="대시보드" subtitle="Dashboard" />
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 flex-1">
                <p className="text-muted-foreground">
                  사이드바가 완전히 숨겨지고, 헤더 왼쪽의 햄버거 메뉴로 열고 닫을 수 있습니다.
                </p>
              </div>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

// ============================================================================
// 헤더 변형
// ============================================================================

/**
 * 헤더 네비게이션 - 사이드바 없이 헤더에 메뉴 배치
 *
 * `NavMenu layout="horizontal"` 사용하여 헤더에 가로 배치 네비게이션을 구현합니다.
 * PageHeader와 탭의 sticky 동작을 테스트할 수 있습니다.
 */
export const HeaderNavigation: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // TabsTrigger without TabsContent causes aria-controls to point to non-existent element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
  render: function Render() {
    const [currentPath, setCurrentPath] = useState("/dashboard");
    const [activeTab, setActiveTab] = useState("all");

    return (
      <div style={{ height: "600px" }}>
        <AppShell>
          <AppShell.Header
            logo={
              <div className="flex items-end gap-2">
                <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
                <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
              </div>
            }
            nav={
              <NavMenu layout="horizontal">
                <NavItem
                  icon={<NaviHomeIcon size={20} />}
                  label="대시보드"
                  active={currentPath === "/dashboard"}
                  onClick={() => setCurrentPath("/dashboard")}
                />
                <NavGroup
                  icon={<NaviSaleIcon size={20} />}
                  label="판매 관리"
                >
                  <NavItem
                    label="상품 관리"
                    active={currentPath === "/sales/products"}
                    onClick={() => setCurrentPath("/sales/products")}
                  />
                  <NavItem
                    label="패키지 관리"
                    active={currentPath === "/sales/packages"}
                    onClick={() => setCurrentPath("/sales/packages")}
                  />
                </NavGroup>
                <NavGroup
                  icon={<NaviOrderIcon size={20} />}
                  label="주문 관리"
                >
                  <NavItem
                    label="B2C 주문 관리"
                    active={currentPath === "/orders/b2c"}
                    onClick={() => setCurrentPath("/orders/b2c")}
                  />
                  <NavItem
                    label="주문 수집"
                    active={currentPath === "/orders/collection"}
                    onClick={() => setCurrentPath("/orders/collection")}
                  />
                </NavGroup>
                <NavGroup
                  icon={<NaviShipIcon size={20} />}
                  label="배송 관리"
                >
                  <NavItem
                    label="B2C 배송 관리"
                    active={currentPath === "/shipping/b2c"}
                    onClick={() => setCurrentPath("/shipping/b2c")}
                  />
                </NavGroup>
              </NavMenu>
            }
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <BellIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
              </div>
            }
          >
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">
                DEV 환경
              </span>
            </div>
          </AppShell.Header>

          <AppShell.Content>
            <PageHeader
              title="B2C 주문관리"
              subtitle="B2C Order Management"
              sticky
              tabs={
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">전체</TabsTrigger>
                    <TabsTrigger value="pending">대기</TabsTrigger>
                    <TabsTrigger value="processing">처리중</TabsTrigger>
                    <TabsTrigger value="completed">완료</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            />
            {/* 스크롤 테스트용 콘텐츠 */}
            <div className="flex flex-col gap-4 mt-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6">
                  <p className="text-muted-foreground">
                    콘텐츠 항목 {i + 1} - 스크롤하여 sticky 동작을 테스트하세요.
                  </p>
                </div>
              ))}
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

/**
 * 브레드크럼 포함 레이아웃
 *
 * `Breadcrumb` 컴포넌트를 사용하여 현재 위치를 표시합니다.
 */
export const WithBreadcrumb: Story = {
  render: function Render() {
    const [currentPath, setCurrentPath] = useState("/orders/b2c");
    const [bookmarked, setBookmarked] = useState(false);
    // 언어 선택 상태
    const [locale, setLocale] = useState("ko");
    const [langOpen, setLangOpen] = useState(false);
    const languages = [
      { code: "ko", label: "한국어", icon: KoreanIcon },
      { code: "ja", label: "日本語", icon: JapaneseIcon },
      { code: "en", label: "English", icon: EnglishIcon },
    ];
    const currentLang = languages.find((l) => l.code === locale);
    const CurrentLangIcon = currentLang?.icon || KoreanIcon;

    return (
      <div style={{ height: "800px" }}>
        <AppShell>
          <AppShell.Sidebar
            logo={(collapsed) =>
              collapsed ? (
                <STLArrowIcon size={36} className="text-primary" />
              ) : (
                <div className="relative h-8">
                  <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
                  <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
                </div>
              )
            }
            footer={
              <>
                <Notice
                  icon={<NoticeIcon size={20} />}
                  title="CBT 시스템 정기 점검 안내"
                  className="mb-5"
                />
                <NavInfo
                  items={[
                    {
                      icon: <PhoneIcon size={20} />,
                      text: "1800-4636",
                      href: "tel:1800-4636",
                    },
                  ]}
                />
              </>
            }
          >
            <NavRenderer
              items={sampleNavigation}
              currentPath={currentPath}
              onItemClick={(href) => setCurrentPath(href)}
            />
          </AppShell.Sidebar>

          <AppShell.Header
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <BellIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
                {/* 언어 선택 드롭다운 */}
                <Dropdown open={langOpen} onOpenChange={setLangOpen}>
                  <DropdownTrigger asChild>
                    <Button variant="text" className="text-sm tracking-[-0.14px]">
                      <CurrentLangIcon size={20} />
                      <span>{currentLang?.label || "Language"}</span>
                      {langOpen ? <DownIcon size={24} /> : <UpIcon size={24} />}
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent align="end" className="min-w-[120px]">
                    {languages.map((lang) => {
                      const LangIcon = lang.icon;
                      return (
                        <DropdownItem
                          key={lang.code}
                          onClick={() => setLocale(lang.code)}
                          className={locale === lang.code ? "bg-accent" : ""}
                        >
                          <LangIcon size={20} />
                          <span>{lang.label}</span>
                        </DropdownItem>
                      );
                    })}
                  </DropdownContent>
                </Dropdown>
              </div>
            }
          >
            <SearchBar
              placeholder="검색..."
              recentSearches={sampleRecentSearches}
              className="w-full"
            />
          </AppShell.Header>

          <AppShell.Content>
            <div className="flex flex-col gap-2">
              <Breadcrumb
                items={[
                  { label: "홈", href: "/" },
                  { label: "주문 관리", href: "/orders" },
                  { label: "B2C 주문관리" },
                ]}
              />
              <PageTitle
                title="B2C 주문관리"
                subtitle="B2C Order Management"
                bookmarked={bookmarked}
                onBookmark={() => setBookmarked(!bookmarked)}
              />
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 flex-1 mt-4">
                <p className="text-muted-foreground">
                  주문 목록 테이블이 여기에 들어갑니다.
                </p>
              </div>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

/**
 * 헤더 중앙 커스텀 영역 포함
 *
 * `children`으로 헤더 중앙에 커스텀 콘텐츠를 배치합니다.
 */
export const WithHeaderCenter: Story = {
  render: function Render() {
    const [currentPath, setCurrentPath] = useState("/dashboard");
    const [bookmarked, setBookmarked] = useState(false);
    // 언어 선택 상태
    const [locale, setLocale] = useState("ko");
    const [langOpen, setLangOpen] = useState(false);
    const languages = [
      { code: "ko", label: "한국어", icon: KoreanIcon },
      { code: "ja", label: "日本語", icon: JapaneseIcon },
      { code: "en", label: "English", icon: EnglishIcon },
    ];
    const currentLang = languages.find((l) => l.code === locale);
    const CurrentLangIcon = currentLang?.icon || KoreanIcon;

    return (
      <div style={{ height: "800px" }}>
        <AppShell>
          <AppShell.Sidebar
            logo={(collapsed) =>
              collapsed ? (
                <STLArrowIcon size={36} className="text-primary" />
              ) : (
                <div className="relative h-8">
                  <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
                  <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
                </div>
              )
            }
            footer={
              <>
                <Notice
                  icon={<NoticeIcon size={20} />}
                  title="CBT 시스템 정기 점검 안내"
                  className="mb-5"
                />
                <NavInfo
                  items={[
                    {
                      icon: <PhoneIcon size={20} />,
                      text: "1800-4636",
                      href: "tel:1800-4636",
                    },
                  ]}
                />
              </>
            }
          >
            <NavRenderer
              items={sampleNavigation}
              currentPath={currentPath}
              onItemClick={(href) => setCurrentPath(href)}
            />
          </AppShell.Sidebar>

          <AppShell.Header
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <BellIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
                {/* 언어 선택 드롭다운 */}
                <Dropdown open={langOpen} onOpenChange={setLangOpen}>
                  <DropdownTrigger asChild>
                    <Button variant="text" className="text-sm tracking-[-0.14px]">
                      <CurrentLangIcon size={20} />
                      <span>{currentLang?.label || "Language"}</span>
                      {langOpen ? <DownIcon size={24} /> : <UpIcon size={24} />}
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent align="end" className="min-w-[120px]">
                    {languages.map((lang) => {
                      const LangIcon = lang.icon;
                      return (
                        <DropdownItem
                          key={lang.code}
                          onClick={() => setLocale(lang.code)}
                          className={locale === lang.code ? "bg-accent" : ""}
                        >
                          <LangIcon size={20} />
                          <span>{lang.label}</span>
                        </DropdownItem>
                      );
                    })}
                  </DropdownContent>
                </Dropdown>
              </div>
            }
          >
            <div className="flex justify-center">
              <span className="text-sm text-slate-500">
                중앙 커스텀 영역
              </span>
            </div>
          </AppShell.Header>

          <AppShell.Content>
            <div className="flex flex-col gap-4">
              <PageTitle
                title="대시보드"
                subtitle="Dashboard"
                bookmarked={bookmarked}
                onBookmark={() => setBookmarked(!bookmarked)}
              />
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 flex-1">
                <p className="text-muted-foreground">
                  여기에 대시보드 콘텐츠가 들어갑니다.
                </p>
              </div>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    );
  },
};

// ============================================================================
// 레이아웃 조합
// ============================================================================

/**
 * 사이드바만 (개별 컴포넌트 테스트)
 */
export const SidebarOnly: Story = {
  render: () => (
    <div style={{ height: "800px" }}>
      <Sidebar
        logo={(collapsed) =>
          collapsed ? (
            <STLArrowIcon size={36} className="text-primary" />
          ) : (
            <div className="relative h-8">
              <img src={stlLogoLight} alt="STL" className="h-8 dark:hidden" />
              <img src={stlLogoDark} alt="STL" className="h-8 hidden dark:block" />
            </div>
          )
        }
        footer={
          <>
            <Notice
              icon={<NoticeIcon size={20} />}
              title="시스템 점검 안내"
              description="12/15 02:00–05:00 점검 예정"
              className="mb-5"
            />
            <NavInfo
              items={[
                {
                  icon: <PhoneIcon size={20} />,
                  text: "1800-4636",
                  href: "tel:1800-4636",
                },
              ]}
            />
          </>
        }
      >
        <NavItem
          icon={<NaviHomeIcon size={24} />}
          label="대시보드"
          active
          indicator={<STLArrowIcon size={24} />}
        />
        <NavGroup icon={<NaviSaleIcon size={24} />} label="판매 관리">
          <NavItem label="상품 관리" depth={2} />
        </NavGroup>
        <NavGroup
          icon={<NaviOrderIcon size={24} />}
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
  render: () => (
    <Header
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
          <div className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
            <span>Language</span>
          </div>
        </div>
      }
    >
      <SearchBar
        placeholder="주문번호, 주문ID, 출고번호, 이름, 전화번호, 우편번호, 이메일, 주소"
        recentSearches={sampleRecentSearches}
        className="w-full"
      />
    </Header>
  ),
};

/** 사이드바 없는 레이아웃 - Compound Component 패턴 */
export const NoSidebar: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <AppShell>
        <AppShell.Header
          actions={
            <Button variant="primary" size="sm">
              로그인
            </Button>
          }
        >
          <SearchBar
            placeholder="전체 검색..."
            recentSearches={sampleRecentSearches}
            className="w-[400px]"
          />
        </AppShell.Header>

        <AppShell.Content>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 h-full">
            <h1 className="text-xl font-bold">사이드바 없는 레이아웃</h1>
          </div>
        </AppShell.Content>
      </AppShell>
    </div>
  ),
};

/**
 * ## Content 영역
 *
 * `AppShell.Content`는 `h-full flex flex-col overflow-auto`로 구성되어 있습니다.
 *
 * - 자식에서 `flex-1`을 사용하면 남은 세로 공간을 채울 수 있습니다.
 * - 컨텐츠가 영역보다 길면 자동 스크롤됩니다.
 *
 * ### 디자인시스템 내장 동작
 * | 컴포넌트 | 기본 동작 |
 * |---|---|
 * | `Content` | `h-full flex flex-col overflow-auto` |
 * | `SearchForm` | `shrink-0` — flex 부모 안에서 줄어들지 않음 |
 * | `TableContainer` | `flex flex-col` — `grow` prop으로 남은 공간 채움 가능 |
 * | `Table` wrapper | `flex-1 bg-white` — 빈 데이터일 때도 배경 유지 |
 * | `PaginationFooter` | `mt-auto` — 컨테이너 하단 고정 |
 */
export const ContentLayout: StoryObj = {
  name: "Content",
  render: () => (
    <div style={{ height: 500 }} className="border rounded-lg overflow-hidden">
      <div className="h-full flex flex-col p-4 gap-2">
        <div className="bg-slate-100 rounded-xl p-4 shrink-0 text-sm text-slate-500">
          shrink-0 영역 (줄어들지 않음)
        </div>
        <div className="flex-1 min-h-0 flex flex-col border rounded-xl overflow-hidden">
          <div className="flex-1 bg-white flex items-center justify-center text-slate-400">
            flex-1 영역 (남은 공간 채움)
          </div>
          <div className="px-4 py-2 bg-white border-t text-sm text-slate-500 mt-auto">
            mt-auto 영역 (하단 고정)
          </div>
        </div>
      </div>
    </div>
  ),
};
