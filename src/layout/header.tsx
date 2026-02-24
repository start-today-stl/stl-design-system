import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 검색 영역 (Search Input) */
  search?: React.ReactNode
  /** 중앙 커스텀 영역 */
  center?: React.ReactNode
  /** 기능 버튼 영역 (아이콘 등) */
  actions?: React.ReactNode
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, search, center, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center gap-4 w-full h-[72px] px-6 py-4",
          "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
          className
        )}
        {...props}
      >
        {/* 하단 그라데이션 */}
        <div className="absolute bottom-0 left-0 right-0 h-4 -mb-4 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-950 pointer-events-none" />
        {/* 검색 영역 (왼쪽) - 최소 200px, 공간 있으면 늘어남 */}
        <div className="flex-1 min-w-[200px] max-w-[593px]">
          {search || children}
        </div>

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
