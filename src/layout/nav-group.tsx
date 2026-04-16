"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { NavItem } from "./nav-item"
import type { NavMenuLayout } from "./nav-menu"

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
  /** 레이아웃 (NavMenu에서 전달됨) */
  layout?: NavMenuLayout
  /** 뎁스 레벨 */
  depth?: 1 | 2 | 3
  /** @internal 플라이아웃 내부 여부 (collapsed 모드에서 중첩 NavGroup 처리용) */
  _inFlyout?: boolean
}

/** 드롭다운 컨텐츠 공통 스타일 */
const dropdownContentStyles = cn(
  "min-w-[200px] py-2 px-3 rounded-md z-50",
  "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
  "shadow-lg",
  "transition-all duration-150 ease-out",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=right]:slide-in-from-left-1"
)

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
      layout = "vertical",
      depth = 1,
      _inFlyout = false,
      children,
      ...props
    },
    ref
  ) => {
    const [expandedState, setExpandedState] = React.useState(defaultExpanded)
    const isExpanded = expandedProp !== undefined ? expandedProp : expandedState

    // hover 상태 관리 (Popover용)
    const [isHovered, setIsHovered] = React.useState(false)
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false)
      }, 30)
    }

    // collapsed 상태가 안정화된 후에만 flyout 렌더링 (깜빡임 방지)
    const [stableCollapsed, setStableCollapsed] = React.useState(collapsed)

    React.useEffect(() => {
      const timer = setTimeout(() => setStableCollapsed(collapsed), 300)
      return () => clearTimeout(timer)
    }, [collapsed])

    // cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
      }
    }, [])

    const handleToggle = () => {
      const newExpanded = !isExpanded
      setExpandedState(newExpanded)
      onExpandedChange?.(newExpanded)
    }

    // 드롭다운 children 렌더링 헬퍼
    const renderDropdownChildren = (inFlyout: boolean, childDepth: number) => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ layout?: NavMenuLayout; depth?: number; _inFlyout?: boolean; collapsed?: boolean }>, {
            layout: "vertical",
            depth: childDepth,
            _inFlyout: inFlyout,
            collapsed: false,
          })
        }
        return child
      })
    }

    // Horizontal 레이아웃: 호버 시 드롭다운 표시 (Popover Portal)
    if (layout === "horizontal") {
      return (
        <PopoverPrimitive.Root open={isHovered}>
          <PopoverPrimitive.Anchor asChild>
            <div
              ref={ref}
              className={cn("relative", className)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...props}
            >
              <NavItem
                icon={icon}
                label={label}
                active={active}
                layout="horizontal"
                hasChildren
              />
            </div>
          </PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              className={dropdownContentStyles}
              sideOffset={4}
              align="start"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {/* 그룹 라벨 */}
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
                {label}
              </div>
              {/* 하위 메뉴 */}
              <div className="flex flex-col gap-0.5">
                {renderDropdownChildren(true, 2)}
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      )
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

    // 축소 모드에서는 아이콘 + 라벨 표시 + 호버 시 플라이아웃 (Popover Portal)
    if (collapsed) {
      return (
        <PopoverPrimitive.Root open={isHovered}>
          <PopoverPrimitive.Anchor asChild>
            <div
              className="relative w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavItem
                icon={icon}
                label={label}
                active={active}
                collapsed
                hasChildren
              />
            </div>
          </PopoverPrimitive.Anchor>
          {stableCollapsed && (
            <PopoverPrimitive.Portal>
              <PopoverPrimitive.Content
                className={dropdownContentStyles}
                side="right"
                sideOffset={16}
                align="start"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {/* 그룹 라벨 */}
                <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
                  {label}
                </div>
                {/* 하위 메뉴 */}
                <div className="flex flex-col gap-0.5">
                  {renderDropdownChildren(true, 2)}
                </div>
              </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
          )}
        </PopoverPrimitive.Root>
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
