import * as React from "react"

import type { DataTableColumn, EditingCell } from "../types"

interface UseCellEditingOptions<T extends { id: string | number }> {
  columns: DataTableColumn<T>[]
  data: T[]
  onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
}

// editingCell / onCellChange / columns / data 가 dep 인 useCallback 은
// 어느 하나라도 매 render 마다 새 ref 가 되면 callback 자체도 매번 새 ref 가 되어
// row ctx 안정성을 깬다 (= 모든 행 리렌더).
// 모두 ref 로 흡수해 useCallback deps 를 비운다.

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

  // ref 로 흡수 — render 중 동기 업데이트 (useEffect 면 stale 위험)
  const editingCellStateRef = React.useRef(editingCell)
  editingCellStateRef.current = editingCell
  const columnsRef = React.useRef(columns)
  columnsRef.current = columns
  const dataRef = React.useRef(data)
  dataRef.current = data
  const onCellChangeRef = React.useRef(onCellChange)
  onCellChangeRef.current = onCellChange

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
      const currentEditing = editingCellStateRef.current
      const currentValue = editValueRef.current
      if (!currentEditing || currentValue === null) {
        setEditingCell(null)
        setEditValue(null)
        editValueRef.current = null
        return
      }

      if (column.validate) {
        const result = column.validate(currentValue, row)
        if (result !== true) {
          setEditingCell({ ...currentEditing, error: result })
          return
        }
      }

      onCellChangeRef.current?.(currentEditing.rowId, currentEditing.columnKey, currentValue)
      setEditingCell(null)
      setEditValue(null)
      editValueRef.current = null
    },
    [],
  )

  const completeEditingFromState = React.useCallback(() => {
    const currentEditing = editingCellStateRef.current
    if (!currentEditing) return
    const column = columnsRef.current.find((col) => col.accessorKey === currentEditing.columnKey)
    const row = dataRef.current.find((r) => r.id === currentEditing.rowId)
    if (column && row) {
      completeEditing(column, row)
    } else {
      const currentValue = editValueRef.current
      if (currentValue !== null) {
        onCellChangeRef.current?.(currentEditing.rowId, currentEditing.columnKey, currentValue)
      }
      setEditingCell(null)
      setEditValue(null)
      editValueRef.current = null
    }
  }, [completeEditing])

  const cancelEditing = React.useCallback(() => {
    setEditingCell(null)
    setEditValue(null)
    editValueRef.current = null
  }, [])

  // 외부 클릭 시 저장 — editingCell 이 있을 때만 리스너 부착
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
