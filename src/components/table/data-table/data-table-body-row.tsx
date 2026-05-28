import * as React from "react"

import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "@/components/table/table"
import { Checkbox } from "@/components/ui/checkbox"
import { RightIcon, DownIcon, WriteIcon, RowDeleteIcon } from "@/icons"

import { DefaultEditComponent } from "./default-edit-component"
import { DragHandleCell } from "./drag-handle-cell"
import { SortableRow } from "./sortable-row"
import {
  CHECKBOX_WIDTH,
  EXPAND_WIDTH,
  ROW_ACTIONS_WIDTH,
  type DataTableColumn,
  type DragHandleProps,
  type EditingCell,
  type RowActionsConfig,
  type RowGroupConfig,
  type StickyStyleResult,
} from "./types"

export interface DataTableBodyRowProps<T extends { id: string | number }> {
  /** 현재 행 데이터 */
  row: T
  /** 행 인덱스 */
  rowIndex: number
  /** 데이터 길이 (그룹 셀 마지막 행 판정용) */
  dataLength: number

  // === 행 상태 ===
  /** 이 행이 선택되었는지 */
  isSelected: boolean
  /** 이 행이 확장 가능한지 */
  canExpand: boolean
  /** 이 행이 확장되었는지 */
  isExpanded: boolean
  /** 이 행에서 편집 중인 셀 (null이면 편집 안 함) */
  editingCell: EditingCell<T> | null
  /** 편집 중인 값 */
  editValue: unknown
  /** 편집 값 ref (stale closure 방지) */
  editValueRef: React.MutableRefObject<unknown>
  /** 편집 중인 셀 ref (외부 클릭 감지용) */
  editingCellRef: React.RefObject<HTMLTableCellElement | null>

  // === 테이블 설정 ===
  columnsToRender: DataTableColumn<T>[]
  rowReorderable: boolean
  selectable: boolean
  expandable: boolean
  showRowDelete: boolean
  hasLeftStickyColumns: boolean
  resizable: boolean
  rowActions: RowActionsConfig<T> | undefined
  rowGrouping: RowGroupConfig<T> | undefined
  middleRowSet: Set<number> | null

  // === 헬퍼 함수 (모두 안정된 ref - useCallback/useMemo) ===
  getCheckboxHeaderLeftOffset: () => number
  getExpandHeaderLeftOffset: () => number
  getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined
  isGroupCellHovered: (rowIndex: number, rowSpan: number) => boolean
  isGroupCellSelected: (rowIndex: number, rowSpan: number) => boolean
  getStickyStyles: (
    column: DataTableColumn<T>,
    isHeader: boolean,
    isSelected?: boolean,
    groupCellSelected?: boolean,
  ) => StickyStyleResult
  getColumnWidth: (column: DataTableColumn<T>) => number | undefined
  getAlignClass: (align?: "left" | "center" | "right") => string

  // === 콜백 ===
  handleSelectRow: (id: string | number) => void
  toggleRowExpanded: (id: string | number) => void
  startEditing: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  completeEditing: (column: DataTableColumn<T>, row: T) => void
  cancelEditing: () => void
  setEditValue: (value: T[keyof T] | null) => void
  setEditingCell: (cell: EditingCell<T> | null) => void
  onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined
  onRowClick: ((row: T) => void) | undefined
  rowClassName: ((row: T) => string) | undefined
  setHoveredRowIndex: (index: number | null) => void
}

function DataTableBodyRowImpl<T extends { id: string | number }>(
  props: DataTableBodyRowProps<T>,
) {
  const {
    row,
    rowIndex,
    dataLength,
    isSelected,
    canExpand,
    isExpanded,
    editingCell,
    editValue,
    editValueRef,
    editingCellRef,
    columnsToRender,
    rowReorderable,
    selectable,
    expandable,
    showRowDelete,
    hasLeftStickyColumns,
    resizable,
    rowActions,
    rowGrouping,
    middleRowSet,
    getCheckboxHeaderLeftOffset,
    getExpandHeaderLeftOffset,
    getRowSpan,
    isGroupCellHovered,
    isGroupCellSelected,
    getStickyStyles,
    getColumnWidth,
    getAlignClass,
    handleSelectRow,
    toggleRowExpanded,
    startEditing,
    completeEditing,
    cancelEditing,
    setEditValue,
    setEditingCell,
    onCellChange,
    onRowClick,
    rowClassName,
    setHoveredRowIndex,
  } = props

  const isEditingCell = (rowId: string | number, columnKey: keyof T) =>
    editingCell?.rowId === rowId && editingCell?.columnKey === columnKey

  const renderRowCells = (dragHandleProps?: DragHandleProps) => (
    <>
      {rowReorderable && (
        <DragHandleCell
          isSelected={isSelected}
          hasLeftStickyColumns={hasLeftStickyColumns}
          dragHandleProps={dragHandleProps}
        />
      )}

      {selectable && (
        <TableCell
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "!p-0",
            hasLeftStickyColumns && (
              isSelected
                ? "transition-colors bg-blue-50 dark:bg-blue-900"
                : "transition-colors bg-slate-100 dark:bg-slate-800"
            )
          )}
          style={hasLeftStickyColumns ? {
            position: "sticky",
            left: getCheckboxHeaderLeftOffset(),
            zIndex: 10,
            width: `${CHECKBOX_WIDTH}px`,
            minWidth: `${CHECKBOX_WIDTH}px`,
            maxWidth: `${CHECKBOX_WIDTH}px`,
          } : {
            width: `${CHECKBOX_WIDTH}px`,
            minWidth: `${CHECKBOX_WIDTH}px`,
            maxWidth: `${CHECKBOX_WIDTH}px`,
          }}
        >
          <div className="flex items-center justify-center h-9">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => handleSelectRow(row.id)}
              aria-label={`행 ${row.id} 선택`}
            />
          </div>
        </TableCell>
      )}

      {expandable && (
        <TableCell
          className={cn(
            "p-0",
            hasLeftStickyColumns && (
              isSelected
                ? "transition-colors bg-blue-50 dark:bg-blue-900"
                : "transition-colors bg-slate-100 dark:bg-slate-800"
            )
          )}
          style={hasLeftStickyColumns ? {
            position: "sticky",
            left: getExpandHeaderLeftOffset(),
            zIndex: 10,
            width: `${EXPAND_WIDTH}px`,
            minWidth: `${EXPAND_WIDTH}px`,
            maxWidth: `${EXPAND_WIDTH}px`,
          } : {
            width: `${EXPAND_WIDTH}px`,
            minWidth: `${EXPAND_WIDTH}px`,
            maxWidth: `${EXPAND_WIDTH}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {canExpand && (
            <button
              type="button"
              onClick={() => toggleRowExpanded(row.id)}
              className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label={isExpanded ? "행 접기" : "행 펼치기"}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <DownIcon size={24} /> : <RightIcon size={24} />}
            </button>
          )}
        </TableCell>
      )}

      {showRowDelete && (
        <TableCell
          className="!p-0"
          style={{
            width: `${ROW_ACTIONS_WIDTH}px`,
            minWidth: `${ROW_ACTIONS_WIDTH}px`,
            maxWidth: `${ROW_ACTIONS_WIDTH}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => rowActions?.onRowDelete?.(row)}
            className="flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70"
            aria-label="행 삭제"
          >
            <RowDeleteIcon size={20} />
          </button>
        </TableCell>
      )}

      {columnsToRender.map((column) => {
        const rowSpan = getRowSpan(rowIndex, column.accessorKey)
        if (rowSpan === 0) return null

        const value = row[column.accessorKey]
        const cellIsEditing = isEditingCell(row.id, column.accessorKey)
        const hasRowSpan = rowSpan !== undefined && rowSpan > 1
        const groupCellHovered = hasRowSpan && isGroupCellHovered(rowIndex, rowSpan)
        const groupCellSelected = hasRowSpan && isGroupCellSelected(rowIndex, rowSpan)
        const stickyData = getStickyStyles(column, false, isSelected, hasRowSpan ? groupCellSelected : undefined)

        const toPx = (v: string | number) => (typeof v === "number" ? `${v}px` : v)
        const bodyCellStyle: React.CSSProperties = {}
        if (!column.sticky) {
          const resizedWidth = resizable ? getColumnWidth(column) : undefined
          if (resizedWidth !== undefined) {
            bodyCellStyle.width = `${resizedWidth}px`
            bodyCellStyle.minWidth = `${resizedWidth}px`
          } else {
            if (column.width) bodyCellStyle.width = toPx(column.width)
            if (column.minWidth) bodyCellStyle.minWidth = toPx(column.minWidth)
          }
        }
        const cellStyle = { ...bodyCellStyle, ...stickyData.style }

        if (cellIsEditing && column.editable) {
          const EditComponent = column.editComponent || DefaultEditComponent

          return (
            <TableCell
              ref={editingCellRef as React.RefObject<HTMLTableCellElement>}
              key={String(column.accessorKey)}
              className={cn(getAlignClass(column.align), "p-1 overflow-hidden", stickyData.className)}
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
              key={String(column.accessorKey)}
              className={cn(
                getAlignClass(column.align),
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
                  startEditing(row.id, column.accessorKey, value)
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

        const isGroupSpanToEnd = hasRowSpan && rowIndex + rowSpan >= dataLength

        return (
          <TableCell
            key={String(column.accessorKey)}
            className={cn(
              getAlignClass(column.align),
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
      })}
    </>
  )

  if (rowReorderable) {
    return (
      <SortableRow
        id={`row-${row.id}`}
        isSelected={isSelected}
        className={cn(onRowClick && "cursor-pointer", rowClassName?.(row))}
        onClick={() => onRowClick?.(row)}
        onMouseEnter={rowGrouping ? () => setHoveredRowIndex(rowIndex) : undefined}
        onMouseLeave={rowGrouping ? () => setHoveredRowIndex(null) : undefined}
      >
        {(dragHandleProps) => renderRowCells(dragHandleProps)}
      </SortableRow>
    )
  }

  return (
    <TableRow
      data-state={isSelected ? "selected" : undefined}
      className={cn(
        onRowClick && "cursor-pointer",
        middleRowSet?.has(rowIndex) && "border-b-0",
        rowClassName?.(row),
      )}
      onClick={() => onRowClick?.(row)}
      onMouseEnter={rowGrouping ? () => setHoveredRowIndex(rowIndex) : undefined}
      onMouseLeave={rowGrouping ? () => setHoveredRowIndex(null) : undefined}
    >
      {renderRowCells()}
    </TableRow>
  )
}

/**
 * 데이터 행 컴포넌트 (React.memo로 메모이제이션됨)
 *
 * 행 데이터(row), 선택/확장 상태, 편집 상태 등이 변경되지 않으면
 * 다른 행이나 테이블 전체가 re-render되어도 이 행은 스킵됩니다.
 *
 * 효과적인 메모이제이션을 위해 다음 조건 필요:
 * - row 객체 reference 안정 (불변 업데이트)
 * - 콜백 함수들 안정 (parent useCallback)
 * - 헬퍼 함수들 안정 (useCallback/useMemo)
 */
export const DataTableBodyRow = React.memo(DataTableBodyRowImpl) as <
  T extends { id: string | number },
>(
  props: DataTableBodyRowProps<T>,
) => React.ReactElement
