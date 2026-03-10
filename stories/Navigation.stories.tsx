import { useState, useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { NavMenu } from "@/layout/nav-menu"
import { NavGroup } from "@/layout/nav-group"
import { NavItem } from "@/layout/nav-item"
import { NavRenderer } from "@/layout/nav-renderer"
import { Sidebar, Notice, NavInfo } from "@/layout"
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
} from "@/icons"
import type { NavigationConfig } from "@/layout/types"

/** 스토리북 샘플 네비게이션 데이터 */
const sampleNavigation: NavigationConfig = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: NaviHomeIcon,
    href: "/dashboard",
    active: true,
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
]

const meta: Meta<typeof NavMenu> = {
  title: "Layout/Navigation",
  component: NavMenu,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    collapsed: {
      control: "boolean",
      description: "축소 모드 (아이콘만 표시)",
    },
    showToggle: {
      control: "boolean",
      description: "토글 버튼 표시 여부",
    },
  },
}

export default meta
type Story = StoryObj<typeof NavMenu>

/** 메뉴 컴포넌트 - 데이터 기반 렌더링 */
export const NavMenuOnly: Story = {
  args: {
    collapsed: false,
    showToggle: true,
  },
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(args.collapsed)

    useEffect(() => {
      setCollapsed(args.collapsed)
    }, [args.collapsed])

    return (
      <NavMenu
        collapsed={collapsed}
        showToggle={args.showToggle}
        onToggle={() => setCollapsed(!collapsed)}
      >
        <NavRenderer items={sampleNavigation} />
      </NavMenu>
    )
  },
}

/** 메뉴 컴포넌트 - 수동 구성 (개별 컴포넌트 테스트용) */
export const NavMenuManual: Story = {
  args: {
    collapsed: false,
    showToggle: true,
  },
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(args.collapsed)

    useEffect(() => {
      setCollapsed(args.collapsed)
    }, [args.collapsed])

    return (
      <NavMenu
        collapsed={collapsed}
        showToggle={args.showToggle}
        onToggle={() => setCollapsed(!collapsed)}
      >
        <NavItem icon={<NaviHomeIcon size={24} />} label="대시보드" indicator={<STLArrowIcon size={24} />} />
        <NavGroup icon={<NaviSaleIcon size={24} />} label="판매 관리">
          <NavItem label="상품 관리" depth={2} />
          <NavItem label="패키지 관리" depth={2} />
        </NavGroup>
        <NavGroup icon={<NaviOrderIcon size={24} />} label="주문 관리" defaultExpanded>
          <NavGroup label="B2C 주문" depth={2} defaultExpanded>
            <NavItem label="B2C 주문 관리" depth={3} />
            <NavItem label="주문 수집" depth={3} />
          </NavGroup>
        </NavGroup>
      </NavMenu>
    )
  },
}

/** 사이드바 - 데이터 기반 렌더링 */
export const SidebarBasic: Story = {
  args: {
    collapsed: false,
    showToggle: true,
  },
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(args.collapsed)

    useEffect(() => {
      setCollapsed(args.collapsed)
    }, [args.collapsed])

    return (
      <div style={{ height: "800px" }}>
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          showToggle={args.showToggle}
        >
          <NavRenderer items={sampleNavigation} />
        </Sidebar>
      </div>
    )
  },
}

/** 헤더 네비게이션 - Horizontal 레이아웃 + NavRenderer */
export const HorizontalWithNavRenderer: Story = {
  render: function Render() {
    const [currentPath, setCurrentPath] = useState("/dashboard")

    const handleNavClick = (href: string) => {
      setCurrentPath(href)
      console.log("Navigate to:", href)
    }

    return (
      <div className="bg-slate-50 dark:bg-slate-950 p-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">LOGO</span>
          <NavMenu layout="horizontal">
            <NavRenderer
              items={sampleNavigation}
              iconSize={20}
              currentPath={currentPath}
              onItemClick={handleNavClick}
              layout="horizontal"
            />
          </NavMenu>
        </div>
        <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded">
          <p>현재 경로: <code className="text-blue-500">{currentPath}</code></p>
        </div>
      </div>
    )
  },
}

/** 사이드바 - Notice/NavInfo 포함 */
export const SidebarWithNotice: Story = {
  args: {
    collapsed: false,
    showToggle: true,
  },
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(args.collapsed)

    useEffect(() => {
      setCollapsed(args.collapsed)
    }, [args.collapsed])

    return (
      <div style={{ height: "800px" }}>
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          showToggle={args.showToggle}
          footer={
            <div className="flex flex-col gap-3">
              <Notice
                icon={<NoticeIcon size={20} />}
                title="CBT 시스템 정기 점검 안내 (12/15 02:00–05:00)"
                description="안녕하세요. 더 안정적인 서비스 제공을 위해 CBT 시스템의 정기 점검이 진행될 예정입니다."
              />
              <NavInfo
                items={[
                  { icon: <PhoneIcon size={20} />, text: "1800-4636", href: "tel:1800-4636" },
                  { icon: <LocationIcon size={20} />, text: "경기도 파주시 조리읍 대원로 95-5 스타트투데이 2센터" },
                ]}
              />
            </div>
          }
        >
          <NavRenderer items={sampleNavigation} />
        </Sidebar>
      </div>
    )
  },
}
