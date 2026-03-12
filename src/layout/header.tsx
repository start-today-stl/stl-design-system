import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 (사이드바 없이 헤더에 로고 배치 시) */
  logo?: React.ReactNode
  /** 왼쪽 메뉴 버튼 (햄버거 아이콘 등) - 사이드바 hidden 모드용 */
  menuButton?: React.ReactNode
  /** 헤더 네비게이션 (사이드바 없이 헤더에 메뉴 배치 시) */
  nav?: React.ReactNode
  /** 기능 버튼 영역 (아이콘 등) - 우측 끝 배치 */
  actions?: React.ReactNode
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, logo, menuButton, nav, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 w-full h-16 px-3 py-4",
          "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
          "border-b border-slate-200 dark:border-slate-700",
          className
        )}
        {...props}
      >
        {/* 로고 (사이드바 없이 헤더에 로고 배치 시) */}
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        {/* 메뉴 버튼 (사이드바 hidden 모드용) */}
        {menuButton && (
          <div className="flex-shrink-0">
            {menuButton}
          </div>
        )}

        {/* 헤더 네비게이션 (사이드바 없이 헤더에 메뉴 배치 시) */}
        {nav && (
          <div className="flex items-center flex-shrink-0">
            {nav}
          </div>
        )}

        {/* 메인 콘텐츠 영역 (검색바, 커스텀 콘텐츠 등) */}
        {children ? (
          <div className="flex-1 min-w-0">
            {children}
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* 기능 버튼 영역 (우측 끝) */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header }
