import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { NavMenu } from "./nav-menu"
import { Notice } from "./notice"
import { NavInfo, type NavInfoItemProps } from "./nav-info"
import { STLSignatureIcon, STLArrowIcon } from "@/icons"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 축소 상태 (외부에서 제어할 때 사용) */
  collapsed?: boolean
  /** 기본 축소 상태 */
  defaultCollapsed?: boolean
  /** 축소 상태 변경 핸들러 */
  onCollapsedChange?: (collapsed: boolean) => void
  /** 토글 버튼 표시 여부 */
  showToggle?: boolean
  /** 공지 제목 */
  noticeTitle?: string
  /** 공지 내용 */
  noticeDescription?: string
  /** 공지 아이콘 */
  noticeIcon?: React.ReactNode
  /** 정보 항목들 */
  infoItems?: NavInfoItemProps[]
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      showToggle = true,
      noticeTitle,
      noticeDescription,
      noticeIcon,
      infoItems,
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
          collapsed ? "w-[88px] px-0 items-center" : "w-[340px] px-8",
          className
        )}
        {...props}
      >
        {/* 로고 영역 */}
        <div
          className={cn(
            "h-[32px] flex items-center mb-[55px] flex-shrink-0",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          {collapsed ? (
            <STLArrowIcon size={36} className="text-primary" />
          ) : (
            <STLSignatureIcon width={161} height={28} />
          )}
        </div>

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

        {/* Notice */}
        {!collapsed && noticeTitle && (
          <Notice
            icon={noticeIcon}
            title={noticeTitle}
            description={noticeDescription}
            className="mb-5 flex-shrink-0"
          />
        )}

        {/* NavInfo */}
        {!collapsed && infoItems && infoItems.length > 0 && (
          <NavInfo items={infoItems} className="mb-8 flex-shrink-0" />
        )}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
