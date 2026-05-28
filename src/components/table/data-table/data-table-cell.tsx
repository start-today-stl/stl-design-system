import * as React from "react"

import { cn } from "@/lib/utils"
import { TableCell } from "@/components/table/table"
import { WriteIcon } from "@/icons"

import { DefaultEditComponent } from "./default-edit-component"
import type {
  DataTableColumn,
  EditingCell,
  StickyStyleResult,
} from "./types"

export interface DataTableCellProps<T extends { id: string | number }> {
  row: T
  rowIndex: number
  column: DataTableColumn<T>
  value: T[keyof T]
  isSelected: boolean
  /** rowSpan (병합 시) */
  rowSpan: number | undefined
  /** rowSpan > 1 여부 */
  hasRowSpan: boolean
  /** 그룹 셀 hover (rowSpan 있을 때만 의미) */
  groupCellHovered: boolean
  /** 그룹 셀 selected (rowSpan 있을 때만 의미) */
  groupCellSelected: boolean
  /** 이 셀이 현재 편집 중인지 */
  isEditing: boolean
  /** 편집 시작 핸들러 */
  onStartEdit: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  /** 편집 중일 때 값 */
  editValue: T[keyof T] | null
  editingCell: EditingCell<T> | null
  setEditValue: (value: T[keyof T] | null) => void
  setEditingCell: (cell: EditingCell<T> | null) => void
  editValueRef: React.MutableRefObject<unknown>
  editingCellRef: React.RefObject<HTMLTableCellElement | null>
  completeEditing: (column: DataTableColumn<T>, row: T) => void
  cancelEditing: () => void
  onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined
  /** sticky 스타일 결과 */
  stickyData: StickyStyleResult
  /** 셀 스타일 (sticky + body width) */
  cellStyle: React.CSSProperties
  /** align 클래스 */
  alignClass: string
  /** 그룹 셀이 테이블 마지막 행까지 걸쳐있는지 */
  isGroupSpanToEnd: boolean
}

function DataTableCellImpl<T extends { id: string | number }>(
  props: DataTableCellProps<T>,
) {
  const {
    row,
    column,
    value,
    rowSpan,
    hasRowSpan,
    groupCellHovered,
    groupCellSelected,
    isEditing,
    onStartEdit,
    editValue,
    editingCell,
    setEditValue,
    setEditingCell,
    editValueRef,
    editingCellRef,
    completeEditing,
    cancelEditing,
    onCellChange,
    stickyData,
    cellStyle,
    alignClass,
    isGroupSpanToEnd,
  } = props

  if (isEditing && column.editable) {
    const EditComponent = column.editComponent || DefaultEditComponent

    return (
      <TableCell
        ref={editingCellRef as React.RefObject<HTMLTableCellElement>}
        className={cn(alignClass, "p-1 overflow-hidden", stickyData.className)}
        style={cellStyle}
        onClick={(e) => e.stopPropagation()}
        rowSpan={hasRowSpan ? rowSpan : undefined}
      >
        <EditComponent
          value={editValue as T[keyof T]}
          onChange={(newValue) => {
            setEditValue(newValue)
            editValueRef.current = newValue
            if (editingCell?.error) {
              setEditingCell({ ...editingCell, error: undefined })
            }
          }}
          onComplete={() => completeEditing(column, row)}
          onCancel={cancelEditing}
          row={row}
          error={editingCell?.error}
        />
      </TableCell>
    )
  }

  const content = column.cell ? column.cell(value, row) : String(value ?? "")

  if (column.editable && onCellChange) {
    return (
      <TableCell
        className={cn(
          alignClass,
          "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
          hasRowSpan && "align-middle transition-colors",
          hasRowSpan && groupCellSelected && "bg-blue-50 dark:bg-blue-900",
          hasRowSpan && !groupCellSelected && groupCellHovered && "bg-slate-100 dark:bg-slate-800",
          stickyData.className,
        )}
        style={cellStyle}
        onClick={(e) => {
          e.stopPropagation()
          setTimeout(() => {
            onStartEdit(row.id, column.accessorKey, value)
          }, 0)
        }}
        rowSpan={hasRowSpan ? rowSpan : undefined}
      >
        <span className="flex items-center gap-1">
          <span className="flex-1">{content}</span>
          <WriteIcon
            size={20}
            className="flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
          />
        </span>
      </TableCell>
    )
  }

  return (
    <TableCell
      className={cn(
        alignClass,
        "overflow-hidden break-all [overflow-wrap:break-word]",
        hasRowSpan && "align-middle transition-colors",
        hasRowSpan && !isGroupSpanToEnd && "border-b border-slate-200 dark:border-slate-700",
        hasRowSpan && groupCellSelected && "bg-blue-50 dark:bg-blue-900",
        hasRowSpan && !groupCellSelected && groupCellHovered && "bg-slate-100 dark:bg-slate-800",
        stickyData.className,
      )}
      style={cellStyle}
      rowSpan={hasRowSpan ? rowSpan : undefined}
    >
      {content}
    </TableCell>
  )
}

/**
 * 셀 컴포넌트 (React.memo)
 *
 * 행 컴포넌트 안에서 각 셀이 독립적으로 메모이즈됨.
 * 동일한 row 안에서도 변경된 셀만 re-render되도록 함.
 */
export const DataTableCell = React.memo(DataTableCellImpl) as <
  T extends { id: string | number },
>(
  props: DataTableCellProps<T>,
) => React.ReactElement
