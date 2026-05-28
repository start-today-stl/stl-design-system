import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

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
import { Skeleton } from "@/components/ui/skeleton"
import { SplashScreen } from "@/components/ui/splash-screen"
import { RightIcon, DownIcon, RowAddIcon } from "@/icons"

import { SortableHeaderCell } from "./data-table/sortable-header-cell"
import { DataTableBodyRow } from "./data-table/data-table-body-row"
import {
  DRAG_HANDLE_WIDTH,
  CHECKBOX_WIDTH,
  EXPAND_WIDTH,
  ROW_ACTIONS_WIDTH,
  type EditComponentProps,
  type ValidationResult,
  type DataTableColumn,
  type HeaderGroup,
  type RowGroupConfig,
  type SortState,
  type ExpandableConfig,
  type EditingCell,
  type RowActionsConfig,
  type DataTableProps,
} from "./data-table/types"

// 기존 export 호환성 유지 (외부 사용처에서 import)
export type {
  EditComponentProps,
  ValidationResult,
  DataTableColumn,
  HeaderGroup,
  RowGroupConfig,
  SortState,
  ExpandableConfig,
  RowActionsConfig,
  DataTableProps,
}

function DataTable<T extends { id: string | number }>({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  sortState,
  onSortChange,
  multiSort = false,
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
  loadingMode = "splash",
  loadingContent,
  headerGroups,
  rowGrouping,
  rowActions,
}: DataTableProps<T>) {
  // rowGrouping과 rowReorderable은 함께 사용할 수 없음 (rowSpan 셀 드래그 시 레이아웃 깨짐)
  const rowReorderable = rowGrouping ? false : rowReorderableProp
  const shouldWarn =
    typeof process !== "undefined"
      ? process.env.NODE_ENV !== "production"
      : false

  React.useEffect(() => {
    if (shouldWarn && rowGrouping && rowReorderableProp) {
      console.warn(
        "[DataTable] rowGrouping과 rowReorderable은 함께 사용할 수 없습니다. " +
        "rowSpan 셀이 있는 행을 드래그하면 레이아웃이 깨지므로 rowReorderable이 무시됩니다."
      )
    }
  }, [rowGrouping, rowReorderableProp, shouldWarn])

  React.useEffect(() => {
    if (shouldWarn && loadingContent && loadingMode !== "splash") {
      console.warn(
        "[DataTable] loadingContent와 loadingMode가 함께 전달되었습니다. loadingContent가 우선 적용됩니다."
      )
    }
  }, [loadingContent, loadingMode, shouldWarn])

  const [editingCell, setEditingCell] = React.useState<EditingCell<T> | null>(null)
  const [editValue, setEditValue] = React.useState<T[keyof T] | null>(null)
  // stale closure 방지용 ref
  const editValueRef = React.useRef<T[keyof T] | null>(null)
  // 바깥 클릭 감지용 ref
  const editingCellRef = React.useRef<HTMLTableCellElement>(null)
  // 스크롤 컨테이너 ref + 가시 영역 너비 추적 (empty/loading 셀 중앙 정렬용)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [visibleWidth, setVisibleWidth] = React.useState<number>(0)
  React.useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const update = () => setVisibleWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
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

  // headerGroups + sticky 제약: 그룹 내 sticky 구성이 혼합되면 1행 그룹 헤더 sticky 불가
  const mixedStickyHeaderGroups = React.useMemo(() => {
    if (!headerGroups || headerGroups.length === 0) return []

    const columnMap = new Map<keyof T, DataTableColumn<T>>(
      columns.map((col) => [col.accessorKey, col])
    )

    return headerGroups.flatMap((group, groupIndex) => {
      const groupColumns = group.columns
        .map((columnKey) => columnMap.get(columnKey))
        .filter((col): col is DataTableColumn<T> => col !== undefined)

      if (groupColumns.length === 0) return []

      const stickyDirections = new Set(
        groupColumns
          .map((col) => col.sticky)
          .filter((direction): direction is "left" | "right" => direction !== undefined)
      )

      const hasSticky = stickyDirections.size > 0
      const hasNonSticky = groupColumns.some((col) => !col.sticky)
      const hasMixedStickyDirection = stickyDirections.size > 1
      const isMixedStickyConfig = hasSticky && (hasNonSticky || hasMixedStickyDirection)

      if (!isMixedStickyConfig) return []

      const headerLabel =
        typeof group.header === "string" || typeof group.header === "number"
          ? String(group.header)
          : `#${groupIndex + 1}`

      return [
        {
          headerLabel,
          reason: hasMixedStickyDirection
            ? "left/right sticky 혼합"
            : "sticky/non-sticky 혼합",
        },
      ]
    })
  }, [headerGroups, columns])

  const mixedStickyWarningKey = React.useMemo(
    () =>
      mixedStickyHeaderGroups
        .map((group) => `${group.headerLabel}:${group.reason}`)
        .join("|"),
    [mixedStickyHeaderGroups]
  )
  const mixedStickyWarnedKeyRef = React.useRef("")

  React.useEffect(() => {
    if (!shouldWarn) return
    if (!mixedStickyWarningKey) {
      mixedStickyWarnedKeyRef.current = ""
      return
    }
    if (mixedStickyWarnedKeyRef.current === mixedStickyWarningKey) return
    mixedStickyWarnedKeyRef.current = mixedStickyWarningKey

    const groupSummary = mixedStickyHeaderGroups
      .map((group) => `${group.headerLabel}(${group.reason})`)
      .join(", ")

    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. " +
      "그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + groupSummary
    )
  }, [mixedStickyWarningKey, mixedStickyHeaderGroups, shouldWarn])

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

  const handleSelectRow = React.useCallback((id: string | number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange?.(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange?.([...selectedIds, id])
    }
  }, [selectedIds, onSelectionChange])

  // sortState 정규화 (유효한 항목만)
  const sortStateArray: SortState<T>[] = React.useMemo(() => {
    if (!sortState) return []
    return sortState.filter((s) => s.column && s.direction)
  }, [sortState])

  const handleSort = (column: keyof T) => {
    if (!onSortChange) return

    const existing = sortStateArray.find((s) => s.column === column)

    if (multiSort) {
      // 다중 정렬 모드: 클릭으로 정렬 추가/순환
      let newArr: SortState<T>[]
      if (!existing) {
        newArr = [...sortStateArray, { column, direction: "asc" }]
      } else if (existing.direction === "asc") {
        newArr = sortStateArray.map((s) =>
          s.column === column ? { column, direction: "desc" as SortDirection } : s
        )
      } else {
        // desc → 해당 컬럼만 제거
        newArr = sortStateArray.filter((s) => s.column !== column)
      }
      onSortChange(newArr)
    } else {
      // 단일 정렬 모드: 그 컬럼만 정렬, asc→desc→해제 순환
      let next: SortState<T>[]
      if (existing) {
        if (existing.direction === "asc") {
          next = [{ column, direction: "desc" }]
        } else if (existing.direction === "desc") {
          next = []
        } else {
          next = [{ column, direction: "asc" }]
        }
      } else {
        next = [{ column, direction: "asc" }]
      }
      onSortChange(next)
    }
  }

  const getSortDirection = (column: keyof T): SortDirection => {
    const found = sortStateArray.find((s) => s.column === column)
    return found?.direction ?? null
  }

  // 다중 정렬 시 우선순위 번호 (1부터 시작, 단일 정렬이거나 정렬 없으면 undefined)
  const getSortPriority = (column: keyof T): number | undefined => {
    if (!multiSort || sortStateArray.length <= 1) return undefined
    const idx = sortStateArray.findIndex((s) => s.column === column)
    return idx === -1 ? undefined : idx + 1
  }

  const getAlignClass = React.useCallback((align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }, [])

  const startEditing = React.useCallback((rowId: string | number, columnKey: keyof T, currentValue: T[keyof T]) => {
    setEditingCell({ rowId, columnKey })
    setEditValue(currentValue)
    editValueRef.current = currentValue
  }, [])

  const completeEditing = React.useCallback((column: DataTableColumn<T>, row: T) => {
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
  }, [editingCell, onCellChange])

  // editingCell에서 column/row를 찾아서 completeEditing 호출
  const completeEditingFromState = React.useCallback(() => {
    if (!editingCell) return
    const column = columns.find((col) => col.accessorKey === editingCell.columnKey)
    const row = data.find((r) => r.id === editingCell.rowId)
    if (column && row) {
      completeEditing(column, row)
    } else {
      // column/row를 못 찾으면 값만 커밋 (유효성 검증 없이)
      const currentValue = editValueRef.current
      if (currentValue !== null && onCellChange) {
        onCellChange(editingCell.rowId, editingCell.columnKey, currentValue)
      }
      setEditingCell(null)
      setEditValue(null)
      editValueRef.current = null
    }
  }, [editingCell, columns, data, onCellChange])

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
      // blur 시 저장 (Escape만 취소)
      completeEditingFromState()
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [editingCell, completeEditingFromState])


  const isRowExpandable = React.useCallback((row: T) => {
    if (!expandable) return false
    if (expandable.rowExpandable) return expandable.rowExpandable(row)
    return true
  }, [expandable])

  const isRowExpanded = React.useCallback((rowId: string | number) => {
    return expandedRowIds.includes(rowId)
  }, [expandedRowIds])

  const toggleRowExpanded = React.useCallback((rowId: string | number) => {
    if (expandedRowIds.includes(rowId)) {
      setExpandedRowIds(expandedRowIds.filter((id) => id !== rowId))
    } else {
      setExpandedRowIds([...expandedRowIds, rowId])
    }
  }, [expandedRowIds, setExpandedRowIds])

  // 전체 펼침/접힘 관련
  const expandableRowIds = React.useMemo(() => {
    if (!expandable) return []
    return data.filter((row) => isRowExpandable(row)).map((row) => row.id)
  }, [data, expandable])

  const isAllExpanded = expandableRowIds.length > 0 &&
    expandableRowIds.every((id) => expandedRowIds.includes(id))

  const handleExpandAll = () => {
    if (isAllExpanded) {
      // 모두 접기
      setExpandedRowIds([])
    } else {
      // 모두 펼치기
      setExpandedRowIds(expandableRowIds)
    }
  }

  // rowActions 설정
  const showRowDelete = rowActions?.showDelete ?? !!rowActions?.onRowDelete
  const showRowAdd = rowActions?.showAdd ?? !!rowActions?.onRowAdd

  const totalColumns = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowReorderable ? 1 : 0) + (showRowDelete ? 1 : 0)

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
  const getRowSpan = React.useCallback((rowIndex: number, columnKey: keyof T): number | undefined => {
    if (!rowSpanMap) return undefined
    const rowMap = rowSpanMap.get(rowIndex)
    if (!rowMap) return undefined
    return rowMap.get(columnKey)
  }, [rowSpanMap])

  // 그룹 셀이 속한 행 범위 내에 호버된 행이 있는지 확인
  const isGroupCellHovered = React.useCallback((rowIndex: number, rowSpan: number): boolean => {
    if (hoveredRowIndex === null) return false
    return hoveredRowIndex >= rowIndex && hoveredRowIndex < rowIndex + rowSpan
  }, [hoveredRowIndex])

  // 그룹 셀이 속한 행 범위 내에 선택된 행이 있는지 확인
  const isGroupCellSelected = React.useCallback((rowIndex: number, rowSpan: number): boolean => {
    for (let i = rowIndex; i < rowIndex + rowSpan; i++) {
      if (i < data.length && selectedIds.includes(data[i].id)) {
        return true
      }
    }
    return false
  }, [data, selectedIds])

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
    return (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => {
      if (!column.sticky) return { style: {}, className: "" }

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
              ? "bg-slate-100 dark:bg-slate-800"
              : effectiveSelected
                ? "bg-blue-50 dark:bg-blue-900"
                : "bg-slate-100 dark:bg-slate-800",
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
            ? "bg-slate-100 dark:bg-slate-800"
            : effectiveSelected
              ? "bg-blue-50 dark:bg-blue-900"
              : "bg-slate-100 dark:bg-slate-800",
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

    // 그룹 구분선 클래스 (그룹 경계 컬럼에 적용)
    const needsRightBorder = columnsWithRightBorder.has(column.accessorKey)
    const groupBorderClass = needsRightBorder && "border-r border-slate-200 dark:border-slate-700"

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
          className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible", groupBorderClass)}
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
          sortPriority={getSortPriority(column.accessorKey)}
          onSort={() => handleSort(column.accessorKey)}
          style={style}
          className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible", groupBorderClass)}
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
        className={cn(getAlignClass(column.align), stickyData.className, resizable && "relative overflow-visible", groupBorderClass)}
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
  const getDragHandleHeaderLeftOffset = React.useCallback(() => 0, [])
  // 체크박스 헤더 sticky left 위치 계산
  const getCheckboxHeaderLeftOffset = React.useCallback(
    () => rowReorderable ? DRAG_HANDLE_WIDTH : 0,
    [rowReorderable]
  )
  // 확장 버튼 헤더 sticky left 위치 계산
  const getExpandHeaderLeftOffset = React.useCallback(() => {
    let offset = 0
    if (rowReorderable) offset += DRAG_HANDLE_WIDTH
    if (selectable) offset += CHECKBOX_WIDTH
    return offset
  }, [rowReorderable, selectable])

  // 헤더 그룹의 colSpan 계산 (실제 렌더링되는 그룹 컬럼 전체)
  const getHeaderGroupColSpan = React.useCallback(
    (group: HeaderGroup<T>): number => {
      // 실제 렌더링되는 컬럼 순서에서 해당 그룹에 속한 컬럼 수 계산
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

  // 구분선이 필요한 컬럼들 (그룹 경계 또는 단일↔그룹 경계)
  const columnsWithRightBorder = React.useMemo(() => {
    if (!headerGroups || headerGroups.length === 0) return new Set<keyof T>()
    const borderCols = new Set<keyof T>()

    // 컬럼이 어느 그룹에 속하는지 찾는 헬퍼
    const getGroupIndex = (col: DataTableColumn<T>) => {
      return headerGroups.findIndex(g => g.columns.includes(col.accessorKey))
    }

    // 그룹에 속한 컬럼들만 필터링
    const groupedCols = columnsToRender.filter(col => groupedColumnsSet.has(col.accessorKey))

    for (let i = 0; i < groupedCols.length - 1; i++) {
      const currentCol = groupedCols[i]
      const nextCol = groupedCols[i + 1]
      const currentGroupIdx = getGroupIndex(currentCol)
      const nextGroupIdx = getGroupIndex(nextCol)

      // 다른 그룹으로 넘어가면 구분선 추가
      if (currentGroupIdx !== nextGroupIdx) {
        borderCols.add(currentCol.accessorKey)
      }
    }

    return borderCols
  }, [headerGroups, columnsToRender, groupedColumnsSet])

  // 헤더 그룹 셀이 sticky 가능하면(그룹 내 컬럼이 모두 같은 방향 sticky) sticky 적용
  const getHeaderGroupStickyData = React.useCallback(
    (group: HeaderGroup<T>): { style: React.CSSProperties; className: string } => {
      const groupCols = columnsToRender.filter((col) => group.columns.includes(col.accessorKey))
      if (groupCols.length === 0) return { style: {}, className: "" }

      const allLeftSticky = groupCols.every((col) => col.sticky === "left")
      const allRightSticky = groupCols.every((col) => col.sticky === "right")
      if (!allLeftSticky && !allRightSticky) return { style: {}, className: "" }

      const anchorColumn = allLeftSticky
        ? groupCols[0]
        : groupCols[groupCols.length - 1]
      const anchorSticky = getStickyStyles(anchorColumn, true)

      const getNumericWidth = (col: DataTableColumn<T>) => {
        const resizedWidth = resizable ? getColumnWidth(col) : undefined
        if (resizedWidth !== undefined) return resizedWidth
        const width = col.width ?? col.minWidth
        if (typeof width === "number") return width
        const parsed = parseInt(String(width), 10)
        return Number.isFinite(parsed) ? parsed : 150
      }
      const totalWidth = groupCols.reduce((sum, col) => sum + getNumericWidth(col), 0)
      const widthPx = `${totalWidth}px`

      return {
        style: {
          ...anchorSticky.style,
          width: widthPx,
          minWidth: widthPx,
          maxWidth: widthPx,
        },
        className: anchorSticky.className,
      }
    },
    [columnsToRender, getStickyStyles, getColumnWidth, resizable]
  )

  // 헤더 그룹 행에 렌더링할 아이템들 (standalone 또는 group) - 미리 계산
  type HeaderItem =
    | { type: "standalone"; col: DataTableColumn<T> }
    | { type: "group"; group: HeaderGroup<T> }
  const headerGroupItems = React.useMemo<HeaderItem[]>(() => {
    if (!headerGroups || headerGroups.length === 0) return []
    const items: HeaderItem[] = []
    const processedGroups = new Set<number>()

    for (const col of columnsToRender) {
      const groupIndex = headerGroups.findIndex(g => g.columns.includes(col.accessorKey))
      if (groupIndex !== -1) {
        if (!processedGroups.has(groupIndex)) {
          processedGroups.add(groupIndex)
          items.push({ type: "group", group: headerGroups[groupIndex] })
        }
      } else {
        items.push({ type: "standalone", col })
      }
    }
    return items
  }, [headerGroups, columnsToRender])

  const tableContent = (
    <Table className={className} maxHeight={maxHeight} wrapperRef={scrollContainerRef}>
      <TableHeader>
        {/* 헤더 그룹 행 (headerGroups가 있을 때만 렌더링) */}
        {headerGroups && headerGroups.length > 0 && (
          <TableRow>
            {/* 드래그 핸들, 체크박스, 확장 버튼 컬럼용 빈 셀 */}
            {rowReorderable && (
              <TableHead
                className="!p-0 bg-slate-100 dark:bg-slate-800"
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
                className="!p-0 bg-slate-100 dark:bg-slate-800"
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
                className="bg-slate-100 dark:bg-slate-800 !p-0"
                rowSpan={2}
                style={{
                  width: `${EXPAND_WIDTH}px`,
                  minWidth: `${EXPAND_WIDTH}px`,
                  ...(hasLeftStickyColumns && { position: "sticky", left: getExpandHeaderLeftOffset(), zIndex: 20 }),
                }}
              >
                {expandable?.showExpandAll !== false && expandableRowIds.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExpandAll}
                    className="flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    aria-label={isAllExpanded ? "모두 접기" : "모두 펼치기"}
                  >
                    {isAllExpanded ? (
                      <DownIcon size={24} />
                    ) : (
                      <RightIcon size={24} />
                    )}
                  </button>
                )}
              </TableHead>
            )}
            {/* 행 삭제 액션 컬럼 헤더 (headerGroups) */}
            {showRowDelete && (
              <TableHead
                className="!p-0 bg-slate-100 dark:bg-slate-800 border-b-0"
                rowSpan={2}
                style={{
                  width: `${ROW_ACTIONS_WIDTH}px`,
                  minWidth: `${ROW_ACTIONS_WIDTH}px`,
                  maxWidth: `${ROW_ACTIONS_WIDTH}px`,
                }}
                aria-label="행 삭제"
              >
                <span className="sr-only">행 삭제</span>
              </TableHead>
            )}

            {/* 헤더 그룹과 독립 컬럼들 렌더링 */}
            {headerGroupItems.map((item, idx) => {
              // 그룹↔그룹 사이에만 구분선 (단일 컬럼은 구분선 없음)
              const nextItem = headerGroupItems[idx + 1]
              const needsBorder = item.type === "group" && nextItem?.type === "group"

              if (item.type === "group") {
                const colSpan = getHeaderGroupColSpan(item.group)
                // colSpan이 0이면 렌더링 대상 컬럼이 없는 그룹이므로 스킵
                if (colSpan === 0) return null

                // 그룹 내 sticky 구성 확인 - 혼합되면 세그먼트로 분할
                const groupCols = columnsToRender.filter((col) =>
                  item.group.columns.includes(col.accessorKey)
                )
                const stickyDirections = new Set(
                  groupCols.map((c) => c.sticky ?? "none")
                )
                const isMixed = stickyDirections.size > 1

                if (isMixed) {
                  // 연속된 sticky 방향끼리 세그먼트로 분할
                  type Segment = { cols: DataTableColumn<T>[]; sticky?: "left" | "right" }
                  const segments: Segment[] = []
                  let currentCols: DataTableColumn<T>[] = []
                  let currentSticky: "left" | "right" | undefined = groupCols[0].sticky
                  for (const col of groupCols) {
                    if (col.sticky === currentSticky) {
                      currentCols.push(col)
                    } else {
                      if (currentCols.length > 0) {
                        segments.push({ cols: currentCols, sticky: currentSticky })
                      }
                      currentCols = [col]
                      currentSticky = col.sticky
                    }
                  }
                  if (currentCols.length > 0) {
                    segments.push({ cols: currentCols, sticky: currentSticky })
                  }

                  // 헤더 텍스트는 첫 번째 non-sticky 세그먼트에 표시 (없으면 첫 세그먼트)
                  const firstNonStickyIdx = segments.findIndex((s) => !s.sticky)
                  const headerSegIdx = firstNonStickyIdx !== -1 ? firstNonStickyIdx : 0

                  return segments.map((seg, segIdx) => {
                    const subGroup: HeaderGroup<T> = {
                      header: item.group.header,
                      columns: seg.cols.map((c) => c.accessorKey),
                      align: item.group.align,
                    }
                    const subStickyData = seg.sticky
                      ? getHeaderGroupStickyData(subGroup)
                      : { style: {}, className: "" }
                    const isSubSticky = !!subStickyData.style.position
                    return (
                      <TableHead
                        key={`group-${String(item.group.columns[0])}-seg-${segIdx}`}
                        colSpan={seg.cols.length}
                        className={cn(
                          "text-center font-medium bg-slate-100 dark:bg-slate-800",
                          item.group.align === "left" && "text-left",
                          item.group.align === "right" && "text-right",
                          needsBorder && segIdx === segments.length - 1 && "border-r border-slate-200 dark:border-slate-700",
                          subStickyData.className
                        )}
                        style={
                          isSubSticky
                            ? subStickyData.style
                            : { position: "relative", zIndex: 0 }
                        }
                      >
                        {segIdx === headerSegIdx ? item.group.header : null}
                      </TableHead>
                    )
                  })
                }

                const groupStickyData = getHeaderGroupStickyData(item.group)
                const isGroupSticky = !!groupStickyData.style.position
                return (
                  <TableHead
                    key={`group-${String(item.group.columns[0])}`}
                    colSpan={colSpan}
                    className={cn(
                      "text-center font-medium bg-slate-100 dark:bg-slate-800",
                      item.group.align === "left" && "text-left",
                      item.group.align === "right" && "text-right",
                      needsBorder && "border-r border-slate-200 dark:border-slate-700",
                      groupStickyData.className
                    )}
                    style={
                      isGroupSticky
                        ? groupStickyData.style
                        : { position: "relative", zIndex: 0 }
                    }
                  >
                    {item.group.header}
                  </TableHead>
                )
              } else {
                // standalone
                const stickyData = getStickyStyles(item.col, true)
                if (item.col.sortable) {
                  return (
                    <TableSortableHead
                      key={`standalone-${String(item.col.accessorKey)}`}
                      rowSpan={2}
                      sortDirection={getSortDirection(item.col.accessorKey)}
                      sortPriority={getSortPriority(item.col.accessorKey)}
                      onSort={() => handleSort(item.col.accessorKey)}
                      className={cn(
                        getAlignClass(item.col.align),
                        "bg-slate-100 dark:bg-slate-800",
                        stickyData.className
                      )}
                      style={stickyData.style}
                    >
                      {item.col.header}
                    </TableSortableHead>
                  )
                }
                return (
                  <TableHead
                    key={`standalone-${String(item.col.accessorKey)}`}
                    rowSpan={2}
                    className={cn(
                      getAlignClass(item.col.align),
                      "bg-slate-100 dark:bg-slate-800",
                      stickyData.className
                    )}
                    style={stickyData.style}
                  >
                    {item.col.header}
                  </TableHead>
                )
              }
            })}
          </TableRow>
        )}

        {/* 메인 헤더 행 */}
        <TableRow>
          {/* headerGroups가 없을 때만 보조 컬럼 헤더(드래그/체크박스/확장/행삭제)를 렌더링 */}
          {!headerGroups && rowReorderable && (
            <TableHead
              className="!p-0 bg-slate-100 dark:bg-slate-800"
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
              className="!p-0 bg-slate-100 dark:bg-slate-800"
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
              className="bg-slate-100 dark:bg-slate-800 !p-0"
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
              {expandable?.showExpandAll !== false && expandableRowIds.length > 0 ? (
                <button
                  type="button"
                  onClick={handleExpandAll}
                  className="flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label={isAllExpanded ? "모두 접기" : "모두 펼치기"}
                >
                  {isAllExpanded ? (
                    <DownIcon size={24} />
                  ) : (
                    <RightIcon size={24} />
                  )}
                </button>
              ) : (
                <span className="sr-only">확장</span>
              )}
            </TableHead>
          )}

          {/* 행 삭제 액션 컬럼 헤더 */}
          {!headerGroups && showRowDelete && (
            <TableHead
              className="!p-0 bg-slate-100 dark:bg-slate-800"
              style={{
                width: `${ROW_ACTIONS_WIDTH}px`,
                minWidth: `${ROW_ACTIONS_WIDTH}px`,
                maxWidth: `${ROW_ACTIONS_WIDTH}px`,
              }}
              aria-label="행 삭제"
            >
              <span className="sr-only">행 삭제</span>
            </TableHead>
          )}

          {/* headerGroups가 있으면 그룹에 속한 컬럼만 2행(메인 헤더)에 렌더링 */}
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
              className={cn(
                "text-center",
                loadingContent || loadingMode !== "skeleton" ? "h-80" : "p-0 align-top"
              )}
            >
              {loadingContent ? (
                // 커스텀 로딩 - 가로 스크롤 시 가시 영역 중앙에 표시
                <div
                  className="sticky left-0 flex items-center justify-center h-full"
                  style={visibleWidth ? { width: visibleWidth } : undefined}
                >
                  {loadingContent}
                </div>
              ) : (
                loadingMode === "skeleton" ? (
                  // 스켈레톤 모드: 컬럼 기반 자동 생성
                  (() => {
                    const ROW_HEIGHT = 41
                    // maxHeight가 있으면 그걸 기준으로, 없으면 기본 로딩 영역 높이 사용
                    const containerHeight = typeof maxHeight === "number"
                      ? maxHeight
                      : typeof maxHeight === "string"
                        ? parseInt(maxHeight, 10) || 320
                        : 320
                    const skeletonRowCount = Math.max(1, Math.floor(containerHeight / ROW_HEIGHT))

                    return (
                      <table className="w-full">
                        <tbody>
                          {Array.from({ length: skeletonRowCount }).map((_, rowIdx) => (
                            <tr
                              key={rowIdx}
                              className="border-b border-slate-200 dark:border-slate-700 last:border-b-0"
                            >
                              {/* 드래그 핸들 */}
                              {rowReorderable && (
                                <td className="w-8 p-2">
                                  <Skeleton width={16} height={16} />
                                </td>
                              )}
                              {/* 체크박스 */}
                              {selectable && (
                                <td className="w-10 p-2">
                                  <Skeleton width={18} height={18} />
                                </td>
                              )}
                              {/* 확장 버튼 */}
                              {expandable && (
                                <td className="w-10 p-2">
                                  <Skeleton width={18} height={18} />
                                </td>
                              )}
                              {/* 컬럼별 스켈레톤 */}
                              {columnsToRender.map((col) => {
                                const colWidth = col.width ?? col.minWidth
                                const skeletonWidth = typeof colWidth === "number"
                                  ? Math.min(colWidth * 0.6, 150)
                                  : 100
                                return (
                                  <td key={String(col.accessorKey)} className="p-2">
                                    <Skeleton height={16} width={skeletonWidth} />
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  })()
                ) : (
                  // 스플래시 모드 (기본) - 가로 스크롤 시 가시 영역 중앙에 표시
                  <div
                    className="sticky left-0 flex items-center justify-center h-full"
                    style={visibleWidth ? { width: visibleWidth } : undefined}
                  >
                    <SplashScreen size="lg" />
                  </div>
                )
              )}
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow className="hover:bg-white dark:hover:bg-slate-900">
            <TableCell
              colSpan={totalColumns}
              className="h-24 p-0 text-slate-500"
            >
              {/* 가로 스크롤 시 가시 영역 중앙에 표시 */}
              <div
                className="sticky left-0 flex items-center justify-center h-24 text-center"
                style={visibleWidth ? { width: visibleWidth } : undefined}
              >
                {emptyMessage}
              </div>
            </TableCell>
          </TableRow>
        ) : (
          rowReorderable ? (
            <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
              {data.map((row, rowIndex) => {
                const isExpanded = isRowExpanded(row.id)
                return (
                  <React.Fragment key={row.id}>
                    <DataTableBodyRow<T>
                      row={row}
                      rowIndex={rowIndex}
                      dataLength={data.length}
                      isSelected={selectedIds.includes(row.id)}
                      canExpand={isRowExpandable(row)}
                      isExpanded={isExpanded}
                      editingCell={editingCell}
                      editValue={editValue}
                      editValueRef={editValueRef as React.MutableRefObject<unknown>}
                      editingCellRef={editingCellRef}
                      columnsToRender={columnsToRender}
                      rowReorderable={true}
                      selectable={selectable}
                      expandable={!!expandable}
                      showRowDelete={showRowDelete}
                      hasLeftStickyColumns={hasLeftStickyColumns}
                      resizable={resizable}
                      rowActions={rowActions}
                      rowGrouping={rowGrouping}
                      middleRowSet={middleRowSet}
                      getCheckboxHeaderLeftOffset={getCheckboxHeaderLeftOffset}
                      getExpandHeaderLeftOffset={getExpandHeaderLeftOffset}
                      getRowSpan={getRowSpan}
                      isGroupCellHovered={isGroupCellHovered}
                      isGroupCellSelected={isGroupCellSelected}
                      getStickyStyles={getStickyStyles}
                      getColumnWidth={getColumnWidth}
                      getAlignClass={getAlignClass}
                      handleSelectRow={handleSelectRow}
                      toggleRowExpanded={toggleRowExpanded}
                      startEditing={startEditing}
                      completeEditing={completeEditing}
                      cancelEditing={cancelEditing}
                      setEditValue={setEditValue as (v: T[keyof T] | null) => void}
                      setEditingCell={setEditingCell}
                      onCellChange={onCellChange}
                      onRowClick={onRowClick}
                      rowClassName={rowClassName}
                      setHoveredRowIndex={setHoveredRowIndex}
                    />
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
                              width: visibleWidth ? `${visibleWidth}px` : "100%",
                              maxWidth: "100%",
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
              const isExpanded = isRowExpanded(row.id)
              return (
                <React.Fragment key={row.id}>
                  <DataTableBodyRow<T>
                    row={row}
                    rowIndex={rowIndex}
                    dataLength={data.length}
                    isSelected={selectedIds.includes(row.id)}
                    canExpand={isRowExpandable(row)}
                    isExpanded={isExpanded}
                    editingCell={editingCell}
                    editValue={editValue}
                    editValueRef={editValueRef as React.MutableRefObject<unknown>}
                    editingCellRef={editingCellRef}
                    columnsToRender={columnsToRender}
                    rowReorderable={false}
                    selectable={selectable}
                    expandable={!!expandable}
                    showRowDelete={showRowDelete}
                    hasLeftStickyColumns={hasLeftStickyColumns}
                    resizable={resizable}
                    rowActions={rowActions}
                    rowGrouping={rowGrouping}
                    middleRowSet={middleRowSet}
                    getCheckboxHeaderLeftOffset={getCheckboxHeaderLeftOffset}
                    getExpandHeaderLeftOffset={getExpandHeaderLeftOffset}
                    getRowSpan={getRowSpan}
                    isGroupCellHovered={isGroupCellHovered}
                    isGroupCellSelected={isGroupCellSelected}
                    getStickyStyles={getStickyStyles}
                    getColumnWidth={getColumnWidth}
                    getAlignClass={getAlignClass}
                    handleSelectRow={handleSelectRow}
                    toggleRowExpanded={toggleRowExpanded}
                    startEditing={startEditing}
                    completeEditing={completeEditing}
                    cancelEditing={cancelEditing}
                    setEditValue={setEditValue as (v: T[keyof T] | null) => void}
                    setEditingCell={setEditingCell}
                    onCellChange={onCellChange}
                    onRowClick={onRowClick}
                    rowClassName={rowClassName}
                    setHoveredRowIndex={setHoveredRowIndex}
                  />
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
                            width: visibleWidth ? `${visibleWidth}px` : "100%",
                            maxWidth: "100%",
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
          )
        )}

        {/* 행 추가 버튼 행 */}
        {showRowAdd && !loading && (
          <TableRow className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-0">
            {/* 드래그 핸들 빈 셀 */}
            {rowReorderable && (
              <TableCell
                className="!p-0"
                style={{
                  width: `${DRAG_HANDLE_WIDTH}px`,
                  minWidth: `${DRAG_HANDLE_WIDTH}px`,
                  maxWidth: `${DRAG_HANDLE_WIDTH}px`,
                }}
              />
            )}
            {/* 체크박스 빈 셀 */}
            {selectable && (
              <TableCell
                className="!p-0"
                style={{
                  width: `${CHECKBOX_WIDTH}px`,
                  minWidth: `${CHECKBOX_WIDTH}px`,
                  maxWidth: `${CHECKBOX_WIDTH}px`,
                }}
              />
            )}
            {/* 확장 버튼 빈 셀 */}
            {expandable && (
              <TableCell
                className="!p-0"
                style={{
                  width: `${EXPAND_WIDTH}px`,
                  minWidth: `${EXPAND_WIDTH}px`,
                  maxWidth: `${EXPAND_WIDTH}px`,
                }}
              />
            )}
            {/* 행 추가 버튼 셀 */}
            <TableCell
              className="!p-0"
              style={{
                width: `${ROW_ACTIONS_WIDTH}px`,
                minWidth: `${ROW_ACTIONS_WIDTH}px`,
                maxWidth: `${ROW_ACTIONS_WIDTH}px`,
              }}
            >
              <button
                type="button"
                onClick={() => rowActions?.onRowAdd?.()}
                className="flex h-9 w-10 items-center justify-center transition-opacity hover:opacity-70"
                aria-label="행 추가"
              >
                <RowAddIcon size={20} />
              </button>
            </TableCell>
            {/* 나머지 컬럼 빈 셀 */}
            {columnsToRender.map((column) => (
              <TableCell
                key={String(column.accessorKey)}
                className="!p-0"
              />
            ))}
          </TableRow>
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
