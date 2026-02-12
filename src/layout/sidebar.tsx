import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { NavMenu } from "./nav-menu"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 영역 커스터마이징 (collapsed 상태를 받아 다른 렌더링 가능) */
  logo?: (collapsed: boolean) => React.ReactNode
  /** 축소 상태 (외부에서 제어할 때 사용) */
  collapsed?: boolean
  /** 기본 축소 상태 */
  defaultCollapsed?: boolean
  /** 축소 상태 변경 핸들러 */
  onCollapsedChange?: (collapsed: boolean) => void
  /** 토글 버튼 표시 여부 */
  showToggle?: boolean
  /** 하단 커스텀 콘텐츠 */
  footer?: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      logo,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      showToggle = true,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)

    // controlled vs uncontrolled
    const isControlled = controlledCollapsed !== undefined
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed

    const handleToggle = () => {
      const newValue = !collapsed
      if (!isControlled) {
        setInternalCollapsed(newValue)
      }
      onCollapsedChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col h-full bg-white dark:bg-black",
          "pt-8 rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all",
          collapsed ? "w-[88px] px-0 items-center" : "w-[260px] px-6",
          className
        )}
        {...props}
      >
        {/* 로고 영역 */}
        {logo && (
          <div
            className={cn(
              "flex mb-[55px] flex-shrink-0",
              collapsed ? "justify-center items-center h-[32px]" : "justify-start"
            )}
          >
            {logo(collapsed)}
          </div>
        )}

        {/* 네비게이션 메뉴 */}
        <NavMenu
          className="flex-1 min-h-0"
          collapsed={collapsed}
          showToggle={showToggle}
          scrollable
          onToggle={handleToggle}
        >
          {children}
        </NavMenu>

        {/* Footer */}
        {!collapsed && footer && (
          <div className="flex-shrink-0 mb-8">{footer}</div>
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
