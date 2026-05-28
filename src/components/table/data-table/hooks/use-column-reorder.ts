import * as React from "react"
import { arrayMove } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"

import type { DataTableColumn } from "../types"

interface UseColumnReorderOptions<T> {
  columns: DataTableColumn<T>[]
  columnReorderable: boolean
  columnOrder?: (keyof T)[]
  onColumnReorder?: (newOrder: (keyof T)[]) => void
}

/**
 * 컬럼 순서 변경 hook
 * - 드래그 앤 드롭으로 컬럼 순서 변경
 * - 제어/비제어 컴포넌트 모두 지원
 */
export function useColumnReorder<T>({
  columns,
  columnReorderable,
  columnOrder,
  onColumnReorder,
}: UseColumnReorderOptions<T>) {
  const [internalColumnOrder, setInternalColumnOrder] = React.useState<(keyof T)[]>(
    () => columns.map((col) => col.accessorKey),
  )

  React.useEffect(() => {
    if (!columnReorderable || columnOrder) return

    setInternalColumnOrder((prev) => {
      const columnKeys = columns.map((col) => col.accessorKey)
      const next = prev.filter((key) => columnKeys.includes(key))
      const missing = columnKeys.filter((key) => !next.includes(key))
      const updated = [...next, ...missing]

      if (
        updated.length === prev.length &&
        updated.every((key, index) => key === prev[index])
      ) {
        return prev
      }

      return updated
    })
  }, [columns, columnReorderable, columnOrder])

  const currentColumnOrder = columnOrder ?? internalColumnOrder

  const orderedColumns = React.useMemo(() => {
    if (!columnReorderable) return columns
    return currentColumnOrder
      .map((key) => columns.find((col) => col.accessorKey === key))
      .filter((col): col is DataTableColumn<T> => col !== undefined)
  }, [columns, currentColumnOrder, columnReorderable])

  const handleColumnDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = currentColumnOrder.findIndex((key) => String(key) === active.id)
      const newIndex = currentColumnOrder.findIndex((key) => String(key) === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = arrayMove(currentColumnOrder, oldIndex, newIndex)

      if (onColumnReorder) {
        onColumnReorder(newOrder)
      } else {
        setInternalColumnOrder(newOrder)
      }
    },
    [currentColumnOrder, onColumnReorder],
  )

  return { orderedColumns, currentColumnOrder, handleColumnDragEnd }
}
