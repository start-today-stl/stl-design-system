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
} from "@/components/table/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { SplashScreen } from "@/components/ui/splash-screen"
import { RightIcon, DownIcon, RowAddIcon } from "@/icons"

import { DataTableBodyRow } from "./data-table-body-row"
import { DataTableColumnHeader } from "./data-table-column-header"
import { useStickyStyles } from "./hooks/use-sticky-styles"
import { useColumnResize } from "./hooks/use-column-resize"
import { useRowGrouping } from "./hooks/use-row-grouping"
import { useColumnReorder } from "./hooks/use-column-reorder"
import { useRowReorder } from "./hooks/use-row-reorder"
import { useCellEditing } from "./hooks/use-cell-editing"
import { useSort } from "./hooks/use-sort"
import { useHeaderGroups } from "./hooks/use-header-groups"
import { getAlignClass as getAlignClassUtil } from "./utils"
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
  type RowActionsConfig,
  type DataTableProps,
} from "./types"

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

// default selectedIds 가 매 render 마다 새 [] 가 되면 row ctx 의 stability 가 깨짐.
// 모듈 레벨 상수로 reference 안정화.
const EMPTY_SELECTED_IDS: readonly (string | number)[] = []

function DataTable<T extends { id: string | number }>({
  columns,
  data,
  selectable = false,
  selectedIds = EMPTY_SELECTED_IDS as (string | number)[],
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

  // 셀 편집 hook
  const {
    editingCell,
    editValue,
    editValueRef,
    editingCellRef,
    setEditingCell,
    setEditValue,
    startEditing,
    completeEditing,
    cancelEditing,
  } = useCellEditing<T>({ columns, data, onCellChange })
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
  // 컬럼 리사이즈 hook
  const {
    resizingColumn,
    getColumnWidth,
    handleResizeStart,
  } = useColumnResize<T>({ resizable, columnWidths, onColumnResize })
  // 컬럼 순서 변경 hook
  const { orderedColumns, handleColumnDragEnd } = useColumnReorder<T>({
    columns,
    columnReorderable,
    columnOrder,
    onColumnReorder,
  })
  // 로우 순서 변경 hook
  const { handleRowDragEnd } = useRowReorder<T>({ data, onRowReorder })
  // 로우 그룹핑용 호버 상태 추적
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState<number | null>(null)

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

  // 정렬 hook (sortStateArray, handleSort, getSortDirection, getSortPriority)
  const { handleSort, getSortDirection, getSortPriority } = useSort<T>({
    sortState,
    onSortChange,
    multiSort,
    shouldWarn,
  })

  // 컬럼 정렬 클래스 (utils의 순수 함수를 직접 참조; useCallback 불필요)
  const getAlignClass = getAlignClassUtil

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

  // 로우 그룹핑 hook (rowSpanMap, middleRowSet, 헬퍼 함수들)
  const {
    middleRowSet,
    getRowSpan,
    isGroupCellHovered,
    isGroupCellSelected,
  } = useRowGrouping<T>({ data, rowGrouping, hoveredRowIndex, selectedIds })

  // sticky 스타일 hook
  const { getStickyStyles, hasLeftStickyColumns } = useStickyStyles<T>({
    columns,
    selectable,
    expandable,
    rowReorderable,
  })

  // 컬럼 헤더 렌더링 함수 (DataTableColumnHeader 컴포넌트로 래핑)
  const renderColumnHeader = (column: DataTableColumn<T>) => (
    <DataTableColumnHeader<T>
      key={String(column.accessorKey)}
      column={column}
      stickyData={getStickyStyles(column, true)}
      alignClass={getAlignClass(column.align)}
      needsRightBorder={columnsWithRightBorder.has(column.accessorKey)}
      resizable={resizable}
      resizedWidth={resizable ? getColumnWidth(column) : undefined}
      isResizing={resizingColumn === column.accessorKey}
      onResizeStart={handleResizeStart}
      columnReorderable={columnReorderable}
      sortDirection={getSortDirection(column.accessorKey)}
      sortPriority={getSortPriority(column.accessorKey)}
      onSort={() => handleSort(column.accessorKey)}
    />
  )

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

  // 헤더 그룹 관련 계산 + 검증 (mixed sticky 경고, colSpan, sticky 스타일, 렌더링 아이템)
  const {
    groupedColumnsSet,
    columnsWithRightBorder,
    getHeaderGroupColSpan,
    getHeaderGroupStickyData,
    headerGroupItems,
  } = useHeaderGroups<T>({
    columns,
    columnsToRender,
    headerGroups,
    getStickyStyles,
    getColumnWidth,
    resizable,
    shouldWarn,
  })

  // DataTableBodyRow에 전달할 테이블 레벨 컨텍스트
  // useMemo로 안정화: deps가 변경되지 않으면 ref 동일 → React.memo가 모든 행 skip 가능
  const rowCtx = React.useMemo(
    () => ({
      columnsToRender,
      rowReorderable,
      selectable,
      expandable: !!expandable,
      showRowDelete,
      hasLeftStickyColumns,
      resizable,
      rowActions,
      rowGrouping,
      middleRowSet,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: rowGrouping ? data.length : 0,
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
      setEditValue: setEditValue as (v: T[keyof T] | null) => void,
      setEditingCell,
      editValueRef: editValueRef as React.MutableRefObject<unknown>,
      editingCellRef,
      onCellChange,
      onRowClick,
      rowClassName,
      setHoveredRowIndex,
    }),
    [
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
      rowGrouping ? data.length : 0,
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
      editValueRef,
      editingCellRef,
      onCellChange,
      onRowClick,
      rowClassName,
      setHoveredRowIndex,
    ],
  )

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
                      isSelected={selectedIds.includes(row.id)}
                      canExpand={isRowExpandable(row)}
                      isExpanded={isExpanded}
                      editingCell={editingCell}
                      editValue={editValue}
                      ctx={rowCtx}
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
                    isSelected={selectedIds.includes(row.id)}
                    canExpand={isRowExpandable(row)}
                    isExpanded={isExpanded}
                    editingCell={editingCell}
                    editValue={editValue}
                    ctx={rowCtx}
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
