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
} from "./types"

export interface NavRendererProps {
  /** 네비게이션 설정 데이터 */
  items: NavigationConfig
  /** 아이콘 크기 */
  iconSize?: number
  /** indicator 아이콘 크기 */
  indicatorSize?: number
  /** 축소 모드 (아이콘만 표시) */
  collapsed?: boolean
  /** 현재 경로 (active 상태 자동 결정) */
  currentPath?: string
  /** 아이템 클릭 핸들러 (href가 있는 아이템 클릭 시 호출) */
  onItemClick?: (href: string, item: NavItemConfig | TopLevelNavItem) => void
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
  currentPath,
  onItemClick,
}: NavRendererProps) {
  /** 현재 경로가 그룹의 하위 경로인지 확인 */
  const isGroupActive = (group: NavGroupConfig | TopLevelNavGroup): boolean => {
    if (!currentPath) return false
    const checkChildren = (children: (NavItemConfig | NavGroupConfig)[]): boolean => {
      return children.some((child) => {
        if (isNavGroup(child)) {
          return checkChildren(child.children)
        }
        return child.href === currentPath
      })
    }
    return checkChildren(group.children)
  }

  const renderItem = (
    item: NavItemConfig | NavGroupConfig | TopLevelNavItem | TopLevelNavGroup,
    depth: number = 1
  ): React.ReactNode => {
    if (isNavGroup(item)) {
      const IconComponent = "icon" in item ? item.icon : undefined
      const shouldExpand = item.defaultExpanded || isGroupActive(item)

      return (
        <NavGroup
          key={item.id}
          icon={IconComponent ? <IconComponent size={iconSize} /> : undefined}
          label={item.label}
          depth={toDepthLevel(depth)}
          defaultExpanded={shouldExpand}
          collapsed={collapsed}
        >
          {item.children.map((child) => renderItem(child, depth + 1))}
        </NavGroup>
      )
    }

    // NavItem
    const navItem = item as TopLevelNavItem | NavItemConfig
    const IconComponent = "icon" in navItem ? navItem.icon : undefined
    // currentPath가 있으면 href와 비교, 없으면 설정된 active 사용
    const isActive = currentPath ? navItem.href === currentPath : navItem.active

    const handleClick = () => {
      if (onItemClick && navItem.href) {
        onItemClick(navItem.href, navItem)
      }
    }

    return (
      <NavItem
        key={navItem.id}
        icon={IconComponent ? <IconComponent size={iconSize} /> : undefined}
        label={navItem.label}
        active={isActive}
        depth={toDepthLevel(depth)}
        collapsed={collapsed}
        indicator={
          navItem.hasIndicator ? (
            <STLArrowIcon size={indicatorSize} />
          ) : undefined
        }
        onClick={onItemClick && navItem.href ? handleClick : undefined}
      />
    )
  }

  return <>{items.map((item) => renderItem(item))}</>
}
