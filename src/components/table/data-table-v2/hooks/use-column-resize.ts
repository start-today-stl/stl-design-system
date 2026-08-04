import * as React from "react"

import type { DataTableV2Column } from "../types"

interface UseColumnResizeOptions<T> {
  resizable: boolean
  columnWidths?: Record<string, number>
  onColumnResize?: (columnKey: keyof T, width: number) => void
}

const MIN_WIDTH = 50

/**
 * 컬럼 리사이즈 hook — **독립 리사이즈 방식** (AG Grid 기본 모드 동일).
 *
 * 동작:
 * - 헤더 우측 handle 을 드래그해 폭 조절
 * - 리사이즈된 컬럼 **자기 자신만** 폭 변경. 다른 컬럼은 현재 폭 유지.
 * - 결과:
 *   - shrink → 총폭 감소 → 우측 여백 확장 (또는 스크롤 축소)
 *   - grow → 총폭 증가 → 가로 스크롤 확장 (또는 여백 축소)
 * - flex 컬럼(fixed width 없음)이 최초 리사이즈 순간 현재 offsetWidth 로 스냅샷되어 fixed 전환됨.
 *   → 다른 flex 컬럼의 자동 재분배 (grow/shrink) 방지.
 *
 * MIN_WIDTH:
 * - 각 컬럼의 `col.minWidth` 를 존중. 없으면 하드코딩 50px fallback.
 *
 * 스냅샷:
 * - 최초 리사이즈 시 헤더 행에서 `[data-column-key]` 셀들의 offsetWidth 를 읽어
 *   internalWidths 에 저장. 이미 저장된 값은 덮어쓰지 않음.
 * - controlled 모드 (`columnWidths` + `onColumnResize`) 는 부모가 관리하므로 스냅샷 생략.
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
  const minWidthRef = React.useRef(MIN_WIDTH)

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
      // 실제 렌더된 헤더 셀 폭 측정 — flex 컬럼(fixed width 없음)은 남은 공간 기준으로 그려지므로
      // config 상 width 만으로 계산하면 실제 폭과 크게 어긋나 리사이즈 시 확 줄어드는 버그 발생.
      const targetCell = (e.currentTarget as HTMLElement).parentElement
      const headerRow = targetCell?.parentElement

      setResizingKey(column.accessorKey)
      startX.current = e.clientX
      startWidth.current = targetCell?.offsetWidth ?? getColumnWidth(column) ?? 150
      minWidthRef.current = Math.max(
        MIN_WIDTH,
        typeof column.minWidth === "number" ? column.minWidth : 0
      )

      // 스냅샷: 다른 flex 컬럼들이 자동 재분배 되는 것 방지.
      // 이미 internalWidths 에 값이 있는 컬럼은 그대로 유지 (사용자 리사이즈 값 보존).
      if (!onColumnResize && headerRow) {
        const snapshot: Record<string, number> = {}
        const dataCells = headerRow.querySelectorAll<HTMLElement>("[data-column-key]")
        dataCells.forEach((cell) => {
          const key = cell.getAttribute("data-column-key")
          if (key) snapshot[key] = cell.offsetWidth
        })
        setInternalWidths((prev) => ({ ...snapshot, ...prev }))
      }
    },
    [getColumnWidth, onColumnResize]
  )

  const handleResizeMove = React.useCallback(
    (e: MouseEvent) => {
      if (!resizingKey) return
      const delta = e.clientX - startX.current
      let newWidth = startWidth.current + delta
      if (newWidth < minWidthRef.current) newWidth = minWidthRef.current

      const key = String(resizingKey)
      if (onColumnResize) {
        onColumnResize(resizingKey, newWidth)
      } else {
        setInternalWidths((prev) => ({ ...prev, [key]: newWidth }))
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
