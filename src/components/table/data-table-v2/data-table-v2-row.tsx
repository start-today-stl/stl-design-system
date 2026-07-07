import * as React from "react"

import { cn } from "@/lib/utils"
import type { DataTableV2Column } from "./types"

interface DataTableV2RowProps<T extends { id: string | number }> {
  row: T
  columns: DataTableV2Column<T>[]
  leftOffsets: number[]
  rightOffsets: number[]
  lastLeftPinnedIdx: number
  firstRightPinnedIdx: number
  showLeftShadow: boolean
  showRightShadow: boolean
  totalWidth: number
  translateY: number
  isHovered: boolean
  onHover: (id: T["id"] | null) => void
  onHeightChange: (id: T["id"], height: number) => void
}

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
}

function DataTableV2RowInner<T extends { id: string | number }>({
  row,
  columns,
  leftOffsets,
  rightOffsets,
  lastLeftPinnedIdx,
  firstRightPinnedIdx,
  showLeftShadow,
  showRightShadow,
  totalWidth,
  translateY,
  isHovered,
  onHover,
  onHeightChange,
}: DataTableV2RowProps<T>) {
  const rowRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const report = () => onHeightChange(row.id, el.offsetHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.id])

  const bgClass = isHovered
    ? "bg-slate-100 dark:bg-slate-800"
    : "bg-white dark:bg-slate-900"

  return (
    <div
      ref={rowRef}
      role="row"
      className={cn("absolute left-0 top-0 right-0 flex transition-colors", bgClass)}
      style={{
        minWidth: totalWidth,
        transform: `translate3d(0, ${Math.round(translateY)}px, 0)`,
      }}
      onMouseEnter={() => onHover(row.id)}
      onMouseLeave={() => onHover(null)}
    >
      {columns.map((col, i) => {
        const colId = col.id ?? String(col.accessorKey)
        const value = row[col.accessorKey]
        const rendered = col.cell ? col.cell(value, row) : (value as React.ReactNode)
        const width = typeof col.width === "number" ? col.width : undefined
        const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
        const isLeft = col.pinned === "left"
        const isRight = col.pinned === "right"
        const isPinned = isLeft || isRight
        const isLeftBoundary = i === lastLeftPinnedIdx && showLeftShadow
        const isRightBoundary = i === firstRightPinnedIdx && showRightShadow
        const isFirstRightPinned = i === firstRightPinnedIdx
        // Outer cell: 순수 레이아웃/포지셔닝. 텍스트/패딩은 content container.
        const outerCls = cn(
          "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
          width !== undefined && "shrink-0",
          isPinned && "sticky z-10 transition-colors",
          isPinned && bgClass,
          isFirstRightPinned && "ml-auto",
          isLeftBoundary && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          isRightBoundary && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        )
        // Content container: 확장 슬롯. 미래에 checkbox / edit UI / 액션 아이콘 등 여기 추가.
        const contentCls = cn(
          "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
          alignClass[col.align ?? "left"]
        )
        return (
          <div
            key={colId}
            role="gridcell"
            className={outerCls}
            style={{
              width,
              minWidth,
              flex: width === undefined ? "1 1 0" : undefined,
              left: isLeft ? leftOffsets[i] : undefined,
              right: isRight ? rightOffsets[i] : undefined,
            }}
          >
            <div className={contentCls}>{rendered}</div>
          </div>
        )
      })}
    </div>
  )
}

export const DataTableV2Row = React.memo(DataTableV2RowInner) as typeof DataTableV2RowInner
