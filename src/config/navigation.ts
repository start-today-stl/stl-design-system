import type { ComponentType } from "react"
import type { IconProps } from "@/icons/types"
import {
  SolidHomeIcon,
  SolidProductIcon,
  SolidPostIcon,
  SolidShipIcon,
  SolidStockIcon,
} from "@/icons"

/** 네비게이션 아이템 타입 */
export interface NavItemConfig {
  id: string
  label: string
  href?: string
  /** 활성 상태 */
  active?: boolean
  /** 대시보드 등 특별 표시용 indicator */
  hasIndicator?: boolean
}

/** 네비게이션 그룹 타입 (children 포함) */
export interface NavGroupConfig {
  id: string
  label: string
  icon?: ComponentType<IconProps>
  /** 기본 확장 상태 */
  defaultExpanded?: boolean
  children: (NavItemConfig | NavGroupConfig)[]
}

/** 최상위 네비게이션 아이템 (아이콘 필수) */
export interface TopLevelNavItem extends NavItemConfig {
  icon: ComponentType<IconProps>
}

/** 최상위 네비게이션 그룹 (아이콘 필수) */
export interface TopLevelNavGroup extends NavGroupConfig {
  icon: ComponentType<IconProps>
}

/** 네비게이션 설정 타입 */
export type NavigationConfig = (TopLevelNavItem | TopLevelNavGroup)[]

/** 그룹인지 확인하는 타입 가드 */
export function isNavGroup(
  item: NavItemConfig | NavGroupConfig | TopLevelNavItem | TopLevelNavGroup
): item is NavGroupConfig | TopLevelNavGroup {
  return "children" in item && Array.isArray(item.children)
}

/** 샘플 네비게이션 설정 */
export const sampleNavigation: NavigationConfig = [
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
]
