import * as React from "react"
import { arrayMove } from "@dnd-kit/sortable"
import type { DragEndEvent } from "@dnd-kit/core"

interface UseRowReorderOptions<T> {
  data: T[]
  onRowReorder?: (newData: T[]) => void
}

/**
 * 행 순서 변경 hook.
 * - `row-{id}` prefix 로 식별해서 컬럼 재정렬(id: accessorKey)과 구분
 * - arrayMove 로 순서 변경 후 콜백 호출
 * - onRowReorder 미지정 시 no-op (사용처에서 data 상태 관리 필요)
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
    [data, onRowReorder]
  )

  return { handleRowDragEnd }
}
