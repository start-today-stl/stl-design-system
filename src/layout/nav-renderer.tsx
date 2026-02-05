import * as React from "react"
import { NavGroup } from "./nav-group"
import { NavItem } from "./nav-item"
import { STLArrowIcon } from "@/icons"
import {
  type NavigationConfig,
  type NavItemConfig,
  type NavGroupConfig,
  type TopLevelNavItem,
  type TopLevelNavGroup,
  isNavGroup,
} from "@/config/navigation"

export interface NavRendererProps {
  /** 네비게이션 설정 데이터 */
  items: NavigationConfig
  /** 아이콘 크기 */
  iconSize?: number
  /** indicator 아이콘 크기 */
  indicatorSize?: number
  /** 축소 모드 (아이콘만 표시) */
  collapsed?: boolean
}

type DepthLevel = 1 | 2 | 3

/** depth 값을 유효한 범위로 변환 */
function toDepthLevel(depth: number): DepthLevel | undefined {
  if (depth <= 1) return undefined
  if (depth >= 3) return 3
  return depth as DepthLevel
}

/** 네비게이션 설정 데이터를 컴포넌트로 렌더링 */
export function NavRenderer({
  items,
  iconSize = 24,
  indicatorSize = 24,
  collapsed,
}: NavRendererProps) {
  const renderItem = (
    item: NavItemConfig | NavGroupConfig | TopLevelNavItem | TopLevelNavGroup,
    depth: number = 1
  ): React.ReactNode => {
    if (isNavGroup(item)) {
      const IconComponent = "icon" in item ? item.icon : undefined

      return (
        <NavGroup
          key={item.id}
          icon={IconComponent ? <IconComponent size={iconSize} /> : undefined}
          label={item.label}
          depth={toDepthLevel(depth)}
          defaultExpanded={item.defaultExpanded}
          collapsed={collapsed}
        >
          {item.children.map((child) => renderItem(child, depth + 1))}
        </NavGroup>
      )
    }

    // NavItem
    const navItem = item as TopLevelNavItem | NavItemConfig
    const IconComponent = "icon" in navItem ? navItem.icon : undefined

    return (
      <NavItem
        key={navItem.id}
        icon={IconComponent ? <IconComponent size={iconSize} /> : undefined}
        label={navItem.label}
        active={navItem.active}
        depth={toDepthLevel(depth)}
        collapsed={collapsed}
        indicator={
          navItem.hasIndicator ? (
            <STLArrowIcon size={indicatorSize} />
          ) : undefined
        }
      />
    )
  }

  return <>{items.map((item) => renderItem(item))}</>
}
