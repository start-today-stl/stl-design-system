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
}

const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, icon, title, headerAction, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-gray-100 rounded-[10px] dark:bg-dark-400 dark:border-dark-300",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[10px] pt-[10px]">
          {/* 좌측: 아이콘 + 타이틀 */}
          <div className="flex items-center gap-0.5">
            {icon && (
              <span className="flex-shrink-0 text-gray-700 dark:text-gray-100">
                {icon}
              </span>
            )}
            <span className="text-sm tracking-[-0.14px] text-gray-700 dark:text-gray-100">
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
        {/* Body */}
        <div className="p-[10px]">
          {children}
        </div>
      </div>
    )
  }
)
DashboardCard.displayName = "DashboardCard"

export { DashboardCard }
