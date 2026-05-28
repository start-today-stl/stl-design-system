import * as React from "react"

import type { DataTableColumn } from "../types"

interface UseColumnResizeOptions<T> {
  resizable: boolean
  columnWidths?: Record<string, number>
  onColumnResize?: (columnKey: keyof T, width: number) => void
}

/**
 * 컬럼 리사이즈 hook
 * - 마우스 드래그로 컬럼 너비 조정
 * - 제어/비제어 컴포넌트 모두 지원
 * - 리사이징 중 전역 마우스 이벤트 처리
 */
export function useColumnResize<T>({
  resizable,
  columnWidths,
  onColumnResize,
}: UseColumnResizeOptions<T>) {
  const [internalColumnWidths, setInternalColumnWidths] = React.useState<
    Record<string, number>
  >({})
  const [resizingColumn, setResizingColumn] = React.useState<keyof T | null>(null)
  const resizeStartX = React.useRef<number>(0)
  const resizeStartWidth = React.useRef<number>(0)

  const getColumnWidth = React.useCallback(
    (column: DataTableColumn<T>): number | undefined => {
      const key = String(column.accessorKey)
      if (columnWidths && key in columnWidths) {
        return columnWidths[key]
      }
      if (key in internalColumnWidths) {
        return internalColumnWidths[key]
      }
      if (column.width) {
        return typeof column.width === "number"
          ? column.width
          : parseInt(column.width, 10)
      }
      return undefined
    },
    [columnWidths, internalColumnWidths],
  )

  const handleResizeStart = React.useCallback(
    (e: React.MouseEvent, column: DataTableColumn<T>) => {
      e.preventDefault()
      e.stopPropagation()
      setResizingColumn(column.accessorKey)
      resizeStartX.current = e.clientX
      const currentWidth = getColumnWidth(column) ?? 150
      resizeStartWidth.current = currentWidth
    },
    [getColumnWidth],
  )

  const handleResizeMove = React.useCallback(
    (e: MouseEvent) => {
      if (!resizingColumn) return
      const delta = e.clientX - resizeStartX.current
      const newWidth = Math.max(50, resizeStartWidth.current + delta)
      const key = String(resizingColumn)

      if (onColumnResize) {
        onColumnResize(resizingColumn, newWidth)
      } else {
        setInternalColumnWidths((prev) => ({ ...prev, [key]: newWidth }))
      }
    },
    [resizingColumn, onColumnResize],
  )

  const handleResizeEnd = React.useCallback(() => {
    setResizingColumn(null)
  }, [])

  React.useEffect(() => {
    if (!resizingColumn) return

    document.addEventListener("mousemove", handleResizeMove)
    document.addEventListener("mouseup", handleResizeEnd)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    return () => {
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [resizingColumn, handleResizeMove, handleResizeEnd])

  return {
    resizingColumn,
    getColumnWidth: resizable ? getColumnWidth : () => undefined,
    handleResizeStart,
  }
}
