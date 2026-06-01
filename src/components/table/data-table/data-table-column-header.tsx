import * as React from "react"

import { cn } from "@/lib/utils"
import { TableHead, TableSortableHead, type SortDirection } from "@/components/table/table"

import { SortableHeaderCell } from "./sortable-header-cell"
import { getColumnKey, toPxString } from "./utils"
import type { DataTableColumn, StickyStyleResult } from "./types"

export interface DataTableColumnHeaderProps<T> {
  column: DataTableColumn<T>
  stickyData: StickyStyleResult
  alignClass: string
  needsRightBorder: boolean
  resizable: boolean
  /** 리사이즈로 적용된 너비 (column.sticky가 false일 때만 사용) */
  resizedWidth: number | undefined
  /** 현재 이 컬럼이 리사이즈 중인지 */
  isResizing: boolean
  onResizeStart: (e: React.MouseEvent, column: DataTableColumn<T>) => void
  /** 컬럼 reorder 가능 여부 (이 컬럼이 드래그 가능한지는 내부에서 sticky/sortable로 결정) */
  columnReorderable: boolean
  sortDirection: SortDirection
  sortPriority: number | undefined
  onSort: () => void
}

function DataTableColumnHeaderImpl<T>({
  column,
  stickyData,
  alignClass,
  needsRightBorder,
  resizable,
  resizedWidth,
  isResizing,
  onResizeStart,
  columnReorderable,
  sortDirection,
  sortPriority,
  onSort,
}: DataTableColumnHeaderProps<T>) {
  const baseStyle: React.CSSProperties = {}
  if (!column.sticky) {
    if (resizedWidth !== undefined) {
      baseStyle.width = `${resizedWidth}px`
      baseStyle.minWidth = `${resizedWidth}px`
    } else {
      if (column.width) baseStyle.width = toPxString(column.width)
      if (column.minWidth) baseStyle.minWidth = toPxString(column.minWidth)
    }
  }
  const style = { ...baseStyle, ...stickyData.style }

  const groupBorderClass =
    needsRightBorder && "border-r border-slate-200 dark:border-slate-700"

  const resizeHandle = resizable && (
    <div
      className={cn(
        "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
        isResizing && "opacity-100",
      )}
      style={{
        right: "-4px",
        background:
          "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)",
      }}
      onMouseDown={(e) => onResizeStart(e, column)}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    />
  )

  const className = cn(
    alignClass,
    stickyData.className,
    resizable && "relative overflow-visible",
    groupBorderClass,
  )

  // 드래그 가능 여부: 컬럼 reorder ON + sticky 아님 + sortable 아님
  const isDraggable = columnReorderable && !column.sticky && !column.sortable

  if (isDraggable) {
    return (
      <SortableHeaderCell id={getColumnKey(column)} style={style} className={className}>
        {column.header}
        {resizeHandle}
      </SortableHeaderCell>
    )
  }

  if (column.sortable) {
    return (
      <TableSortableHead
        sortDirection={sortDirection}
        sortPriority={sortPriority}
        onSort={onSort}
        style={style}
        className={className}
      >
        {column.header}
        {resizeHandle}
      </TableSortableHead>
    )
  }

  return (
    <TableHead style={style} className={className}>
      {column.header}
      {resizeHandle}
    </TableHead>
  )
}

/**
 * 컬럼 헤더 컴포넌트
 * - 일반 / sortable / draggable (컬럼 reorder) 3가지 분기
 * - 리사이즈 핸들 + 그룹 경계 구분선 처리
 */
export const DataTableColumnHeader = DataTableColumnHeaderImpl as <T>(
  props: DataTableColumnHeaderProps<T>,
) => React.ReactElement
