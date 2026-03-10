import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 (사이드바 없이 헤더에 로고 배치 시) */
  logo?: React.ReactNode
  /** 왼쪽 메뉴 버튼 (햄버거 아이콘 등) - 사이드바 hidden 모드용 */
  menuButton?: React.ReactNode
  /** 헤더 네비게이션 (사이드바 없이 헤더에 메뉴 배치 시) */
  nav?: React.ReactNode
  /** 검색 영역 (Search Input) */
  search?: React.ReactNode
  /** 중앙 커스텀 영역 */
  center?: React.ReactNode
  /** 기능 버튼 영역 (아이콘 등) */
  actions?: React.ReactNode
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, logo, menuButton, nav, search, center, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center gap-4 w-full h-16 px-6 py-4",
          "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
          className
        )}
        {...props}
      >
        {/* 하단 그라데이션 */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 pointer-events-none" />

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

        {/* 검색 영역 (왼쪽) - 최소 200px, 공간 있으면 늘어남 */}
        {(search || children) && (
          <div className="flex-1 min-w-[200px] max-w-[593px]">
            {search || children}
          </div>
        )}

        {/* 빈 공간 (검색 없을 때 actions를 우측으로 밀기) */}
        {!search && !children && !center && <div className="flex-1" />}

        {/* 중앙 커스텀 영역 */}
        {center && (
          <div className="flex items-center flex-1 min-w-0">
            {center}
          </div>
        )}

        {/* 기능 버튼 영역 (우측 끝) */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {actions}
          </div>
        )}
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header }
