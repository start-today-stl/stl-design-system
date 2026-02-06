import type { ComponentType } from "react"
import type { IconProps } from "@/icons/types"

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
