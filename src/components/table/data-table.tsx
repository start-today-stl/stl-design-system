import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DraggableAttributes,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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
import { RightIcon, DownIcon, DragHandleIcon, WriteIcon, STLArrowIcon } from "@/icons"

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
  header: React.ReactNode
  /** 정렬 가능 여부 */
  sortable?: boolean
  /** 컬럼 고정 너비 (sticky 컬럼에 권장) */
  width?: string | number
  /** 컬럼 최소 너비 (width 미설정 시 남은 공간을 채움) */
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

/** 헤더 그룹 정의 (다중 레벨 헤더) */
export interface HeaderGroup<T> {
  /** 그룹 헤더 텍스트 */
  header: React.ReactNode
  /** 이 그룹에 포함되는 컬럼 키 배열 */
  columns: (keyof T)[]
  /** 정렬 */
  align?: "left" | "center" | "right"
}

/** 로우 그룹핑 설정 */
export interface RowGroupConfig<T> {
  /** 그룹핑할 컬럼 키 (해당 컬럼 값이 같은 행들은 셀이 병합됨) */
  groupBy: keyof T | (keyof T)[]
  /** 그룹핑 적용 컬럼들 (미지정 시 groupBy 컬럼만 병합) */
  mergeColumns?: (keyof T)[]
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
  emptyMessage?: React.ReactNode
  /** 추가 className */
  className?: string
  /** 행 className 커스터마이즈 */
  rowClassName?: (row: T) => string
  /** 테이블 본문 최대 높이 (초과 시 내부 스크롤) */
  maxHeight?: number | string
  /** 컬럼 리사이징 활성화 */
  resizable?: boolean
  /** 컬럼 너비 상태 (제어 컴포넌트) */
  columnWidths?: Record<string, number>
  /** 컬럼 너비 변경 핸들러 */
  onColumnResize?: (columnKey: keyof T, width: number) => void
  /** 컬럼 순서 변경 활성화 */
  columnReorderable?: boolean
  /** 컬럼 순서 (accessorKey 배열) */
  columnOrder?: (keyof T)[]
  /** 컬럼 순서 변경 핸들러 */
  onColumnReorder?: (newOrder: (keyof T)[]) => void
  /** 로우 순서 변경 활성화 */
  rowReorderable?: boolean
  /** 로우 순서 변경 핸들러 */
  onRowReorder?: (newData: T[]) => void
  /** 로딩 상태 */
  loading?: boolean
  /** 커스텀 로딩 콘텐츠 (미설정 시 STL 화살표 로고 표시) */
  loadingContent?: React.ReactNode
  /** 헤더 그룹 정의 (다중 레벨 헤더) */
  headerGroups?: HeaderGroup<T>[]
  /** 로우 그룹핑 설정 (셀 병합) */
  rowGrouping?: RowGroupConfig<T>
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
        tableMode
        className="w-full px-2 text-xs"
      />
      {error && (
        <span className="text-[10px] text-destructive dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}

/** 드래그 가능한 헤더 셀 */
interface SortableHeaderCellProps {
  id: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

function SortableHeaderCell({
  id,
  children,
  className,
  style,
  disabled,
}: SortableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const dragStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? undefined : "grab",
  }

  return (
    <th
      ref={setNodeRef}
      style={dragStyle}
      className={cn(
        "group/drag h-9 pl-1.5 pr-1.5 py-1.5 text-left align-middle font-medium text-[#798698] dark:text-slate-300",
        "bg-[#eaedf1] dark:bg-slate-800",
        "[&:has([role=checkbox])]:pr-0",
        "hover:bg-slate-200/70 dark:hover:bg-slate-700/70",
        "transition-colors",
        isDragging && "z-50",
        className
      )}
      {...attributes}
      {...listeners}
    >
      <span className="flex items-center gap-0.5">
        <DragHandleIcon
          size={16}
          className="opacity-30 group-hover/drag:opacity-70 transition-opacity flex-shrink-0"
        />
        {children}
      </span>
    </th>
  )
}

/** 드래그 가능한 로우 */
interface SortableRowProps {
  id: string
  children: React.ReactNode | ((dragHandleProps: DragHandleProps) => React.ReactNode)
  className?: string
  isSelected?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

interface DragHandleProps {
  listeners?: Record<string, unknown>
  attributes?: DraggableAttributes
  setActivatorNodeRef?: (element: HTMLElement | null) => void
}

function SortableRow({
  id,
  children,
  className,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: SortableRowProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      data-state={isSelected ? "selected" : undefined}
      className={cn(
        "group border-b border-slate-200 dark:border-slate-700 transition-colors",
        "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800",
        "data-[state=selected]:bg-blue-50 dark:data-[state=selected]:bg-blue-900",
        isDragging && "z-50 shadow-lg",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {typeof children === "function"
        ? children({ listeners, attributes, setActivatorNodeRef })
        : children}
    </tr>
  )
}

/** 드래그 핸들 셀 */
interface DragHandleCellProps {
  isSelected?: boolean
  hasLeftStickyColumns?: boolean
  dragHandleProps?: DragHandleProps
}

function DragHandleCell({ isSelected, hasLeftStickyColumns, dragHandleProps }: DragHandleCellProps) {
  const DRAG_HANDLE_WIDTH = 32
  const { listeners, attributes, setActivatorNodeRef } = dragHandleProps ?? {}

  return (
    <td
      className={cn(
        "p-0 align-middle",
        hasLeftStickyColumns && (isSelected
          ? "transition-colors bg-blue-50 dark:bg-blue-900"
          : "transition-colors bg-slate-100 dark:bg-slate-800"
        )
      )}
      style={hasLeftStickyColumns ? {
        position: "sticky",
        left: 0,
        zIndex: 10,
        width: `${DRAG_HANDLE_WIDTH}px`,
        minWidth: `${DRAG_HANDLE_WIDTH}px`,
        maxWidth: `${DRAG_HANDLE_WIDTH}px`,
      } : {
        width: `${DRAG_HANDLE_WIDTH}px`,
        minWidth: `${DRAG_HANDLE_WIDTH}px`,
        maxWidth: `${DRAG_HANDLE_WIDTH}px`,
      }}
    >
      <div
        ref={setActivatorNodeRef}
        className="flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
        aria-label="행 순서 변경"
        {...listeners}
        {...attributes}
      >
        <DragHandleIcon size={16} />
      </div>
    </td>
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
  resizable = false,
  columnWidths,
  onColumnResize,
  columnReorderable = false,
  columnOrder,
  onColumnReorder,
  rowReorderable: rowReorderableProp = false,
  onRowReorder,
  loading = false,
  loadingContent,
  headerGroups,
  rowGrouping,
}: DataTableProps<T>) {
  // rowGrouping과 rowReorderable은 함께 사용할 수 없음 (rowSpan 셀 드래그 시 레이아웃 깨짐)
  const rowReorderable = rowGrouping ? false : rowReorderableProp

  React.useEffect(() => {
    if (rowGrouping && rowReorderableProp) {
      console.warn(
        "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. " +
        "rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
      )
    }
  }, [rowGrouping, rowReorderableProp])

  const [editingCell, setEditingCell] = React.useState<EditingCell<T> | null>(null)
  const [editValue, setEditValue] = React.useState<T[keyof T] | null>(null)
  // stale closure 방지용 ref
  const editValueRef = React.useRef<T[keyof T] | null>(null)
  // 바깥 클릭 감지용 ref
  const editingCellRef = React.useRef<HTMLTableCellElement>(null)
  const [internalExpandedIds, setInternalExpandedIds] = React.useState<(string | number)[]>(
    expandable?.defaultExpandedRowIds ?? []
  )
  // 내부 컬럼 너비 상태 (비제어 컴포넌트용)
  const [internalColumnWidths, setInternalColumnWidths] = React.useState<Record<string, number>>({})
  // 리사이징 상태
  const [resizingColumn, setResizingColumn] = React.useState<keyof T | null>(null)
  const resizeStartX = React.useRef<number>(0)
  const resizeStartWidth = React.useRef<number>(0)
  // 내부 컬럼 순서 상태 (비제어 컴포넌트용)
  const [internalColumnOrder, setInternalColumnOrder] = React.useState<(keyof T)[]>(() =>
    columns.map((col) => col.accessorKey)
  )
  // 로우 그룹핑용 호버 상태 추적
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!columnReorderable || columnOrder) return

    setInternalColumnOrder((prev) => {
      const columnKeys = columns.map((col) => col.accessorKey)
      const next = prev.filter((key) => columnKeys.includes(key))
      const missing = columnKeys.filter((key) => !next.includes(key))
      const updated = [...next, ...missing]

      if (
        updated.length === prev.length &&
        updated.every((key, index) => key === prev[index])
      ) {
        return prev
      }

      return updated
    })
  }, [columns, columnReorderable, columnOrder])

  // 컬럼 순서 (제어/비제어)
  const currentColumnOrder = columnOrder ?? internalColumnOrder
  const orderedColumns = React.useMemo(() => {
    if (!columnReorderable) return columns
    return currentColumnOrder
      .map((key) => columns.find((col) => col.accessorKey === key))
      .filter((col): col is DataTableColumn<T> => col !== undefined)
  }, [columns, currentColumnOrder, columnReorderable])

  // dnd-kit 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 드래그해야 활성화
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // 컬럼 드래그 완료 핸들러
  const handleColumnDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = currentColumnOrder.findIndex((key) => String(key) === active.id)
      const newIndex = currentColumnOrder.findIndex((key) => String(key) === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const newOrder = arrayMove(currentColumnOrder, oldIndex, newIndex)

      if (onColumnReorder) {
        onColumnReorder(newOrder)
      } else {
        setInternalColumnOrder(newOrder)
      }
    },
    [currentColumnOrder, onColumnReorder]
  )

  // 로우 드래그 완료 핸들러
  const handleRowDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      // row- 접두사 제거 후 비교
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

  // 통합 드래그 완료 핸들러
  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active } = event
      // row-로 시작하면 로우 드래그, 아니면 컬럼 드래그
      if (String(active.id).startsWith("row-")) {
        handleRowDragEnd(event)
      } else {
        handleColumnDragEnd(event)
      }
    },
    [handleColumnDragEnd, handleRowDragEnd]
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

  const totalColumns = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowReorderable ? 1 : 0)

  // 로우 그룹핑: rowSpan 계산 + 그룹 중간 행 Set
  const { rowSpanMap, middleRowSet } = React.useMemo(() => {
    if (!rowGrouping) return { rowSpanMap: null, middleRowSet: null }

    const groupByKeys = Array.isArray(rowGrouping.groupBy)
      ? rowGrouping.groupBy
      : [rowGrouping.groupBy]
    const mergeColumns = rowGrouping.mergeColumns ?? groupByKeys

    // Map: rowIndex -> columnKey -> rowSpan (0이면 이 셀은 렌더링하지 않음)
    const spanMap = new Map<number, Map<keyof T, number>>()
    // 그룹 중간에 있는 행들 (border-b 숨김)
    const middleRows = new Set<number>()

    // 각 병합 컬럼에 대해 rowSpan 계산
    for (const colKey of mergeColumns) {
      let i = 0
      while (i < data.length) {
        // 현재 행의 그룹 키 값들
        const currentGroupValues = groupByKeys.map((k) => data[i][k])
        const currentColValue = data[i][colKey]
        let spanCount = 1

        // 같은 그룹 값을 가진 연속된 행 수 계산
        for (let j = i + 1; j < data.length; j++) {
          const nextGroupValues = groupByKeys.map((k) => data[j][k])
          const nextColValue = data[j][colKey]

          // 그룹 키와 컬럼 값이 모두 같아야 병합
          const sameGroup = currentGroupValues.every((v, idx) => v === nextGroupValues[idx])
          const sameValue = currentColValue === nextColValue

          if (sameGroup && sameValue) {
            spanCount++
          } else {
            break
          }
        }

        // 첫 번째 행에 rowSpan 설정
        if (!spanMap.has(i)) {
          spanMap.set(i, new Map())
        }
        spanMap.get(i)!.set(colKey, spanCount)

        // 병합된 후속 행들은 rowSpan 0 (렌더링 안 함)
        // + 그룹 중간 행 기록 (마지막 행 제외)
        for (let k = i; k < i + spanCount - 1; k++) {
          middleRows.add(k)
        }
        for (let k = i + 1; k < i + spanCount; k++) {
          if (!spanMap.has(k)) {
            spanMap.set(k, new Map())
          }
          spanMap.get(k)!.set(colKey, 0)
        }

        i += spanCount
      }
    }

    return { rowSpanMap: spanMap, middleRowSet: middleRows }
  }, [data, rowGrouping])

  // 특정 셀의 rowSpan 가져오기
  const getRowSpan = (rowIndex: number, columnKey: keyof T): number | undefined => {
    if (!rowSpanMap) return undefined
    const rowMap = rowSpanMap.get(rowIndex)
    if (!rowMap) return undefined
    const span = rowMap.get(columnKey)
    return span
  }

  // 그룹 셀이 속한 행 범위 내에 호버된 행이 있는지 확인
  const isGroupCellHovered = (rowIndex: number, rowSpan: number): boolean => {
    if (hoveredRowIndex === null) return false
    return hoveredRowIndex >= rowIndex && hoveredRowIndex < rowIndex + rowSpan
  }

  // 그룹 셀이 속한 행 범위 내에 선택된 행이 있는지 확인
  const isGroupCellSelected = (rowIndex: number, rowSpan: number): boolean => {
    for (let i = rowIndex; i < rowIndex + rowSpan; i++) {
      if (i < data.length && selectedIds.includes(data[i].id)) {
        return true
      }
    }
    return false
  }

  // 체크박스/확장/드래그 핸들 컬럼 너비 상수
  const CHECKBOX_WIDTH = 40 // w-10 = 40px
  const EXPAND_WIDTH = 40 // w-10 = 40px
  const DRAG_HANDLE_WIDTH = 32 // w-8 = 32px

  // Sticky 컬럼 위치 계산
  const getStickyStyles = React.useMemo(() => {
    // 컬럼 너비 추출 헬퍼 (width 우선, 없으면 minWidth)
    const getColWidth = (col: DataTableColumn<T>): number => {
      const w = col.width ?? col.minWidth
      if (typeof w === "number") return w
      const parsed = parseInt(String(w), 10)
      return Number.isFinite(parsed) ? parsed : 150
    }

    const leftColumns = columns.filter((col) => col.sticky === "left")
    const rightColumns = columns.filter((col) => col.sticky === "right")

    // 왼쪽 고정 컬럼 위치 계산 (드래그 핸들, 체크박스, 확장 아이콘 컬럼 고려)
    const dragHandleWidth = rowReorderable ? DRAG_HANDLE_WIDTH : 0
    const checkboxWidth = selectable ? CHECKBOX_WIDTH : 0
    const expandWidth = expandable ? EXPAND_WIDTH : 0
    const baseLeftOffset = dragHandleWidth + checkboxWidth + expandWidth

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

    return (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => {
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

      // 그룹 셀 선택 상태가 있으면 우선 적용
      const effectiveSelected = groupCellSelected ?? isSelected

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
              : effectiveSelected
                ? "bg-blue-50 dark:bg-blue-900"
                : "bg-slate-100 dark:bg-slate-800",
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
            : effectiveSelected
              ? "bg-blue-50 dark:bg-blue-900"
              : "bg-slate-100 dark:bg-slate-800",
          isFirstRight && "shadow-[-2px_0_4px_rgba(0,0,0,0.08)]"
        ),
      }
    }
  }, [columns, selectable, expandable])

  // 체크박스/확장 컬럼도 sticky로 만들기 (왼쪽 고정 컬럼이 있을 때)
  const hasLeftStickyColumns = columns.some((col) => col.sticky === "left")

  // 컬럼 너비 가져오기 (제어/비제어 컴포넌트 통합)
  const getColumnWidth = React.useCallback(
    (column: DataTableColumn<T>): number | undefined => {
      const key = String(column.accessorKey)
      // 제어 컴포넌트
      if (columnWidths && key in columnWidths) {
        return columnWidths[key]
      }
      // 비제어 컴포넌트
      if (key in internalColumnWidths) {
        return internalColumnWidths[key]
      }
      // 초기값: column.width 또는 undefined
      if (column.width) {
        return typeof column.width === "number" ? column.width : parseInt(column.width, 10)
      }
      return undefined
    },
    [columnWidths, internalColumnWidths]
  )

  // 리사이즈 핸들러
  const handleResizeStart = React.useCallback(
    (e: React.MouseEvent, column: DataTableColumn<T>) => {
      e.preventDefault()
      e.stopPropagation()
      setResizingColumn(column.accessorKey)
      resizeStartX.current = e.clientX
      const currentWidth = getColumnWidth(column) ?? 150
      resizeStartWidth.current = currentWidth
    },
    [getColumnWidth]
  )

  const handleResizeMove = React.useCallback(
    (e: MouseEvent) => {
      if (!resizingColumn) return
      const delta = e.clientX - resizeStartX.current
      const newWidth = Math.max(50, resizeStartWidth.current + delta) // 최소 50px
      const key = String(resizingColumn)

      if (onColumnResize) {
        onColumnResize(resizingColumn, newWidth)
      } else {
        setInternalColumnWidths((prev) => ({ ...prev, [key]: newWidth }))
      }
    },
    [resizingColumn, onColumnResize]
  )

  const handleResizeEnd = React.useCallback(() => {
    setResizingColumn(null)
  }, [])

  // 전역 마우스 이벤트 등록 (리사이징 중)
  React.useEffect(() => {
    if (!resizingColumn) return

    document.addEventListener("mousemove", handleResizeMove)
    document.addEventListener("mouseup", handleResizeEnd)
    // 드래그 중 텍스트 선택 방지
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    return () => {
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [resizingColumn, handleResizeMove, handleResizeEnd])

  // 컬럼 헤더 렌더링 함수
  const renderColumnHeader = (column: DataTableColumn<T>) => {
    const stickyData = getStickyStyles(column, true)
    const toPx = (v: string | number) => typeof v === "number" ? `${v}px` : v
    const baseStyle: React.CSSProperties = {}
    if (!column.sticky) {
      const resizedWidth = resizable ? getColumnWidth(column) : undefined
      if (resizedWidth !== undefined) {
        baseStyle.width = `${resizedWidth}px`
        baseStyle.minWidth = `${resizedWidth}px`
      } else {
        if (column.width) baseStyle.width = toPx(column.width)
        if (column.minWidth) baseStyle.minWidth = toPx(column.minWidth)
      }
    }
    const style = { ...baseStyle, ...stickyData.style }

    // 리사이즈 핸들 컴포넌트
    const resizeHandle = resizable && (
      <div
        className={cn(
          "absolute top-0 h-full w-[9px] cursor-col-resize opacity-0 hover:opacity-100 transition-opacity z-30",
          resizingColumn === column.accessorKey && "opacity-100"
        )}
        style={{
          right: "-4px",
          background: "linear-gradient(to right, transparent, rgba(148,163,184,0.5) 50%, transparent)"
        }}
        onMouseDown={(e) => handleResizeStart(e, column)}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      />
    )

    // 드래그 가능 여부 (sticky 컬럼은 드래그 불가)
    const isDraggable = columnReorderable && !column.sticky && !column.sortable

    if (isDraggable) {
      return (
        <SortableHeaderCell
          key={String(column.accessorKey)}
          id={String(column.accessorKey)}
          style={style}
          className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible")}
        >
          {column.header}
          {resizeHandle}
        </SortableHeaderCell>
      )
    }

    if (column.sortable) {
      return (
        <TableSortableHead
          key={String(column.accessorKey)}
          sortDirection={getSortDirection(column.accessorKey)}
          onSort={() => handleSort(column.accessorKey)}
          style={style}
          className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible")}
        >
          {column.header}
          {resizeHandle}
        </TableSortableHead>
      )
    }

    return (
      <TableHead
        key={String(column.accessorKey)}
        style={style}
        className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible")}
      >
        {column.header}
        {resizeHandle}
      </TableHead>
    )
  }

  const columnsToRender = columnReorderable ? orderedColumns : columns
  const columnIds = columnsToRender.filter(col => !col.sticky).map(col => String(col.accessorKey))
  const rowIds = data.map(row => `row-${row.id}`)

  // 드래그 핸들 헤더 sticky left 위치 계산
  const getDragHandleHeaderLeftOffset = () => 0
  // 체크박스 헤더 sticky left 위치 계산
  const getCheckboxHeaderLeftOffset = () => rowReorderable ? DRAG_HANDLE_WIDTH : 0
  // 확장 버튼 헤더 sticky left 위치 계산
  const getExpandHeaderLeftOffset = () => {
    let offset = 0
    if (rowReorderable) offset += DRAG_HANDLE_WIDTH
    if (selectable) offset += CHECKBOX_WIDTH
    return offset
  }

  // 헤더 그룹의 colSpan 계산
  const getHeaderGroupColSpan = React.useCallback(
    (group: HeaderGroup<T>): number => {
      // 실제 렌더링되는 컬럼 순서에서 해당 그룹에 속하는 컬럼 수 계산
      return columnsToRender.filter((col) =>
        group.columns.includes(col.accessorKey)
      ).length
    },
    [columnsToRender]
  )

  // 헤더 그룹에 속하는 컬럼들 (Set)
  const groupedColumnsSet = React.useMemo(() => {
    if (!headerGroups) return new Set<keyof T>()
    return new Set(headerGroups.flatMap((g) => g.columns))
  }, [headerGroups])

  const tableContent = (
    <Table className={className} maxHeight={maxHeight}>
      <TableHeader>
        {/* 헤더 그룹 행 (headerGroups가 있을 때만 렌더링) */}
        {headerGroups && headerGroups.length > 0 && (
          <TableRow>
            {/* 드래그 핸들, 체크박스, 확장 버튼 컬럼용 빈 셀 */}
            {rowReorderable && (
              <TableHead
                className="!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0"
                rowSpan={2}
                style={{
                  width: `${DRAG_HANDLE_WIDTH}px`,
                  minWidth: `${DRAG_HANDLE_WIDTH}px`,
                  ...(hasLeftStickyColumns && { position: "sticky", left: 0, zIndex: 20 }),
                }}
              />
            )}
            {selectable && (
              <TableHead
                className="!p-0 bg-[#eaedf1] dark:bg-slate-800 border-b-0"
                rowSpan={2}
                style={{
                  width: `${CHECKBOX_WIDTH}px`,
                  minWidth: `${CHECKBOX_WIDTH}px`,
                  ...(hasLeftStickyColumns && { position: "sticky", left: rowReorderable ? DRAG_HANDLE_WIDTH : 0, zIndex: 20 }),
                }}
              >
                <div className="flex items-center justify-center h-9">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onCheckedChange={handleSelectAll}
                    aria-label="전체 선택"
                  />
                </div>
              </TableHead>
            )}
            {expandable && (
              <TableHead
                className="bg-[#eaedf1] dark:bg-slate-800 border-b-0"
                rowSpan={2}
                style={{
                  width: `${EXPAND_WIDTH}px`,
                  minWidth: `${EXPAND_WIDTH}px`,
                  ...(hasLeftStickyColumns && { position: "sticky", left: getExpandHeaderLeftOffset(), zIndex: 20 }),
                }}
              />
            )}

            {/* 헤더 그룹과 독립 컬럼들 렌더링 */}
            {(() => {
              const groupedColumns = new Set(headerGroups.flatMap((g) => g.columns))
              const elements: React.ReactNode[] = []
              let i = 0

              while (i < columnsToRender.length) {
                const col = columnsToRender[i]

                // 이 컬럼이 어떤 그룹에 속하는지 확인
                const group = headerGroups.find((g) =>
                  g.columns.includes(col.accessorKey)
                )

                if (group) {
                  // 그룹의 첫 번째 컬럼인 경우에만 그룹 헤더 렌더링
                  const groupFirstCol = columnsToRender.find((c) =>
                    group.columns.includes(c.accessorKey)
                  )
                  if (groupFirstCol?.accessorKey === col.accessorKey) {
                    const colSpan = getHeaderGroupColSpan(group)
                    elements.push(
                      <TableHead
                        key={`group-${String(group.columns[0])}`}
                        colSpan={colSpan}
                        className={cn(
                          "text-center font-medium bg-[#eaedf1] dark:bg-slate-800",
                          group.align === "left" && "text-left",
                          group.align === "right" && "text-right"
                        )}
                      >
                        {group.header}
                      </TableHead>
                    )
                  }
                } else if (!groupedColumns.has(col.accessorKey)) {
                  // 독립 컬럼 (그룹에 속하지 않음) - rowSpan=2
                  const stickyData = getStickyStyles(col, true)
                  elements.push(
                    <TableHead
                      key={`standalone-${String(col.accessorKey)}`}
                      rowSpan={2}
                      className={cn(
                        getAlignClass(col.align),
                        "bg-[#eaedf1] dark:bg-slate-800 border-b-0",
                        stickyData.className
                      )}
                      style={stickyData.style}
                    >
                      {col.header}
                    </TableHead>
                  )
                }
                i++
              }
              return elements
            })()}
          </TableRow>
        )}

        {/* 메인 헤더 행 */}
        <TableRow>
          {/* headerGroups가 있으면 이 컬럼들은 위 행에서 rowSpan=2로 렌더링됨 */}
          {!headerGroups && rowReorderable && (
            <TableHead
              className="!p-0 bg-[#eaedf1] dark:bg-slate-800"
              style={hasLeftStickyColumns ? {
                position: "sticky",
                left: getDragHandleHeaderLeftOffset(),
                zIndex: 20,
                width: `${DRAG_HANDLE_WIDTH}px`,
                minWidth: `${DRAG_HANDLE_WIDTH}px`,
                maxWidth: `${DRAG_HANDLE_WIDTH}px`,
              } : {
                width: `${DRAG_HANDLE_WIDTH}px`,
                minWidth: `${DRAG_HANDLE_WIDTH}px`,
                maxWidth: `${DRAG_HANDLE_WIDTH}px`,
              }}
              aria-label="순서 변경"
            >
              <span className="sr-only">순서 변경</span>
            </TableHead>
          )}

          {!headerGroups && selectable && (
            <TableHead
              className="!p-0 bg-[#eaedf1] dark:bg-slate-800"
              style={hasLeftStickyColumns ? {
                position: "sticky",
                left: getCheckboxHeaderLeftOffset(),
                zIndex: 20,
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
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onCheckedChange={handleSelectAll}
                  aria-label="전체 선택"
                />
              </div>
            </TableHead>
          )}

          {!headerGroups && expandable && (
            <TableHead
              className="bg-[#eaedf1] dark:bg-slate-800"
              style={hasLeftStickyColumns ? {
                position: "sticky",
                left: getExpandHeaderLeftOffset(),
                zIndex: 20,
                width: `${EXPAND_WIDTH}px`,
                minWidth: `${EXPAND_WIDTH}px`,
                maxWidth: `${EXPAND_WIDTH}px`,
              } : {
                width: `${EXPAND_WIDTH}px`,
                minWidth: `${EXPAND_WIDTH}px`,
                maxWidth: `${EXPAND_WIDTH}px`,
              }}
              aria-label="확장"
            >
              <span className="sr-only">확장</span>
            </TableHead>
          )}

          {/* headerGroups가 있으면 그룹에 속한 컬럼만 렌더링 (독립 컬럼은 위 행에서 rowSpan=2) */}
          {headerGroups ? (
            columnReorderable ? (
              <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                {columnsToRender
                  .filter((col) => groupedColumnsSet.has(col.accessorKey))
                  .map(renderColumnHeader)}
              </SortableContext>
            ) : (
              columnsToRender
                .filter((col) => groupedColumnsSet.has(col.accessorKey))
                .map(renderColumnHeader)
            )
          ) : (
            columnReorderable ? (
              <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                {columnsToRender.map(renderColumnHeader)}
              </SortableContext>
            ) : (
              columnsToRender.map(renderColumnHeader)
            )
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow className="hover:bg-white dark:hover:bg-slate-900">
            <TableCell
              colSpan={totalColumns}
              className="h-80 text-center"
            >
              {loadingContent ?? (
                <div className="flex items-center justify-center">
                  <STLArrowIcon size={200} className="text-slate-200 dark:text-slate-700" />
                </div>
              )}
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow className="hover:bg-white dark:hover:bg-slate-900">
            <TableCell
              colSpan={totalColumns}
              className="h-24 text-center text-slate-500"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : rowReorderable ? (
          <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
            {data.map((row, rowIndex) => {
              const isSelected = selectedIds.includes(row.id)
              const canExpand = isRowExpandable(row)
              const isExpanded = isRowExpanded(row.id)
              const rowSortableId = `row-${row.id}`
              // 로우 내부 셀들 렌더링 함수
              const renderRowCells = (dragHandleProps?: DragHandleProps) => (
                <>
                  <DragHandleCell
                    isSelected={isSelected}
                    hasLeftStickyColumns={hasLeftStickyColumns}
                    dragHandleProps={dragHandleProps}
                  />

                  {selectable && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "!p-0",
                        hasLeftStickyColumns && (isSelected ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
                        hasLeftStickyColumns && (isSelected ? "transition-colors bg-blue-50 dark:bg-blue-900" : "transition-colors bg-slate-100 dark:bg-slate-800")
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
                          {isExpanded ? (
                            <DownIcon size={24} />
                          ) : (
                            <RightIcon size={24} />
                          )}
                        </button>
                      )}
                    </TableCell>
                  )}

                  {columnsToRender.map((column) => {
                    // 로우 그룹핑: rowSpan 확인
                    const rowSpan = getRowSpan(rowIndex, column.accessorKey)
                    // rowSpan이 0이면 이 셀은 이전 행에서 병합되었으므로 렌더링하지 않음
                    if (rowSpan === 0) return null

                    const value = row[column.accessorKey]
                    const cellIsEditing = isEditing(row.id, column.accessorKey)
                    // rowSpan이 있는 셀은 세로 중앙 정렬
                    const hasRowSpan = rowSpan !== undefined && rowSpan > 1
                    // 그룹 셀의 hover/selected 상태 (범위 내 행 중 하나라도 hover/selected면 true)
                    const groupCellHovered = hasRowSpan && isGroupCellHovered(rowIndex, rowSpan)
                    const groupCellSelected = hasRowSpan && isGroupCellSelected(rowIndex, rowSpan)
                    // sticky 스타일 (그룹 셀 선택 상태 전달)
                    const stickyData = getStickyStyles(column, false, isSelected, hasRowSpan ? groupCellSelected : undefined)

                    const toPx = (v: string | number) => typeof v === "number" ? `${v}px` : v
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
                          ref={editingCellRef}
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
                            hasRowSpan && "align-middle",
                            stickyData.className
                          )}
                          style={cellStyle}
                          onClick={(e) => {
                            e.stopPropagation()
                            setTimeout(() => startEditing(row.id, column.accessorKey, value), 0)
                          }}
                          rowSpan={hasRowSpan ? rowSpan : undefined}
                        >
                          <span className="flex items-center gap-1">
                            <span className="flex-1">{content}</span>
                            <WriteIcon
                              size={14}
                              className="flex-shrink-0 opacity-0 group-hover/edit:opacity-100 transition-opacity text-blue-500 dark:text-blue-300"
                            />
                          </span>
                        </TableCell>
                      )
                    }

                    // 그룹 셀이 테이블 마지막 행까지 걸쳐있으면 border-b 제외
                    const isGroupSpanToEnd = hasRowSpan && (rowIndex + rowSpan >= data.length)

                    return (
                      <TableCell
                        key={String(column.accessorKey)}
                        className={cn(
                          getAlignClass(column.align),
                          hasRowSpan && "align-middle transition-colors",
                          hasRowSpan && !isGroupSpanToEnd && "border-b border-slate-200 dark:border-slate-700",
                          // 그룹 셀 hover/selected 스타일
                          hasRowSpan && groupCellSelected && "bg-blue-50 dark:bg-blue-900",
                          hasRowSpan && !groupCellSelected && groupCellHovered && "bg-slate-100 dark:bg-slate-800",
                          stickyData.className
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

              return (
                <React.Fragment key={row.id}>
                  <SortableRow
                    id={rowSortableId}
                    isSelected={isSelected}
                    className={cn(onRowClick && "cursor-pointer", rowClassName?.(row))}
                    onClick={() => onRowClick?.(row)}
                    onMouseEnter={rowGrouping ? () => setHoveredRowIndex(rowIndex) : undefined}
                    onMouseLeave={rowGrouping ? () => setHoveredRowIndex(null) : undefined}
                  >
                    {(dragHandleProps) => renderRowCells(dragHandleProps)}
                  </SortableRow>

                  {expandable && isExpanded && (
                    <TableRow className="bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50">
                      <TableCell
                        colSpan={totalColumns}
                        className="p-0"
                        style={{ position: "relative" }}
                      >
                        <div
                          className="p-4 overflow-x-auto"
                          style={{
                            position: "sticky",
                            left: 0,
                            width: "100%",
                            maxWidth: "100vw",
                          }}
                        >
                          {expandable.expandedRowRender(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })}
          </SortableContext>
        ) : (
          data.map((row, rowIndex) => {
            const isSelected = selectedIds.includes(row.id)
            const canExpand = isRowExpandable(row)
            const isExpanded = isRowExpanded(row.id)
            const rowSortableId = `row-${row.id}`

            // 로우 내부 셀들 렌더링 함수
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
                        {isExpanded ? (
                          <DownIcon size={24} />
                        ) : (
                          <RightIcon size={24} />
                        )}
                      </button>
                    )}
                  </TableCell>
                )}

                {columnsToRender.map((column) => {
                  // 로우 그룹핑: rowSpan 확인
                  const rowSpan = getRowSpan(rowIndex, column.accessorKey)
                  // rowSpan이 0이면 이 셀은 이전 행에서 병합되었으므로 렌더링하지 않음
                  if (rowSpan === 0) return null

                  const value = row[column.accessorKey]
                  const cellIsEditing = isEditing(row.id, column.accessorKey)
                  // rowSpan이 있는 셀은 세로 중앙 정렬
                  const hasRowSpan = rowSpan !== undefined && rowSpan > 1
                  // 그룹 셀의 hover/selected 상태 (범위 내 행 중 하나라도 hover/selected면 true)
                  const groupCellHovered = hasRowSpan && isGroupCellHovered(rowIndex, rowSpan)
                  const groupCellSelected = hasRowSpan && isGroupCellSelected(rowIndex, rowSpan)
                  // sticky 스타일 (그룹 셀 선택 상태 전달)
                  const stickyData = getStickyStyles(column, false, isSelected, hasRowSpan ? groupCellSelected : undefined)

                  // 바디 셀 너비 계산 (헤더와 동일한 로직)
                  const toPx = (v: string | number) => typeof v === "number" ? `${v}px` : v
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
                        ref={editingCellRef}
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
                          "group/edit cursor-text hover:bg-blue-100 dark:hover:bg-blue-800",
                          hasRowSpan && "align-middle",
                          stickyData.className
                        )}
                        style={cellStyle}
                        onClick={(e) => {
                          e.stopPropagation()
                          // 이전 셀의 blur 처리가 먼저 완료되어야 함
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

                  // 그룹 셀이 테이블 마지막 행까지 걸쳐있으면 border-b 제외
                  const isGroupSpanToEnd = hasRowSpan && (rowIndex + rowSpan >= data.length)

                  return (
                    <TableCell
                      key={String(column.accessorKey)}
                      className={cn(
                        getAlignClass(column.align),
                        hasRowSpan && "align-middle transition-colors",
                        hasRowSpan && !isGroupSpanToEnd && "border-b border-slate-200 dark:border-slate-700",
                        // 그룹 셀 hover/selected 스타일
                        hasRowSpan && groupCellSelected && "bg-blue-50 dark:bg-blue-900",
                        hasRowSpan && !groupCellSelected && groupCellHovered && "bg-slate-100 dark:bg-slate-800",
                        stickyData.className
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

            return (
              <React.Fragment key={row.id}>
                {rowReorderable ? (
                  <SortableRow
                    id={rowSortableId}
                    isSelected={isSelected}
                    className={cn(onRowClick && "cursor-pointer", rowClassName?.(row))}
                    onClick={() => onRowClick?.(row)}
                    onMouseEnter={rowGrouping ? () => setHoveredRowIndex(rowIndex) : undefined}
                    onMouseLeave={rowGrouping ? () => setHoveredRowIndex(null) : undefined}
                  >
                    {(dragHandleProps) => renderRowCells(dragHandleProps)}
                  </SortableRow>
                ) : (
                  <TableRow
                    data-state={isSelected ? "selected" : undefined}
                    className={cn(
                      onRowClick && "cursor-pointer",
                      middleRowSet?.has(rowIndex) && "border-b-0",
                      rowClassName?.(row)
                    )}
                    onClick={() => onRowClick?.(row)}
                    onMouseEnter={rowGrouping ? () => setHoveredRowIndex(rowIndex) : undefined}
                    onMouseLeave={rowGrouping ? () => setHoveredRowIndex(null) : undefined}
                  >
                    {renderRowCells()}
                  </TableRow>
                )}

                {expandable && isExpanded && (
                  <TableRow className="bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50">
                    <TableCell
                      colSpan={totalColumns}
                      className="p-0"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="p-4 overflow-x-auto"
                        style={{
                          position: "sticky",
                          left: 0,
                          width: "100%",
                          maxWidth: "100vw",
                        }}
                      >
                        {expandable.expandedRowRender(row)}
                      </div>
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

  if (columnReorderable || rowReorderable) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {tableContent}
      </DndContext>
    )
  }

  return tableContent
}

export { DataTable }
