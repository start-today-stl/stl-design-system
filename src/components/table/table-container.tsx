import * as React from "react"

import { cn } from "@/lib/utils"

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 요소 (TableToolbar, DataTable, PaginationFooter 등) */
  children: React.ReactNode
  /** flex 부모의 남은 공간을 채울지 여부 (목록 페이지에서 사용) */
  grow?: boolean
}

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, grow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden shadow-sm flex flex-col",
          "border border-slate-200 dark:border-slate-700",
          grow && "flex-1 min-h-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TableContainer.displayName = "TableContainer"

export { TableContainer }
