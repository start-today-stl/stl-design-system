import * as React from "react"

import { cn } from "@/lib/utils"

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 헤더 아이콘 */
  icon?: React.ReactNode
  /** 헤더 타이틀 */
  title: string
  /** 헤더 우측 액션 영역 (필터 탭, 버튼 등) */
  headerAction?: React.ReactNode
  /** 카드 내용 */
  children: React.ReactNode
  /** 컨테이너 높이에 맞춤 (h-full) */
  stretch?: boolean
}

const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, icon, title, headerAction, children, stretch = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-slate-100 rounded-[10px] dark:bg-slate-700 dark:border-slate-600 flex flex-col",
          stretch && "h-full",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0">
          {/* 좌측: 아이콘 + 타이틀 */}
          <div className="flex items-center gap-0.5">
            {icon && (
              <span className="flex-shrink-0 text-slate-700 dark:text-slate-100">
                {icon}
              </span>
            )}
            <span className="text-sm tracking-[-0.14px] text-slate-700 dark:text-slate-100">
              {title}
            </span>
          </div>
          {/* 우측: 액션 영역 */}
          {headerAction && (
            <div className="flex items-center">
              {headerAction}
            </div>
          )}
        </div>
        {/* Body - flex-1로 남은 공간 채움 */}
        <div className={cn("p-[10px]", stretch && "flex-1 flex flex-col")}>
          {children}
        </div>
      </div>
    )
  }
)
DashboardCard.displayName = "DashboardCard"

export { DashboardCard }
