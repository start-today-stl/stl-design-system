import * as React from "react"

import { cn } from "@/lib/utils"
// 정렬 화살표 (굵은 삼각형)
const SortArrow = ({ direction, active }: { direction: "up" | "down"; active: boolean }) => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "transition-colors",
      active ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
      direction === "down" && "rotate-180"
    )}
  >
    <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
  </svg>
)

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** 테이블 최대 높이 (초과 시 세로 스크롤) */
  maxHeight?: number | string
  /** 스크롤 컨테이너(wrapper) ref */
  wrapperRef?: React.Ref<HTMLDivElement>
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, maxHeight, wrapperRef, ...props }, ref) => {
    const wrapperStyle: React.CSSProperties = maxHeight
      ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
      : {}

    return (
      <div
        ref={wrapperRef}
        className={cn("relative w-full overflow-x-auto overflow-y-auto flex-1 bg-white dark:bg-slate-900", className)}
        style={wrapperStyle}
      >
        <table
          ref={ref}
          className={cn("caption-bottom text-xs")}
          style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: "100%" }}
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
  <thead ref={ref} className={cn("sticky top-0 z-20 bg-slate-100 dark:bg-slate-800", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child_td]:border-0", className)}
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
      "group transition-colors bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
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
      "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300 [&:has([role=checkbox])]:pr-0",
      "bg-slate-100 dark:bg-slate-800",
      "border-b border-slate-200 dark:border-slate-700",
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
    className={cn("h-9 pl-3 pr-1.5 py-1.5 align-middle text-slate-900 dark:text-slate-200 [&:has([role=checkbox])]:pr-0 border-b border-slate-200 dark:border-slate-700", className)}
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
        "h-9 pl-3 pr-1.5 py-1.5 text-left align-middle font-medium text-slate-700 dark:text-slate-300",
        "bg-slate-100 dark:bg-slate-800 select-none",
        "border-b border-slate-200 dark:border-slate-700",
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
        <span className="flex flex-col gap-0.5">
          <SortArrow direction="up" active={sortDirection === "asc"} />
          <SortArrow direction="down" active={sortDirection === "desc"} />
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
