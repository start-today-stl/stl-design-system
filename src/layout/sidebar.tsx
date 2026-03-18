import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { NavMenu } from "./nav-menu"

export type SidebarCollapseMode = "mini" | "hidden"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 영역 커스터마이징 (collapsed 상태를 받아 다른 렌더링 가능) */
  logo?: (collapsed: boolean) => React.ReactNode
  /** 축소 상태 (외부에서 제어할 때 사용) */
  collapsed?: boolean
  /** 기본 축소 상태 */
  defaultCollapsed?: boolean
  /** 축소 상태 변경 핸들러 */
  onCollapsedChange?: (collapsed: boolean) => void
  /** 축소 모드: mini(아이콘만 표시) | hidden(완전히 숨김) */
  collapseMode?: SidebarCollapseMode
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
      collapseMode = "mini",
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

    // hidden 모드에서 collapsed일 때는 완전히 숨김
    const isHidden = collapseMode === "hidden" && collapsed

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col h-full pt-4 pb-8 bg-white dark:bg-black",
          "rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          isHidden && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태
          !isHidden && (collapsed && collapseMode === "mini" ? "w-[88px] px-0 items-center" : "w-[260px] px-6"),
          className
        )}
        {...props}
      >
        {/* 로고 영역 - crossfade 전환 효과 */}
        <div className="relative h-16 mb-4 flex-shrink-0 w-full">
          {/* 접힌 상태 로고 */}
          <div
            className={cn(
              "absolute inset-0 flex justify-center items-center transition-opacity duration-300",
              collapsed && collapseMode === "mini" ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {logo?.(true)}
          </div>
          {/* 펼친 상태 로고 */}
          <div
            className={cn(
              "absolute inset-0 flex justify-start items-center transition-opacity duration-300",
              collapsed && collapseMode === "mini" ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            {logo?.(false)}
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <NavMenu
          className="flex-1 min-h-0"
          collapsed={collapsed && collapseMode === "mini"}
          showToggle={showToggle && collapseMode === "mini"}
          scrollable
          onToggle={handleToggle}
        >
          {children}
        </NavMenu>

        {/* Footer */}
        {!(collapsed && collapseMode === "mini") && footer && (
          <div className="flex-shrink-0 mt-4 mb-8">{footer}</div>
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
