import * as React from "react"

import { cn } from "@/lib/utils"

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 요소 (TableToolbar, DataTable, PaginationFooter 등) */
  children: React.ReactNode
}

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden shadow-sm",
          "border border-slate-200 dark:border-slate-700",
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
