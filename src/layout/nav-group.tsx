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
                  // 하위 메뉴는 collapsed 해제하고 depth 조정
                  return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean; depth?: number }>, {
                    collapsed: false,
                    depth: 2,
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
