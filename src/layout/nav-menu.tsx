import * as React from "react"

import { cn } from "@/lib/utils"
import { MenuVerticalIcon } from "@/icons"

export type NavMenuLayout = "vertical" | "horizontal"

export interface NavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 레이아웃: vertical(사이드바용) | horizontal(헤더용) */
  layout?: NavMenuLayout
  /** 축소 모드 (vertical에서만 동작) */
  collapsed?: boolean
  /** 토글 버튼 표시 여부 (vertical에서만 동작) */
  showToggle?: boolean
  /** 토글 버튼 클릭 핸들러 */
  onToggle?: () => void
  /** 스크롤 가능 여부 (내부 콘텐츠에 적용) */
  scrollable?: boolean
}

const NavMenu = React.forwardRef<HTMLDivElement, NavMenuProps>(
  ({ className, layout = "vertical", collapsed, showToggle = false, scrollable = false, onToggle, children, ...props }, ref) => {
    // Horizontal 레이아웃
    if (layout === "horizontal") {
      return (
        <nav
          ref={ref}
          className={cn(
            "flex items-center gap-1",
            className
          )}
          {...props}
        >
          {/* children에 layout prop 전달 */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ layout?: NavMenuLayout }>, {
                layout,
              })
            }
            return child
          })}
        </nav>
      )
    }

    // Vertical 레이아웃 (기존)
    return (
      <nav
        ref={ref}
        className={cn(
          "relative flex flex-col min-h-0 transition-all duration-300",
          collapsed ? "w-[88px] items-center" : "w-full",
          className
        )}
        {...props}
      >
        {/* 토글 버튼 - 사이드바 우측 가장자리에 배치 */}
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-all duration-300 cursor-pointer",
              collapsed ? "top-[-48px] -right-4" : "top-[-48px] -right-[40px]"
            )}
            aria-label={collapsed ? "메뉴 펼치기" : "메뉴 접기"}
          >
            <MenuVerticalIcon size={24} className="text-slate-500" />
          </button>
        )}

        {/* 메뉴 영역 - 스크롤은 이 내부 div에만 적용 */}
        <div
          className={cn(
            "flex flex-col",
            collapsed ? "items-center gap-0.5 w-full px-2 overflow-visible" : "gap-0.5 pb-4",
            scrollable && !collapsed && "flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
        >
          {/* children에 collapsed prop 전달 */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean; layout?: NavMenuLayout }>, {
                collapsed,
                layout,
              })
            }
            return child
          })}
        </div>
      </nav>
    )
  }
)
NavMenu.displayName = "NavMenu"

export { NavMenu }
