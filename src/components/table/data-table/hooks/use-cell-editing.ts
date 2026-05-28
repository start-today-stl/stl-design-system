import * as React from "react"

import type { DataTableColumn, EditingCell } from "../types"

interface UseCellEditingOptions<T extends { id: string | number }> {
  columns: DataTableColumn<T>[]
  data: T[]
  onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
}

/**
 * 셀 편집 hook
 * - 편집 시작/완료/취소 처리
 * - 외부 클릭 시 자동 저장 (Radix 포털 셀렉트 내부 클릭은 제외)
 * - stale closure 방지를 위한 ref 관리
 */
export function useCellEditing<T extends { id: string | number }>({
  columns,
  data,
  onCellChange,
}: UseCellEditingOptions<T>) {
  const [editingCell, setEditingCell] = React.useState<EditingCell<T> | null>(null)
  const [editValue, setEditValue] = React.useState<T[keyof T] | null>(null)
  // stale closure 방지용 ref
  const editValueRef = React.useRef<T[keyof T] | null>(null)
  // 바깥 클릭 감지용 ref
  const editingCellRef = React.useRef<HTMLTableCellElement>(null)

  const startEditing = React.useCallback(
    (rowId: string | number, columnKey: keyof T, currentValue: T[keyof T]) => {
      setEditingCell({ rowId, columnKey })
      setEditValue(currentValue)
      editValueRef.current = currentValue
    },
    [],
  )

  const completeEditing = React.useCallback(
    (column: DataTableColumn<T>, row: T) => {
      const currentValue = editValueRef.current
      if (!editingCell || currentValue === null) {
        setEditingCell(null)
        setEditValue(null)
        editValueRef.current = null
        return
      }

      if (column.validate) {
        const result = column.validate(currentValue, row)
        if (result !== true) {
          setEditingCell({ ...editingCell, error: result })
          return
        }
      }

      if (onCellChange) {
        onCellChange(editingCell.rowId, editingCell.columnKey, currentValue)
      }
      setEditingCell(null)
      setEditValue(null)
      editValueRef.current = null
    },
    [editingCell, onCellChange],
  )

  const completeEditingFromState = React.useCallback(() => {
    if (!editingCell) return
    const column = columns.find((col) => col.accessorKey === editingCell.columnKey)
    const row = data.find((r) => r.id === editingCell.rowId)
    if (column && row) {
      completeEditing(column, row)
    } else {
      const currentValue = editValueRef.current
      if (currentValue !== null && onCellChange) {
        onCellChange(editingCell.rowId, editingCell.columnKey, currentValue)
      }
      setEditingCell(null)
      setEditValue(null)
      editValueRef.current = null
    }
  }, [editingCell, columns, data, onCellChange, completeEditing])

  const cancelEditing = React.useCallback(() => {
    setEditingCell(null)
    setEditValue(null)
    editValueRef.current = null
  }, [])

  // 외부 클릭 시 저장
  React.useEffect(() => {
    if (!editingCell) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (editingCellRef.current?.contains(target)) return
      // Radix 포털(Select 드롭다운) 내부 클릭은 무시
      const radixPortal = (target as Element).closest?.("[data-radix-popper-content-wrapper]")
      if (radixPortal) return
      completeEditingFromState()
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [editingCell, completeEditingFromState])

  return {
    editingCell,
    editValue,
    editValueRef,
    editingCellRef,
    setEditingCell,
    setEditValue,
    startEditing,
    completeEditing,
    cancelEditing,
  }
}
