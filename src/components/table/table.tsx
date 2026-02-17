import * as React from "react"

import { cn } from "@/lib/utils"
import { UpIcon, DownIcon } from "@/icons"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** 테이블 최대 높이 (초과 시 세로 스크롤) */
  maxHeight?: number | string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, maxHeight, ...props }, ref) => {
    const wrapperStyle: React.CSSProperties = maxHeight
      ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
      : {}

    return (
      <div
        className={cn("relative w-full overflow-x-auto", maxHeight && "overflow-y-auto")}
        style={wrapperStyle}
      >
        <table
          ref={ref}
          className={cn("caption-bottom text-[length:var(--text-body-2)]", className)}
          style={{ borderSpacing: 0, minWidth: "100%" }}
          {...props}
        />
      </div>
    )
  }
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("sticky top-0 z-20 bg-[#eaedf1] dark:bg-slate-800 [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-700", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "group border-b border-slate-200 dark:border-slate-700 transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-950/30",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-[#eaedf1] dark:bg-slate-800",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("h-9 pl-3 pr-1.5 py-1.5 align-middle text-[#798698] dark:text-slate-300 [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export type SortDirection = "asc" | "desc" | null

export interface TableSortableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** 현재 정렬 방향 */
  sortDirection?: SortDirection
  /** 정렬 변경 핸들러 */
  onSort?: () => void
}

const TableSortableHead = React.forwardRef<
  HTMLTableCellElement,
  TableSortableHeadProps
>(({ className, sortDirection, onSort, children, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!onSort) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSort()
    }
  }

  return (
    <th
      ref={ref}
      className={cn(
        "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800 select-none",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : "none"
      }
      {...props}
    >
      <button
        type="button"
        className="flex w-full items-center gap-1 text-left cursor-pointer"
        onClick={onSort}
        onKeyDown={handleKeyDown}
      >
        {children}
        <span className="flex flex-col -space-y-1">
          <UpIcon
            size={14}
            className={cn(
              "transition-colors",
              sortDirection === "asc"
                ? "text-blue-500"
                : "text-slate-300 dark:text-slate-500"
            )}
          />
          <DownIcon
            size={14}
            className={cn(
              "transition-colors",
              sortDirection === "desc"
                ? "text-blue-500"
                : "text-slate-300 dark:text-slate-500"
            )}
          />
        </span>
      </button>
    </th>
  )
})
TableSortableHead.displayName = "TableSortableHead"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSortableHead,
}
