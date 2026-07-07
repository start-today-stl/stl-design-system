import * as React from "react"
import { arrayMove } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"

import type { DataTableV2Column } from "../types"

interface UseColumnReorderOptions<T> {
  columns: DataTableV2Column<T>[]
  columnReorderable: boolean
  columnOrder?: (keyof T)[]
  onColumnReorder?: (newOrder: (keyof T)[]) => void
}

/**
 * 컬럼 순서 변경 hook.
 * - 헤더 드래그(@dnd-kit)로 순서 변경
 * - controlled (columnOrder 전달) 또는 내부 상태로 관리
 * - columns 변경(추가/삭제)에도 내부 순서 자동 동기화
 */
export function useColumnReorder<T>({
  columns,
  columnReorderable,
  columnOrder,
  onColumnReorder,
}: UseColumnReorderOptions<T>) {
  const [internalOrder, setInternalOrder] = React.useState<(keyof T)[]>(() =>
    columns.map((c) => c.accessorKey)
  )

  React.useEffect(() => {
    if (!columnReorderable || columnOrder) return
    setInternalOrder((prev) => {
      const keys = columns.map((c) => c.accessorKey)
      const kept = prev.filter((k) => keys.includes(k))
      const added = keys.filter((k) => !kept.includes(k))
      const next = [...kept, ...added]
      if (
        next.length === prev.length &&
        next.every((k, i) => k === prev[i])
      ) {
        return prev
      }
      return next
    })
  }, [columns, columnReorderable, columnOrder])

  const currentOrder = columnOrder ?? internalOrder

  const orderedColumns = React.useMemo(() => {
    if (!columnReorderable) return columns
    return currentOrder
      .map((k) => columns.find((c) => c.accessorKey === k))
      .filter((c): c is DataTableV2Column<T> => c !== undefined)
  }, [columns, currentOrder, columnReorderable])

  const handleColumnDragEnd = React.useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e
      if (!over || active.id === over.id) return
      const oldIdx = currentOrder.findIndex((k) => String(k) === active.id)
      const newIdx = currentOrder.findIndex((k) => String(k) === over.id)
      if (oldIdx < 0 || newIdx < 0) return
      const next = arrayMove(currentOrder, oldIdx, newIdx)
      if (onColumnReorder) onColumnReorder(next)
      else setInternalOrder(next)
    },
    [currentOrder, onColumnReorder]
  )

  return { orderedColumns, currentOrder, handleColumnDragEnd }
}
