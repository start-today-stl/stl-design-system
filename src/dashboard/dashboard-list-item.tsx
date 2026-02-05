import * as React from "react"

import { cn } from "@/lib/utils"

export interface DashboardListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 날짜 (좌측) */
  date: string
  /** 제목 (중앙, 말줄임 처리) */
  title: string
  /** 추가 정보 (우측, 조회수 등) */
  extra?: string
}

const DashboardListItem = React.forwardRef<HTMLDivElement, DashboardListItemProps>(
  ({ className, date, title, extra, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-[22px] h-[28px] px-[10px] cursor-pointer transition-colors",
          "hover:bg-primary-100 dark:hover:bg-dark-300",
          className
        )}
        {...props}
      >
        {/* 날짜 */}
        <span className="w-[108px] shrink-0 text-sm text-gray-400 dark:text-gray-300">
          {date}
        </span>
        {/* 제목 */}
        <span className="flex-1 text-sm text-gray-700 truncate dark:text-gray-100">
          {title}
        </span>
        {/* 추가 정보 */}
        {extra && (
          <span className="shrink-0 text-sm text-gray-400 text-right dark:text-gray-300">
            {extra}
          </span>
        )}
      </div>
    )
  }
)
DashboardListItem.displayName = "DashboardListItem"

export { DashboardListItem }
