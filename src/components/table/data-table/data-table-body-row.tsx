import * as React from "react"

import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "@/components/table/table"
import { Checkbox } from "@/components/ui/checkbox"
import { RightIcon, DownIcon, RowDeleteIcon } from "@/icons"

import { DataTableCell } from "./data-table-cell"
import { DragHandleCell } from "./drag-handle-cell"
import { SortableRow } from "./sortable-row"
import type { GroupCellFlags } from "./hooks/use-row-grouping"
import {
  CHECKBOX_WIDTH,
  EXPAND_WIDTH,
  ROW_ACTIONS_WIDTH,
  type DataTableColumn,
  type DragHandleProps,
  type EditingCell,
  type RowGroupConfig,
  type StickyStyleResult,
} from "./types"

/**
 * 행 컴포넌트가 사용하는 테이블 레벨 컨텍스트.
 * useMemo로 한 번에 안정화하여 React.memo 비교 비용을 줄이고
 * 행 데이터/상태가 같으면 row가 re-render되지 않도록 함.
 */
export interface DataTableBodyRowContext<T extends { id: string | number }> {
  // 테이블 설정
  columnsToRender: DataTableColumn<T>[]
  rowReorderable: boolean
  selectable: boolean
  expandable: boolean
  showRowDelete: boolean
  hasLeftStickyColumns: boolean
  resizable: boolean
  /** rowActions.onRowDelete 를 ref 흡수한 stable callback (사용처 inline 도 안전) */
  onRowDelete: ((row: T) => void) | undefined
  rowGrouping: RowGroupConfig<T> | undefined
  middleRowSet: Set<number> | null
  dataLength: number

  // 헬퍼 함수 (모두 useCallback/useMemo로 안정화된 ref)
  getCheckboxHeaderLeftOffset: () => number
  getExpandHeaderLeftOffset: () => number
  getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined
  getStickyStyles: (
    column: DataTableColumn<T>,
    isHeader: boolean,
    isSelected?: boolean,
    groupCellSelected?: boolean,
  ) => StickyStyleResult
  getColumnWidth: (column: DataTableColumn<T>) => number | undefined
  getAlignClass: (align?: "left" | "center" | "right") => string

  // 콜백 (모두 useCallback 안정화)
  /** id: row.id, rowIndex: 0-based data index, shiftKey: Shift+클릭 시 true (범위 선택) */
  handleSelectRow: (id: string | number, rowIndex: number, shiftKey: boolean) => void
  toggleRowExpanded: (id: string | number) => void
  startEditing: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  completeEditing: (column: DataTableColumn<T>, row: T) => void
  cancelEditing: () => void
  setEditValue: (value: T[keyof T] | null) => void
  setEditingCell: (cell: EditingCell<T> | null) => void
  editValueRef: React.MutableRefObject<unknown>
  editingCellRef: React.RefObject<HTMLTableCellElement | null>
  onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined
  onRowClick: ((row: T) => void) | undefined
  rowClassName: ((row: T) => string) | undefined
  setHoveredRowIndex: (index: number | null) => void
}

export interface DataTableBodyRowProps<T extends { id: string | number }> {
  /** 현재 행 데이터 */
  row: T
  /** 행 인덱스 */
  rowIndex: number

  // 행별 상태 (이게 바뀌면 row만 re-render)
  isSelected: boolean
  canExpand: boolean
  isExpanded: boolean
  /** 이 행에서 편집 중인 셀 (다른 행은 null) */
  editingCell: EditingCell<T> | null
  /** 편집 중인 값 (편집 중인 행에서만 의미) */
  editValue: unknown

  /** 테이블 레벨 컨텍스트 (useMemo로 안정화) */
  ctx: DataTableBodyRowContext<T>

  /**
   * 가상화: TableRow DOM 요소에 부착할 ref (보통 virtualizer.measureElement).
   * 가상화 비활성 시엔 생략.
   */
  rowRef?: (el: HTMLTableRowElement | null) => void
  /**
   * 가상화: virtualizer.measureElement 가 ResizeObserver 로 측정 시 사용하는 인덱스 식별자.
   * 가상화 활성 시 virtualItem.index 를 넘김.
   */
  dataIndex?: number
  /**
   * rowGrouping 그룹 head 행의 머지 셀별 selected/hovered flag.
   * parent 에서 미리 계산해 전달 — 그룹 내 selected/hover 변경 시 해당 head 행만 부분 리렌더.
   */
  groupCellFlags?: GroupCellFlags
}

function DataTableBodyRowImpl<T extends { id: string | number }>(
  props: DataTableBodyRowProps<T>,
) {
  const {
    row,
    rowIndex,
    isSelected,
    canExpand,
    isExpanded,
    editingCell,
    editValue,
    ctx,
    rowRef,
    dataIndex,
    groupCellFlags,
  } = props

  const {
    columnsToRender,
    rowReorderable,
    selectable,
    expandable,
    showRowDelete,
    hasLeftStickyColumns,
    resizable,
    onRowDelete,
    rowGrouping,
    middleRowSet,
    dataLength,
    getCheckboxHeaderLeftOffset,
    getExpandHeaderLeftOffset,
    getRowSpan,
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
    editValueRef,
    editingCellRef,
    onCellChange,
    onRowClick,
    rowClassName,
    setHoveredRowIndex,
  } = ctx

  const isEditingCell = (rowId: string | number, columnKey: keyof T) =>
    editingCell?.rowId === rowId && editingCell?.columnKey === columnKey

  // Shift+클릭 범위 선택: Checkbox 의 onClick 에서 shiftKey 잡고
  // 곧바로 발동되는 onCheckedChange 에서 그 값을 읽어 handleSelectRow 에 전달.
  // (Radix Checkbox 는 onCheckedChange 에 event 를 안 넘기므로 ref 우회)
  const pendingShiftKeyRef = React.useRef(false)

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
              onClick={(e) => {
                pendingShiftKeyRef.current = e.shiftKey
              }}
              onCheckedChange={() => {
                const shiftKey = pendingShiftKeyRef.current
                pendingShiftKeyRef.current = false
                handleSelectRow(row.id, rowIndex, shiftKey)
              }}
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
            onClick={() => onRowDelete?.(row)}
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
        // groupCellFlags 는 parent 에서 미리 계산된 그룹 head 행의 column 별 selected/hovered.
        // hasRowSpan 인 셀에만 의미 (head 가 그리는 머지 셀).
        const colKeyStr = String(column.accessorKey)
        const groupCellHovered = hasRowSpan && (groupCellFlags?.hovered[colKeyStr] ?? false)
        const groupCellSelected = hasRowSpan && (groupCellFlags?.selected[colKeyStr] ?? false)
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
        const isGroupSpanToEnd = hasRowSpan && rowIndex + rowSpan >= dataLength

        return (
          <DataTableCell<T>
            key={String(column.accessorKey)}
            row={row}
            rowIndex={rowIndex}
            column={column}
            value={value}
            isSelected={isSelected}
            rowSpan={rowSpan}
            hasRowSpan={hasRowSpan}
            groupCellHovered={groupCellHovered}
            groupCellSelected={groupCellSelected}
            isEditing={cellIsEditing}
            onStartEdit={startEditing}
            editValue={editValue as T[keyof T] | null}
            editingCell={editingCell}
            setEditValue={setEditValue}
            setEditingCell={setEditingCell}
            editValueRef={editValueRef}
            editingCellRef={editingCellRef}
            completeEditing={completeEditing}
            cancelEditing={cancelEditing}
            onCellChange={onCellChange}
            stickyData={stickyData}
            cellStyle={cellStyle}
            alignClass={getAlignClass(column.align)}
            isGroupSpanToEnd={isGroupSpanToEnd}
          />
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
      ref={rowRef}
      data-index={dataIndex}
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
 * Custom equality 함수
 *
 * row 데이터 reference + 행 상태 + ctx reference만 비교.
 * ctx가 useMemo로 안정되어 있으면 ref 비교만으로 결정 가능 (O(1)).
 */
function arePropsEqual<T extends { id: string | number }>(
  prev: DataTableBodyRowProps<T>,
  next: DataTableBodyRowProps<T>,
): boolean {
  // 가장 자주 바뀌는 것부터 체크 (조기 종료 최적화)
  if (prev.row !== next.row) return false
  if (prev.isSelected !== next.isSelected) return false
  if (prev.isExpanded !== next.isExpanded) return false
  if (prev.canExpand !== next.canExpand) return false
  if (prev.rowIndex !== next.rowIndex) return false
  // 편집 상태: 이 행이 편집 중일 때만 의미 (다른 행 편집 시작/종료는 영향 없도록)
  const prevEditingThisRow = prev.editingCell?.rowId === prev.row.id
  const nextEditingThisRow = next.editingCell?.rowId === next.row.id
  if (prevEditingThisRow !== nextEditingThisRow) return false
  if (prevEditingThisRow) {
    // 이 행이 편집 중이면 editValue도 비교
    if (prev.editValue !== next.editValue) return false
    if (prev.editingCell?.columnKey !== next.editingCell?.columnKey) return false
    if (prev.editingCell?.error !== next.editingCell?.error) return false
  }
  // ctx는 useMemo로 안정화되어 있으므로 ref 비교만으로 충분
  if (prev.ctx !== next.ctx) return false
  // groupCellFlags: 그룹 head 행의 머지 셀 flag. 변경된 head 행만 리렌더되도록 내용 비교.
  // (parent useMemo 가 매번 새 Map 만들지만 행 단위 ref 는 안정되지 않으므로 deep compare 필요)
  const pf = prev.groupCellFlags
  const nf = next.groupCellFlags
  if (pf !== nf) {
    if (!pf || !nf) return false
    const ps = pf.selected
    const ns = nf.selected
    const ph = pf.hovered
    const nh = nf.hovered
    const psKeys = Object.keys(ps)
    if (psKeys.length !== Object.keys(ns).length) return false
    for (const k of psKeys) {
      if (ps[k] !== ns[k] || ph[k] !== nh[k]) return false
    }
  }
  return true
}

/**
 * 데이터 행 컴포넌트 (React.memo + custom equality)
 *
 * 다음 조건에서 re-render 스킵:
 * - row reference 동일 (불변 업데이트 시 변경 없는 행)
 * - isSelected, isExpanded, canExpand 동일
 * - 이 행이 편집 중이 아니고 다른 행이 편집 중이면 영향 없음
 * - ctx reference 동일 (useMemo로 안정화 필요)
 */
export const DataTableBodyRow = React.memo(
  DataTableBodyRowImpl,
  arePropsEqual as unknown as (
    prev: Readonly<DataTableBodyRowProps<{ id: string | number }>>,
    next: Readonly<DataTableBodyRowProps<{ id: string | number }>>,
  ) => boolean,
) as <T extends { id: string | number }>(
  props: DataTableBodyRowProps<T>,
) => React.ReactElement
