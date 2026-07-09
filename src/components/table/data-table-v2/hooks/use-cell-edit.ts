import * as React from "react"

import type { DataTableV2Column } from "../types"

interface UseCellEditOptions<T extends { id: string | number }> {
  onCellChange?: (
    rowId: T["id"],
    columnKey: keyof T,
    value: T[keyof T]
  ) => void
}

/**
 * 셀 편집 상태 hook.
 * - 하나의 셀만 편집 상태 유지 (rowId + columnKey)
 * - 편집 중 임시 값 (editValue) 관리
 * - onComplete: validate 통과 시 onCellChange 호출 + 편집 종료. 실패 시 에러 유지.
 * - onCancel: 편집 종료 (값 저장 안 함)
 */
export function useCellEdit<T extends { id: string | number }>({
  onCellChange,
}: UseCellEditOptions<T>) {
  const [editing, setEditing] = React.useState<{
    rowId: T["id"]
    columnKey: keyof T
    editValue: T[keyof T]
    error?: string
  } | null>(null)

  const startEdit = React.useCallback(
    (row: T, col: DataTableV2Column<T>) => {
      if (!col.editable) return
      setEditing({
        rowId: row.id,
        columnKey: col.accessorKey,
        editValue: row[col.accessorKey],
      })
    },
    []
  )

  const changeEditValue = React.useCallback((value: T[keyof T]) => {
    setEditing((prev) => (prev ? { ...prev, editValue: value, error: undefined } : prev))
  }, [])

  const completeEdit = React.useCallback(
    (col: DataTableV2Column<T>, row: T) => {
      setEditing((prev) => {
        if (!prev) return prev
        // 값 변경 없으면 그냥 종료
        if (prev.editValue === row[col.accessorKey]) return null
        // 검증
        if (col.validate) {
          const result = col.validate(prev.editValue, row)
          if (result !== true) {
            return { ...prev, error: result }
          }
        }
        onCellChange?.(row.id, col.accessorKey, prev.editValue)
        return null
      })
    },
    [onCellChange]
  )

  const cancelEdit = React.useCallback(() => setEditing(null), [])

  const isEditing = React.useCallback(
    (rowId: T["id"], columnKey: keyof T) =>
      !!editing && editing.rowId === rowId && editing.columnKey === columnKey,
    [editing]
  )

  const getEditingState = (
    rowId: T["id"],
    columnKey: keyof T
  ): { editValue: T[keyof T]; error?: string } | null => {
    if (!editing || editing.rowId !== rowId || editing.columnKey !== columnKey) {
      return null
    }
    return { editValue: editing.editValue, error: editing.error }
  }

  return {
    editing,
    isEditing,
    getEditingState,
    startEdit,
    changeEditValue,
    completeEdit,
    cancelEdit,
  }
}
