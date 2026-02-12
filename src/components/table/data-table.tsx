import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableHead,
  type SortDirection,
} from "@/components/table/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RightIcon, DownIcon } from "@/icons"

/** 편집 컴포넌트 Props */
export interface EditComponentProps<T, K extends keyof T = keyof T> {
  /** 현재 값 */
  value: T[K]
  /** 값 변경 핸들러 */
  onChange: (value: T[K]) => void
  /** 편집 완료 핸들러 (Enter 시 호출 - 검증 후 저장) */
  onComplete: () => void
  /** 편집 취소 핸들러 (Escape 또는 blur 시 호출 - 원래 값으로 복원) */
  onCancel: () => void
  /** 해당 행 데이터 */
  row: T
  /** 검증 에러 메시지 */
  error?: string
}

/** 검증 결과 타입 */
export type ValidationResult = true | string

/** 컬럼 정의 */
export interface DataTableColumn<T> {
  /** 데이터 접근 키 */
  accessorKey: keyof T
  /** 헤더 텍스트 */
  header: string
  /** 정렬 가능 여부 */
  sortable?: boolean
  /** 컬럼 고정 너비 (sticky 컬럼에 권장) */
  width?: string | number
  /** 컬럼 최소 너비 (유동적 너비에 권장) */
  minWidth?: string | number
  /** 셀 정렬 */
  align?: "left" | "center" | "right"
  /** 커스텀 셀 렌더러 */
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  /** 편집 가능 여부 */
  editable?: boolean
  /** 커스텀 편집 컴포넌트 (기본: Input) */
  editComponent?: (props: EditComponentProps<T>) => React.ReactNode
  /** 값 검증 함수 (true: 통과, string: 에러 메시지) */
  validate?: (value: T[keyof T], row: T) => ValidationResult
  /** 고정 컬럼 (left: 왼쪽 고정, right: 오른쪽 고정) */
  sticky?: "left" | "right"
}

/** 정렬 상태 */
export interface SortState<T> {
  column: keyof T | null
  direction: SortDirection
}

/** 확장 가능 행 설정 */
export interface ExpandableConfig<T> {
  /** 확장 영역 렌더링 함수 */
  expandedRowRender: (row: T) => React.ReactNode
  /** 행이 확장 가능한지 여부를 결정하는 함수 (기본: 모든 행 확장 가능) */
  rowExpandable?: (row: T) => boolean
  /** 기본 확장된 행 ID 배열 */
  defaultExpandedRowIds?: (string | number)[]
  /** 확장된 행 ID 배열 (제어 컴포넌트) */
  expandedRowIds?: (string | number)[]
  /** 확장 상태 변경 핸들러 */
  onExpandedChange?: (expandedRowIds: (string | number)[]) => void
}

/** 편집 중인 셀 상태 */
interface EditingCell<T> {
  rowId: string | number
  columnKey: keyof T
  error?: string
}

export interface DataTableProps<T extends { id: string | number }> {
  /** 컬럼 정의 */
  columns: DataTableColumn<T>[]
  /** 데이터 배열 */
  data: T[]
  /** 선택 기능 활성화 */
  selectable?: boolean
  /** 선택된 행 ID 배열 */
  selectedIds?: (string | number)[]
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  /** 정렬 상태 */
  sortState?: SortState<T>
  /** 정렬 변경 핸들러 */
  onSortChange?: (sortState: SortState<T>) => void
  /** 행 클릭 핸들러 */
  onRowClick?: (row: T) => void
  /** 셀 값 변경 핸들러 */
  onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  /** 확장 가능 행 설정 */
  expandable?: ExpandableConfig<T>
  /** 빈 데이터 메시지 */
  emptyMessage?: string
  /** 추가 className */
  className?: string
  /** 행 className 커스터마이즈 */
  rowClassName?: (row: T) => string
  /** 테이블 본문 최대 높이 (초과 시 내부 스크롤) */
  maxHeight?: number | string
}

/** 기본 편집 컴포넌트 (Input) */
function DefaultEditComponent<T>({
  value,
  onChange,
  onComplete,
  onCancel,
  error,
}: EditComponentProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onComplete()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }

  return (
    <div className="flex flex-col gap-0.5">
      <Input
        ref={inputRef}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value as T[keyof T])}
        onKeyDown={handleKeyDown}
        error={!!error}
        className="w-full min-w-[60px] px-2 text-xs"
      />
      {error && (
        <span className="text-[10px] text-destructive dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}

function DataTable<T extends { id: string | number }>({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  sortState,
  onSortChange,
  onRowClick,
  onCellChange,
  expandable,
  emptyMessage = "데이터가 없습니다.",
  className,
  rowClassName,
  maxHeight,
}: DataTableProps<T>) {
  const [editingCell, setEditingCell] = React.useState<EditingCell<T> | null>(null)
  const [editValue, setEditValue] = React.useState<T[keyof T] | null>(null)
  // stale closure 방지용 ref
  const editValueRef = React.useRef<T[keyof T] | null>(null)
  // 바깥 클릭 감지용 ref
  const editingCellRef = React.useRef<HTMLTableCellElement>(null)
  const [internalExpandedIds, setInternalExpandedIds] = React.useState<(string | number)[]>(
    expandable?.defaultExpandedRowIds ?? []
  )

  const expandedRowIds = expandable?.expandedRowIds ?? internalExpandedIds
  const setExpandedRowIds = expandable?.onExpandedChange ?? setInternalExpandedIds

  const isAllSelected = data.length > 0 && selectedIds.length === data.length
  const isIndeterminate = selectedIds.length > 0 && !isAllSelected

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map((row) => row.id))
    }
  }

  const handleSelectRow = (id: string | number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange?.([...selectedIds, id])
    }
  }

  const handleSort = (column: keyof T) => {
    if (!onSortChange) return

    if (sortState?.column === column) {
      if (sortState.direction === "asc") {
        onSortChange({ column, direction: "desc" })
      } else if (sortState.direction === "desc") {
        onSortChange({ column: null, direction: null })
      } else {
        onSortChange({ column, direction: "asc" })
      }
    } else {
      onSortChange({ column, direction: "asc" })
    }
  }

  const getSortDirection = (column: keyof T): SortDirection => {
    return sortState?.column === column ? sortState.direction : null
  }

  const getAlignClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const startEditing = (rowId: string | number, columnKey: keyof T, currentValue: T[keyof T]) => {
    setEditingCell({ rowId, columnKey })
    setEditValue(currentValue)
    editValueRef.current = currentValue
  }

  const completeEditing = (column: DataTableColumn<T>, row: T) => {
    // stale closure 방지를 위해 ref에서 읽음
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
  }

  const cancelEditing = React.useCallback(() => {
    setEditingCell(null)
    setEditValue(null)
    editValueRef.current = null
  }, [])

  React.useEffect(() => {
    if (!editingCell) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (editingCellRef.current?.contains(target)) return
      // Radix 포털 (Select 드롭다운) 내부 클릭은 무시해야 함
      const radixPortal = (target as Element).closest?.("[data-radix-popper-content-wrapper]")
      if (radixPortal) return
      cancelEditing()
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [editingCell, cancelEditing])

  const isEditing = (rowId: string | number, columnKey: keyof T) => {
    return editingCell?.rowId === rowId && editingCell?.columnKey === columnKey
  }

  const isRowExpandable = (row: T) => {
    if (!expandable) return false
    if (expandable.rowExpandable) return expandable.rowExpandable(row)
    return true
  }

  const isRowExpanded = (rowId: string | number) => {
    return expandedRowIds.includes(rowId)
  }

  const toggleRowExpanded = (rowId: string | number) => {
    if (isRowExpanded(rowId)) {
      setExpandedRowIds(expandedRowIds.filter((id) => id !== rowId))
    } else {
      setExpandedRowIds([...expandedRowIds, rowId])
    }
  }

  const totalColumns = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)

  // Sticky 컬럼 위치 계산
  const getStickyStyles = React.useMemo(() => {
    // 컬럼 너비 추출 헬퍼 (width 우선, 없으면 minWidth)
    const getColWidth = (col: DataTableColumn<T>): number => {
      const w = col.width ?? col.minWidth
      return typeof w === "number" ? w : parseInt(String(w) || "150", 10)
    }

    const leftColumns = columns.filter((col) => col.sticky === "left")
    const rightColumns = columns.filter((col) => col.sticky === "right")

    // 왼쪽 고정 컬럼 위치 계산 (체크박스, 확장 아이콘 컬럼 고려)
    const checkboxWidth = selectable ? 48 : 0 // w-12 = 48px
    const expandWidth = expandable ? 40 : 0 // w-10 = 40px
    const baseLeftOffset = checkboxWidth + expandWidth

    const leftPositions = new Map<keyof T, number>()
    let currentLeft = baseLeftOffset
    for (const col of leftColumns) {
      leftPositions.set(col.accessorKey, currentLeft)
      currentLeft += getColWidth(col)
    }

    // 오른쪽 고정 컬럼 위치 계산 (역순)
    const rightPositions = new Map<keyof T, number>()
    let currentRight = 0
    for (let i = rightColumns.length - 1; i >= 0; i--) {
      const col = rightColumns[i]
      rightPositions.set(col.accessorKey, currentRight)
      currentRight += getColWidth(col)
    }

    // 마지막 왼쪽/첫 번째 오른쪽 고정 컬럼 (그림자용)
    const lastLeftSticky = leftColumns.length > 0 ? leftColumns[leftColumns.length - 1].accessorKey : null
    const firstRightSticky = rightColumns.length > 0 ? rightColumns[0].accessorKey : null

    return (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean) => {
      if (!column.sticky) return { style: {}, className: "" }

      const isLastLeft = column.accessorKey === lastLeftSticky
      const isFirstRight = column.accessorKey === firstRightSticky

      // 컬럼 너비 (px 단위 문자열로 변환) - sticky는 고정 너비 필요
      const colWidth = getColWidth(column)
      const widthPx = `${colWidth}px`

      const baseStyles: React.CSSProperties = {
        position: "sticky",
        zIndex: isHeader ? 20 : 10,
        width: widthPx,
        minWidth: widthPx,
        maxWidth: widthPx,
      }

      if (column.sticky === "left") {
        const leftPos = leftPositions.get(column.accessorKey) ?? 0
        return {
          style: {
            ...baseStyles,
            left: `${leftPos}px`,
          },
          // 헤더: hover 없음, 바디: 행 단위 hover (group-hover), 스티키는 다른 배경색
          className: cn(
            "transition-colors",
            isHeader
              ? "bg-[#eaedf1] dark:bg-slate-800"
              : isSelected
                ? "bg-blue-50 dark:bg-blue-900"
                : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
            isLastLeft && "shadow-[2px_0_4px_rgba(0,0,0,0.08)]"
          ),
        }
      }

      const rightPos = rightPositions.get(column.accessorKey) ?? 0
      return {
        style: {
          ...baseStyles,
          right: `${rightPos}px`,
        },
        className: cn(
          "transition-colors",
          isHeader
            ? "bg-[#eaedf1] dark:bg-slate-800"
            : isSelected
              ? "bg-blue-50 dark:bg-blue-900"
              : "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700",
          isFirstRight && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        ),
      }
    }
  }, [columns, selectable, expandable])

  // 체크박스/확장 컬럼도 sticky로 만들기 (왼쪽 고정 컬럼이 있을 때)
  const hasLeftStickyColumns = columns.some((col) => col.sticky === "left")

  // 체크박스/확장 컬럼 너비 상수
  const CHECKBOX_WIDTH = 48 // w-12 = 48px
  const EXPAND_WIDTH = 40 // w-10 = 40px

  return (
    <Table className={className} maxHeight={maxHeight}>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead
              className="bg-[#eaedf1] dark:bg-slate-800"
              style={hasLeftStickyColumns ? {
                position: "sticky",
                left: 0,
                zIndex: 20,
                width: `${CHECKBOX_WIDTH}px`,
                minWidth: `${CHECKBOX_WIDTH}px`,
                maxWidth: `${CHECKBOX_WIDTH}px`,
              } : { width: `${CHECKBOX_WIDTH}px` }}
            >
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onCheckedChange={handleSelectAll}
                aria-label="전체 선택"
              />
            </TableHead>
          )}

          {expandable && (
            <TableHead
              className="bg-[#eaedf1] dark:bg-slate-800"
              style={hasLeftStickyColumns ? {
                position: "sticky",
                left: selectable ? CHECKBOX_WIDTH : 0,
                zIndex: 20,
                width: `${EXPAND_WIDTH}px`,
                minWidth: `${EXPAND_WIDTH}px`,
                maxWidth: `${EXPAND_WIDTH}px`,
              } : { width: `${EXPAND_WIDTH}px` }}
              aria-label="확장"
            >
              <span className="sr-only">확장</span>
            </TableHead>
          )}

          {columns.map((column) => {
            const stickyData = getStickyStyles(column, true)
            // sticky 컬럼은 getStickyStyles에서 width/minWidth/maxWidth 모두 설정
            // non-sticky 컬럼은 사용자가 지정한 width 또는 minWidth 사용
            const toPx = (v: string | number) => typeof v === "number" ? `${v}px` : v
            const baseStyle: React.CSSProperties = {}
            if (!column.sticky) {
              if (column.width) baseStyle.width = toPx(column.width)
              if (column.minWidth) baseStyle.minWidth = toPx(column.minWidth)
            }
            const style = { ...baseStyle, ...stickyData.style }

            if (column.sortable) {
              return (
                <TableSortableHead
                  key={String(column.accessorKey)}
                  sortDirection={getSortDirection(column.accessorKey)}
                  onSort={() => handleSort(column.accessorKey)}
                  style={style}
                  className={cn(getAlignClass(column.align), stickyData.className)}
                >
                  {column.header}
                </TableSortableHead>
              )
            }

            return (
              <TableHead
                key={String(column.accessorKey)}
                style={style}
                className={cn(getAlignClass(column.align), stickyData.className)}
              >
                {column.header}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={totalColumns}
              className="h-24 text-center text-slate-500"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => {
            const isSelected = selectedIds.includes(row.id)
            const canExpand = isRowExpandable(row)
            const isExpanded = isRowExpanded(row.id)

            return (
              <React.Fragment key={row.id}>
                <TableRow
                  data-state={isSelected ? "selected" : undefined}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    rowClassName?.(row)
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className={hasLeftStickyColumns ? (isSelected ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700") : undefined}
                      style={hasLeftStickyColumns ? {
                        position: "sticky",
                        left: 0,
                        zIndex: 10,
                        width: `${CHECKBOX_WIDTH}px`,
                        minWidth: `${CHECKBOX_WIDTH}px`,
                        maxWidth: `${CHECKBOX_WIDTH}px`,
                      } : { width: `${CHECKBOX_WIDTH}px` }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectRow(row.id)}
                        aria-label={`행 ${row.id} 선택`}
                      />
                    </TableCell>
                  )}

                  {expandable && (
                    <TableCell
                      className={cn(
                        "p-0",
                        hasLeftStickyColumns && (isSelected ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700")
                      )}
                      style={hasLeftStickyColumns ? {
                        position: "sticky",
                        left: selectable ? CHECKBOX_WIDTH : 0,
                        zIndex: 10,
                        width: `${EXPAND_WIDTH}px`,
                        minWidth: `${EXPAND_WIDTH}px`,
                        maxWidth: `${EXPAND_WIDTH}px`,
                      } : { width: `${EXPAND_WIDTH}px` }}
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
                          {isExpanded ? (
                            <DownIcon size={24} />
                          ) : (
                            <RightIcon size={24} />
                          )}
                        </button>
                      )}
                    </TableCell>
                  )}

                {columns.map((column) => {
                  const value = row[column.accessorKey]
                  const cellIsEditing = isEditing(row.id, column.accessorKey)
                  const stickyData = getStickyStyles(column, false, isSelected)

                  if (cellIsEditing && column.editable) {
                    const EditComponent = column.editComponent || DefaultEditComponent

                    return (
                      <TableCell
                        ref={editingCellRef}
                        key={String(column.accessorKey)}
                        className={cn(getAlignClass(column.align), "p-1", stickyData.className)}
                        style={stickyData.style}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EditComponent
                          value={editValue as T[keyof T]}
                          onChange={(newValue) => {
                            setEditValue(newValue)
                            // stale closure 방지
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

                  const content = column.cell
                    ? column.cell(value, row)
                    : String(value ?? "")

                  if (column.editable && onCellChange) {
                    return (
                      <TableCell
                        key={String(column.accessorKey)}
                        className={cn(
                          getAlignClass(column.align),
                          "cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                          stickyData.className
                        )}
                        style={stickyData.style}
                        onClick={(e) => {
                          e.stopPropagation()
                          // 이전 셀의 blur 처리가 먼저 완료되어야 함
                          setTimeout(() => {
                            startEditing(row.id, column.accessorKey, value)
                          }, 0)
                        }}
                      >
                        {content}
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell
                      key={String(column.accessorKey)}
                      className={cn(getAlignClass(column.align), stickyData.className)}
                      style={stickyData.style}
                    >
                      {content}
                    </TableCell>
                  )
                })}
                </TableRow>

                {expandable && isExpanded && (
                  <TableRow className="bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50">
                    <TableCell
                      colSpan={totalColumns}
                      className="p-4"
                    >
                      {expandable.expandedRowRender(row)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}

export { DataTable }
