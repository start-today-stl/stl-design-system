import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DownIcon, RightIcon, RowDeleteIcon } from "@/icons"
import { DataTableV2DefaultEdit } from "./data-table-v2-default-edit"
import type { DataTableV2Column } from "./types"

interface DataTableV2RowProps<T extends { id: string | number }> {
  row: T
  rowIndex: number
  columns: DataTableV2Column<T>[]
  leftOffsets: number[]
  rightOffsets: number[]
  lastLeftPinnedIdx: number
  firstRightPinnedIdx: number
  showLeftShadow: boolean
  showRightShadow: boolean
  totalWidth: number
  translateY: number
  isHovered: boolean
  onHover: (id: T["id"] | null) => void
  onHeightChange: (id: T["id"], height: number) => void
  // 행 선택
  selectable: boolean
  isSelected: boolean
  onToggleSelect: (id: T["id"], rowIndex: number, shiftKey: boolean) => void
  checkboxColWidth: number
  // 행 확장
  expandable: boolean
  isExpanded: boolean
  canExpand: boolean
  onToggleExpand: (id: T["id"]) => void
  expandedContent: React.ReactNode
  expandColWidth: number
  // 행 클릭 / className
  onRowClick?: (row: T) => void
  extraClassName?: string
  // 셀 편집
  editingColumnKey: keyof T | null
  editingState: { editValue: T[keyof T]; error?: string } | null
  onStartEdit: (row: T, col: DataTableV2Column<T>) => void
  onChangeEditValue: (value: T[keyof T]) => void
  onCompleteEdit: (col: DataTableV2Column<T>, row: T) => void
  onCancelEdit: () => void
  // 행 삭제 (rowActions)
  showRowDelete: boolean
  onRowDelete?: (row: T) => void
  rowActionsColWidth: number
}

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
}

function DataTableV2RowInner<T extends { id: string | number }>({
  row,
  rowIndex,
  columns,
  leftOffsets,
  rightOffsets,
  lastLeftPinnedIdx,
  firstRightPinnedIdx,
  showLeftShadow,
  showRightShadow,
  totalWidth,
  translateY,
  isHovered,
  onHover,
  onHeightChange,
  selectable,
  isSelected,
  onToggleSelect,
  checkboxColWidth,
  expandable,
  isExpanded,
  canExpand,
  onToggleExpand,
  expandedContent,
  expandColWidth,
  onRowClick,
  extraClassName,
  editingColumnKey,
  editingState,
  onStartEdit,
  onChangeEditValue,
  onCompleteEdit,
  onCancelEdit,
  showRowDelete,
  onRowDelete,
  rowActionsColWidth,
}: DataTableV2RowProps<T>) {
  const rowRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const report = () => onHeightChange(row.id, el.offsetHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.id, isExpanded])

  const bgClass = isHovered
    ? "bg-slate-100 dark:bg-slate-800"
    : isSelected
      ? "bg-blue-50 dark:bg-blue-900"
      : "bg-white dark:bg-slate-900"

  const shiftKeyRef = React.useRef(false)

  const handleRowClick = (e: React.MouseEvent) => {
    // 컨트롤 셀 / 상호작용 요소 클릭은 rowClick 트리거하지 않음
    if ((e.target as HTMLElement).closest("[data-no-row-click]")) return
    onRowClick?.(row)
  }

  return (
    <div
      ref={rowRef}
      role="row"
      className="absolute left-0 top-0 right-0 flex flex-col"
      style={{
        minWidth: totalWidth,
        transform: `translate3d(0, ${Math.round(translateY)}px, 0)`,
      }}
    >
      <div
        className={cn(
          "flex transition-colors",
          bgClass,
          onRowClick && "cursor-pointer",
          extraClassName
        )}
        onMouseEnter={() => onHover(row.id)}
        onMouseLeave={() => onHover(null)}
        onClick={onRowClick ? handleRowClick : undefined}
      >
        {selectable && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
              bgClass
            )}
            style={{ width: checkboxColWidth, left: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={isSelected}
              onClick={(e) => {
                shiftKeyRef.current = (e as React.MouseEvent).shiftKey
              }}
              onCheckedChange={() => {
                onToggleSelect(row.id, rowIndex, shiftKeyRef.current)
                shiftKeyRef.current = false
              }}
              aria-label={`행 ${row.id} 선택`}
            />
          </div>
        )}
        {expandable && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
              bgClass
            )}
            style={{
              width: expandColWidth,
              left: selectable ? checkboxColWidth : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {canExpand && (
              <button
                type="button"
                onClick={() => onToggleExpand(row.id)}
                className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={isExpanded ? "행 접기" : "행 펼치기"}
                aria-expanded={isExpanded}
              >
                {isExpanded ? <DownIcon size={24} /> : <RightIcon size={24} />}
              </button>
            )}
          </div>
        )}
        {columns.map((col, i) => {
          const colId = col.id ?? String(col.accessorKey)
          const value = row[col.accessorKey]
          const rendered = col.cell ? col.cell(value, row) : (value as React.ReactNode)
          const width = typeof col.width === "number" ? col.width : undefined
          const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
          const isLeft = col.pinned === "left"
          const isRight = col.pinned === "right"
          const isPinned = isLeft || isRight
          const isLeftBoundary = i === lastLeftPinnedIdx && showLeftShadow
          const isRightBoundary = i === firstRightPinnedIdx && showRightShadow
          const isFirstRightPinned = i === firstRightPinnedIdx
          const isCellEditing =
            !!editingState && editingColumnKey === col.accessorKey
          const outerCls = cn(
            "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
            width !== undefined && "shrink-0",
            isPinned && "sticky z-10 transition-colors",
            isPinned && bgClass,
            isFirstRightPinned && "ml-auto",
            isLeftBoundary && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
            isRightBoundary && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
          )
          const contentCls = cn(
            "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
            alignClass[col.align ?? "left"],
            col.editable && !isCellEditing && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
          )
          const EditComp = col.editComponent ?? DataTableV2DefaultEdit
          const handleEditableClick = col.editable
            ? (e: React.MouseEvent) => {
                e.stopPropagation()
                if (!isCellEditing) onStartEdit(row, col)
              }
            : undefined
          return (
            <div
              key={colId}
              role="gridcell"
              className={outerCls}
              style={{
                width,
                minWidth,
                flex: width === undefined ? "1 1 0" : undefined,
                left: isLeft ? leftOffsets[i] : undefined,
                right: isRight ? rightOffsets[i] : undefined,
              }}
              {...(col.editable ? { "data-no-row-click": true } : {})}
            >
              {isCellEditing && editingState ? (
                <div className="flex-1 flex items-center px-1 py-1">
                  <EditComp
                    value={editingState.editValue}
                    onChange={onChangeEditValue}
                    onComplete={() => onCompleteEdit(col, row)}
                    onCancel={onCancelEdit}
                    row={row}
                    error={editingState.error}
                  />
                </div>
              ) : (
                <div className={contentCls} onClick={handleEditableClick}>
                  {rendered}
                </div>
              )}
            </div>
          )
        })}
        {showRowDelete && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky right-0 z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
              // 우측 pinned 컬럼이 없으면 delete 셀이 자동으로 우측 밀림 (전체 fixed-width 케이스 대응)
              firstRightPinnedIdx === -1 && "ml-auto",
              bgClass
            )}
            style={{ width: rowActionsColWidth }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onRowDelete?.(row)}
              className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="행 삭제"
            >
              <RowDeleteIcon size={20} />
            </button>
          </div>
        )}
      </div>
      {isExpanded && expandedContent && (
        <div
          data-no-row-click
          className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700"
        >
          {expandedContent}
        </div>
      )}
    </div>
  )
}

type DataTableV2RowComponent = <T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) => React.ReactElement | null

export const DataTableV2Row = React.memo(DataTableV2RowInner) as DataTableV2RowComponent
