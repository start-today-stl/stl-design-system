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
import type { NavMenuLayout } from "./nav-menu"

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
  /**
   * 아이템 클릭 핸들러 (href가 있는 아이템 클릭 시 호출).
   *
   * href 가 있는 아이템은 `<a>` 로 렌더되므로 브라우저 기본 이동이 있다.
   * 이 핸들러가 지정되면 **평범한 좌클릭에 한해** 기본 이동을 막고 핸들러만 호출한다
   * (SPA 라우터 이동 + 전체 페이지 리로드가 겹치는 것을 방지).
   *
   * Cmd / Ctrl / Shift / Alt + 클릭과 휠 클릭은 브라우저에 그대로 맡겨서
   * 새 탭 / 새 창 열기가 동작한다. 이때 이 핸들러는 호출되지 않는다.
   *
   * `event` 로 기본 판단을 덮어쓸 수 있다.
   */
  onItemClick?: (
    href: string,
    item: NavItemConfig | TopLevelNavItem,
    event: React.MouseEvent<HTMLElement>
  ) => void
  /** 레이아웃 (vertical | horizontal) */
  layout?: NavMenuLayout
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
  layout = "vertical",
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
          layout={layout}
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

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (!onItemClick || !navItem.href) return
      // 새 탭 / 새 창 요청은 브라우저에 맡긴다.
      // (수식키 조합 + 휠 클릭. 이 경우 preventDefault 하면 새 탭이 안 열린다)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return
      }
      // 앵커 기본 이동을 막지 않으면 SPA 라우터 이동과 겹쳐 전체 페이지가 리로드된다.
      e.preventDefault()
      onItemClick(navItem.href, navItem, e)
    }

    return (
      <NavItem
        key={navItem.id}
        icon={IconComponent ? <IconComponent size={iconSize} /> : undefined}
        label={navItem.label}
        active={isActive}
        depth={toDepthLevel(depth)}
        collapsed={collapsed}
        layout={layout}
        indicator={
          navItem.hasIndicator ? (
            <STLArrowIcon size={indicatorSize} />
          ) : undefined
        }
        href={navItem.href}
        aria-current={isActive && navItem.href ? "page" : undefined}
        onClick={onItemClick && navItem.href ? handleClick : undefined}
      />
    )
  }

  return <>{items.map((item) => renderItem(item))}</>
}
