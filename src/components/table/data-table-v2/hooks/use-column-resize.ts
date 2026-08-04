import * as React from "react"

import type { DataTableV2Column } from "../types"

interface UseColumnResizeOptions<T> {
  resizable: boolean
  columnWidths?: Record<string, number>
  onColumnResize?: (columnKey: keyof T, width: number) => void
}

/**
 * 컬럼 리사이즈 hook.
 * - 헤더 우측 handle 을 마우스 드래그해 폭 조절
 * - controlled (columnWidths 전달) 또는 내부 상태로 관리
 * - 최소 폭 50px
 */
export function useColumnResize<T>({
  resizable,
  columnWidths,
  onColumnResize,
}: UseColumnResizeOptions<T>) {
  const [internalWidths, setInternalWidths] = React.useState<Record<string, number>>({})
  const [resizingKey, setResizingKey] = React.useState<keyof T | null>(null)
  const startX = React.useRef(0)
  const startWidth = React.useRef(0)

  const getColumnWidth = React.useCallback(
    (column: DataTableV2Column<T>): number | undefined => {
      const key = String(column.accessorKey)
      if (columnWidths && key in columnWidths) return columnWidths[key]
      if (key in internalWidths) return internalWidths[key]
      if (typeof column.width === "number") return column.width
      return undefined
    },
    [columnWidths, internalWidths]
  )

  const handleResizeStart = React.useCallback(
    (e: React.MouseEvent, column: DataTableV2Column<T>) => {
      e.preventDefault()
      e.stopPropagation()
      setResizingKey(column.accessorKey)
      startX.current = e.clientX
      // 실제 렌더된 헤더 셀 폭 측정 — flex 컬럼(fixed width 없음)은 남은 공간 기준으로 그려지므로
      // config 상 width 만으로 계산하면 실제 폭과 크게 어긋나 리사이즈 시 확 줄어드는 버그 발생.
      // e.currentTarget = separator 컨테이너. parentElement = 헤더 셀 outer div.
      const headerCell = (e.currentTarget as HTMLElement).parentElement
      const measured = headerCell?.offsetWidth
      startWidth.current = measured ?? getColumnWidth(column) ?? 150
    },
    [getColumnWidth]
  )

  const handleResizeMove = React.useCallback(
    (e: MouseEvent) => {
      if (!resizingKey) return
      const delta = e.clientX - startX.current
      const nextWidth = Math.max(50, startWidth.current + delta)
      const key = String(resizingKey)
      if (onColumnResize) {
        onColumnResize(resizingKey, nextWidth)
      } else {
        setInternalWidths((prev) => ({ ...prev, [key]: nextWidth }))
      }
    },
    [resizingKey, onColumnResize]
  )

  const handleResizeEnd = React.useCallback(() => setResizingKey(null), [])

  React.useEffect(() => {
    if (!resizingKey) return
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
  }, [resizingKey, handleResizeMove, handleResizeEnd])

  return {
    resizingKey,
    getColumnWidth: resizable ? getColumnWidth : () => undefined,
    handleResizeStart,
  }
}
