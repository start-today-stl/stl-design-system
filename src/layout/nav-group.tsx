"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { NavItem } from "./nav-item"

export interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 메뉴 아이콘 */
  icon?: React.ReactNode
  /** 메뉴 라벨 */
  label: string
  /** 활성 상태 */
  active?: boolean
  /** 기본 펼침 상태 */
  defaultExpanded?: boolean
  /** 펼침 상태 (제어 컴포넌트) */
  expanded?: boolean
  /** 펼침 상태 변경 핸들러 */
  onExpandedChange?: (expanded: boolean) => void
  /** 축소 모드 (아이콘만 표시) */
  collapsed?: boolean
  /** 뎁스 레벨 */
  depth?: 1 | 2 | 3
  /** @internal 플라이아웃 내부 여부 (collapsed 모드에서 중첩 NavGroup 처리용) */
  _inFlyout?: boolean
}

const NavGroup = React.forwardRef<HTMLDivElement, NavGroupProps>(
  (
    {
      className,
      icon,
      label,
      active,
      defaultExpanded = false,
      expanded: expandedProp,
      onExpandedChange,
      collapsed,
      depth = 1,
      _inFlyout = false,
      children,
      ...props
    },
    ref
  ) => {
    const [expandedState, setExpandedState] = React.useState(defaultExpanded)
    const isExpanded = expandedProp !== undefined ? expandedProp : expandedState

    const handleToggle = () => {
      const newExpanded = !isExpanded
      setExpandedState(newExpanded)
      onExpandedChange?.(newExpanded)
    }

    // 플라이아웃 내부의 중첩 NavGroup: 일반 펼침/접힘 (새 flyout 생성 안함)
    if (_inFlyout) {
      return (
        <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props}>
          {/* 2-depth 메뉴 아이템 (화살표 + 클릭 펼침) */}
          <NavItem
            icon={icon}
            label={label}
            active={active}
            depth={depth}
            hasChildren
            expanded={isExpanded}
            onClick={handleToggle}
          />
          {/* 하위 메뉴 */}
          {isExpanded && (
            <div className="flex flex-col gap-0.5">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean; depth?: number; _inFlyout?: boolean }>, {
                    collapsed: false,
                    depth: (depth || 1) + 1 as 1 | 2 | 3,
                    _inFlyout: true,
                  })
                }
                return child
              })}
            </div>
          )}
        </div>
      )
    }

    // 축소 모드에서는 아이콘만 표시 + 호버 시 플라이아웃
    if (collapsed) {
      return (
        <div className="relative group">
          <NavItem
            icon={icon}
            label={label}
            active={active}
            collapsed
            hasChildren
          />
          {/* 호버 시 플라이아웃 메뉴 */}
          <div className={cn(
            "absolute left-full top-0 ml-2 min-w-[200px] py-2 px-3 rounded-md",
            "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700",
            "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
            "transition-all duration-200 z-50"
          )}>
            {/* 그룹 라벨 */}
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
              {label}
            </div>
            {/* 하위 메뉴 */}
            <div className="flex flex-col gap-0.5">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  // 하위 메뉴는 collapsed 해제하고 depth 조정, 플라이아웃 내부 표시
                  return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean; depth?: number; _inFlyout?: boolean }>, {
                    collapsed: false,
                    depth: 2,
                    _inFlyout: true,
                  })
                }
                return child
              })}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props}>
        {/* 부모 메뉴 아이템 */}
        <NavItem
          icon={icon}
          label={label}
          active={active}
          depth={depth}
          hasChildren
          expanded={isExpanded}
          onClick={handleToggle}
        />

        {/* 서브메뉴 */}
        {isExpanded && (
          <div className="flex flex-col gap-0.5">
            {children}
          </div>
        )}
      </div>
    )
  }
)
NavGroup.displayName = "NavGroup"

export { NavGroup }
