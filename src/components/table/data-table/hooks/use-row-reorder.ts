import * as React from "react"
import { arrayMove } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"

interface UseRowReorderOptions<T> {
  data: T[]
  onRowReorder?: (newData: T[]) => void
}

/**
 * 로우 순서 변경 hook
 * - row- 접두사 ID로 식별
 * - arrayMove로 순서 변경 후 콜백 호출
 */
export function useRowReorder<T extends { id: string | number }>({
  data,
  onRowReorder,
}: UseRowReorderOptions<T>) {
  const handleRowDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const activeId = String(active.id).replace(/^row-/, "")
      const overId = String(over.id).replace(/^row-/, "")

      const oldIndex = data.findIndex((row) => String(row.id) === activeId)
      const newIndex = data.findIndex((row) => String(row.id) === overId)

      if (oldIndex === -1 || newIndex === -1) return

      const newData = arrayMove(data, oldIndex, newIndex)
      onRowReorder?.(newData)
    },
    [data, onRowReorder],
  )

  return { handleRowDragEnd }
}
