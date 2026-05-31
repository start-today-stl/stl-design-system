import * as React from "react"

import { cn } from "@/lib/utils"
import {
  CHECKBOX_WIDTH,
  DRAG_HANDLE_WIDTH,
  EXPAND_WIDTH,
  type DataTableColumn,
  type StickyStyleResult,
} from "../types"

interface UseStickyStylesOptions<T> {
  columns: DataTableColumn<T>[]
  selectable: boolean
  expandable: unknown
  rowReorderable: boolean
}

/**
 * sticky 컬럼 스타일 계산 hook
 * - 왼쪽/오른쪽 고정 컬럼의 left/right 위치 계산
 * - 헤더/바디 셀 모두에 동일한 스타일 함수 제공
 */
export function useStickyStyles<T>({
  columns,
  selectable,
  expandable,
  rowReorderable,
}: UseStickyStylesOptions<T>) {
  const hasLeftStickyColumns = React.useMemo(
    () => columns.some((col) => col.sticky === "left"),
    [columns],
  )

  const getStickyStyles = React.useMemo(() => {
    // 컬럼 너비 추출 헬퍼 (width 우선, 없으면 minWidth)
    const getColWidth = (col: DataTableColumn<T>): number => {
      const w = col.width ?? col.minWidth
      if (typeof w === "number") return w
      const parsed = parseInt(String(w), 10)
      return Number.isFinite(parsed) ? parsed : 150
    }

    const leftColumns = columns.filter((col) => col.sticky === "left")
    const rightColumns = columns.filter((col) => col.sticky === "right")

    // 왼쪽 고정 컬럼 위치 계산 (드래그 핸들, 체크박스, 확장 아이콘 컬럼 고려)
    const dragHandleWidth = rowReorderable ? DRAG_HANDLE_WIDTH : 0
    const checkboxWidth = selectable ? CHECKBOX_WIDTH : 0
    const expandWidth = expandable ? EXPAND_WIDTH : 0
    const baseLeftOffset = dragHandleWidth + checkboxWidth + expandWidth

    const leftPositions = new Map<keyof T, number>()
    let currentLeft = baseLeftOffset
    for (const col of leftColumns) {
      leftPositions.set(col.accessorKey, currentLeft)
      currentLeft += getColWidth(col)
    }

    // 오른쪽 고정 컬럼 위치 계산 (역순)
    const rightPositions = new Map<keyof T, number>()
    let currentRight = 0
    for (let i = rightColumns.length - 1; i >= 0; i--) {
      const col = rightColumns[i]
      rightPositions.set(col.accessorKey, currentRight)
      currentRight += getColWidth(col)
    }

    return (
      column: DataTableColumn<T>,
      isHeader: boolean,
      isSelected?: boolean,
      groupCellSelected?: boolean,
    ): StickyStyleResult => {
      if (!column.sticky) return { style: {}, className: "" }

      const colWidth = getColWidth(column)
      const widthPx = `${colWidth}px`

      const baseStyles: React.CSSProperties = {
        position: "sticky",
        zIndex: isHeader ? 20 : 10,
        width: widthPx,
        minWidth: widthPx,
        maxWidth: widthPx,
      }

      const effectiveSelected = groupCellSelected ?? isSelected

      // sticky 셀 행 구분선 — 대비 부족한 default border-slate-200 → 진한 색.
      // (sticky + 가상화 동시 사용 시 sub-pixel 깜빡임 이슈는 가상화 측에서 비호환 처리됨)
      const stickyBorderClass = "!border-b !border-slate-300 dark:!border-slate-600"

      if (column.sticky === "left") {
        const leftPos = leftPositions.get(column.accessorKey) ?? 0
        return {
          style: { ...baseStyles, left: `${leftPos}px` },
          className: cn(
            "transition-colors",
            stickyBorderClass,
            isHeader
              ? "bg-slate-100 dark:bg-slate-800"
              : effectiveSelected
                ? "bg-blue-50 dark:bg-blue-900"
                : "bg-slate-100 dark:bg-slate-800",
          ),
        }
      }

      const rightPos = rightPositions.get(column.accessorKey) ?? 0
      return {
        style: { ...baseStyles, right: `${rightPos}px` },
        className: cn(
          "transition-colors",
          stickyBorderClass,
          isHeader
            ? "bg-slate-100 dark:bg-slate-800"
            : effectiveSelected
              ? "bg-blue-50 dark:bg-blue-900"
              : "bg-slate-100 dark:bg-slate-800",
        ),
      }
    }
  }, [columns, selectable, expandable, rowReorderable])

  return { getStickyStyles, hasLeftStickyColumns }
}
