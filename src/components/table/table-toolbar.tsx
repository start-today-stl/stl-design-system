import * as React from "react"

import { cn } from "@/lib/utils"

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 전체 아이템 개수 */
  totalCount?: number
  /** 선택된 아이템 개수 */
  selectedCount?: number
  /** 전체 개수 포맷 함수 */
  formatTotal?: (count: number) => string
  /** 선택 개수 포맷 함수 */
  formatSelected?: (count: number) => string
}

const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  (
    {
      className,
      totalCount,
      selectedCount = 0,
      formatTotal = (count) => `총 ${count.toLocaleString()}건`,
      formatSelected = (count) => `${count}개 선택`,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between py-3 px-4",
          "bg-white dark:bg-slate-900",
          "border-b border-slate-200 dark:border-slate-700",
          className
        )}
        {...props}
      >
        {/* 왼쪽: 카운트 영역 */}
        <div className="flex items-center gap-2">
          {totalCount !== undefined && (
            <span className="text-base font-semibold text-slate-600 dark:text-slate-300">
              {formatTotal(totalCount)}
            </span>
          )}
          {selectedCount > 0 && (
            <span className="text-xs text-blue-500">
              {formatSelected(selectedCount)}
            </span>
          )}
        </div>

        {/* 오른쪽: 액션 버튼 영역 */}
        <div className="flex items-center gap-2">{children}</div>
      </div>
    )
  }
)
TableToolbar.displayName = "TableToolbar"

export { TableToolbar }
