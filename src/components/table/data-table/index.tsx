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
import { DataTableExpandedRow } from "./data-table-expanded-row"
import { useStickyStyles } from "./hooks/use-sticky-styles"
import { useColumnResize } from "./hooks/use-column-resize"
import { useRowGrouping, type GroupCellFlags } from "./hooks/use-row-grouping"
import { useColumnReorder } from "./hooks/use-column-reorder"
import { useRowReorder } from "./hooks/use-row-reorder"
import { useCellEditing } from "./hooks/use-cell-editing"
import { useSort } from "./hooks/use-sort"
import { useHeaderGroups } from "./hooks/use-header-groups"
import { useTableVirtualizer } from "./hooks/use-table-virtualizer"
import { useStableCallback } from "./hooks/use-stable-callback"
import { useStableObject } from "./hooks/use-stable-object"
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

/**
 * 정렬 / 필터 / 선택 / 편집 / 펼침 / 그룹핑 / 가상화 등을 지원하는 데이터 테이블.
 *
 * ## prop 안정성 가이드
 *
 * 큰 데이터셋 (수백~수만 행) 에서 부드러운 인터랙션을 보장하려면 일부 prop 을 안정된
 * reference 로 전달해야 합니다.
 *
 * - **columns**: 컴포넌트 외부 const 로 정의하거나 `useMemo` 로 감싸세요.
 *   매 render 마다 새 배열을 넘기면 모든 행이 리렌더되어 성능이 저하됩니다.
 * - **data**: `useState` 또는 `useMemo` 로 안정 ref 를 유지하세요.
 *   (정렬/필터링으로 의미 있게 변경되는 건 정상)
 * - **rowGrouping / expandable / 콜백 props**: 내부에서 흡수하므로 inline 으로 넘겨도 안전합니다.
 *
 * ```tsx
 * // ✅ 권장
 * const columns = useMemo(() => [...], [])
 * const [data, setData] = useState([...])
 * <DataTable columns={columns} data={data} onRowClick={(row) => doSomething(row)} />
 *
 * // ❌ 비권장 (모든 행 리렌더)
 * <DataTable columns={[...]} data={[...]} />
 * ```
 */
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
  expandable: expandableProp,
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
  rowGrouping: rowGroupingProp,
  rowActions,
  virtual,
}: DataTableProps<T>) {
  // 사용자 prop 중 작은 객체는 deep compare 로 흡수해 inline 사용 시에도 ctx 안정 유지.
  // (큰 배열인 columns/data 는 deep compare 비용이 커서 사용처 책임 — dev 경고로 알림)
  const rowGrouping = useStableObject(rowGroupingProp)
  const expandable = useStableObject(expandableProp)

  // rowGrouping과 rowReorderable은 함께 사용할 수 없음 (rowSpan 셀 드래그 시 레이아웃 깨짐)
  const rowReorderable = rowGrouping ? false : rowReorderableProp

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

  // 행별 includes 조회를 O(1) 로 만들기 위해 Set 변환.
  // (N행 × includes O(N) = O(N²) → N행 × Set.has O(1) = O(N))
  const selectedIdsSet = React.useMemo(() => new Set(selectedIds), [selectedIds])

  const isAllSelected = data.length > 0 && selectedIds.length === data.length
  const isIndeterminate = selectedIds.length > 0 && !isAllSelected

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map((row) => row.id))
    }
  }

  // selectedIds 를 ref 로 보관: handleSelectRow 의 deps 에서 selectedIds 를 빼야
  // 체크박스 클릭 시 ctx 가 재생성되지 않아 모든 행이 리렌더되는 것을 방지.
  const selectedIdsRef = React.useRef(selectedIds)
  selectedIdsRef.current = selectedIds
  // 외부 콜백은 사용처에서 useCallback 안 해도 안전하도록 ref 흡수
  const stableOnSelectionChange = useStableCallback(onSelectionChange)

  const handleSelectRow = React.useCallback((id: string | number) => {
    const current = selectedIdsRef.current
    if (current.includes(id)) {
      stableOnSelectionChange?.(current.filter((i) => i !== id))
    } else {
      stableOnSelectionChange?.([...current, id])
    }
  }, [stableOnSelectionChange])

  // 정렬 hook (sortStateArray, handleSort, getSortDirection, getSortPriority)
  const { handleSort, getSortDirection, getSortPriority } = useSort<T>({
    sortState,
    onSortChange,
    multiSort,
  })

  // 컬럼 정렬 클래스 (utils의 순수 함수를 직접 참조; useCallback 불필요)
  const getAlignClass = getAlignClassUtil

  const isRowExpandable = React.useCallback((row: T) => {
    if (!expandable) return false
    if (expandable.rowExpandable) return expandable.rowExpandable(row)
    return true
  }, [expandable])

  // 행별 isExpanded 조회를 O(1) 로 만들기 위해 Set 변환.
  const expandedRowIdsSet = React.useMemo(
    () => new Set(expandedRowIds),
    [expandedRowIds],
  )

  const isRowExpanded = React.useCallback(
    (rowId: string | number) => expandedRowIdsSet.has(rowId),
    [expandedRowIdsSet],
  )

  // expandedRowIds / setExpandedRowIds 를 ref 로 보관 (handleSelectRow 와 동일 이유).
  const expandedRowIdsRef = React.useRef(expandedRowIds)
  expandedRowIdsRef.current = expandedRowIds
  const setExpandedRowIdsRef = React.useRef(setExpandedRowIds)
  setExpandedRowIdsRef.current = setExpandedRowIds

  const toggleRowExpanded = React.useCallback((rowId: string | number) => {
    const current = expandedRowIdsRef.current
    if (current.includes(rowId)) {
      setExpandedRowIdsRef.current(current.filter((id) => id !== rowId))
    } else {
      setExpandedRowIdsRef.current([...current, rowId])
    }
  }, [])

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

  // 외부 콜백 ref 흡수 — 사용처가 inline 으로 넘겨도 ctx ref 안정 유지
  const stableOnCellChange = useStableCallback(onCellChange)
  const stableOnRowClick = useStableCallback(onRowClick)
  const stableRowClassName = useStableCallback(rowClassName)
  // 펼침 영역 렌더러도 사용처에서 inline 으로 넘기는 경우가 많아 ref 흡수
  const stableExpandedRowRender = useStableCallback(expandable?.expandedRowRender)
  const stableOnRowDelete = useStableCallback(rowActions?.onRowDelete)
  const stableOnRowAdd = useStableCallback(rowActions?.onRowAdd)

  // rowActions 설정
  const showRowDelete = rowActions?.showDelete ?? !!rowActions?.onRowDelete
  const showRowAdd = rowActions?.showAdd ?? !!rowActions?.onRowAdd

  const totalColumns = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowReorderable ? 1 : 0) + (showRowDelete ? 1 : 0)

  // 로우 그룹핑 hook (rowSpanMap, middleRowSet, getRowSpan)
  const { rowSpanMap, middleRowSet, getRowSpan } = useRowGrouping<T>({ data, rowGrouping })

  // rowGrouping 활성 시 그룹 head 행의 머지 셀별 selected/hovered flag 미리 계산.
  // selectedIds / hoveredRowIndex 변경 시 재계산 → 변경된 행만 row prop ref 변경 → 부분 리렌더.
  // (이 패턴이 없으면 ctx 에 isGroupCellSelected/Hovered 를 dep 추적 callback 으로 둬야 하는데
  //  그러면 selectedIds/hover 변경 시 모든 행 ctx 무효화 → 전체 리렌더.)
  const rowGroupFlagsMap = React.useMemo<Map<number, GroupCellFlags> | null>(() => {
    if (!rowGrouping || !rowSpanMap) return null
    const map = new Map<number, GroupCellFlags>()
    for (const [headIdx, colMap] of rowSpanMap.entries()) {
      const selected: Record<string, boolean> = {}
      const hovered: Record<string, boolean> = {}
      let any = false
      for (const [colKey, span] of colMap.entries()) {
        if (span > 1) {
          any = true
          let sel = false
          for (let i = headIdx; i < headIdx + span && i < data.length; i++) {
            if (selectedIdsSet.has(data[i].id)) {
              sel = true
              break
            }
          }
          selected[String(colKey)] = sel
          hovered[String(colKey)] =
            hoveredRowIndex !== null &&
            hoveredRowIndex >= headIdx &&
            hoveredRowIndex < headIdx + span
        }
      }
      if (any) map.set(headIdx, { selected, hovered })
    }
    return map
  }, [rowGrouping, rowSpanMap, data, selectedIdsSet, hoveredRowIndex])

  // sticky 스타일 hook
  const { getStickyStyles, hasLeftStickyColumns } = useStickyStyles<T>({
    columns,
    selectable,
    expandable,
    rowReorderable,
  })

  // 가상화 hook — virtual prop 정규화 + 비호환 기능 활성 시 자동 OFF
  // sticky 컬럼: CSS sticky + 가상화 스크롤 = sub-pixel rendering 으로 border 깜빡임 (브라우저 한계).
  //   `<div>` 기반 grid 로 재설계해야 깔끔히 해결 (v2 epic, PLAN-datatable-virtualization.md 참고).
  const hasStickyColumn = columns.some((col) => col.sticky)
  const virtualDisabledReason = rowReorderable
    ? "rowReorderable (행 드래그앤드롭)"
    : rowGrouping
      ? "rowGrouping (rowSpan 그룹핑)"
      : hasStickyColumn
        ? "sticky 컬럼 (가상화 스크롤 중 sub-pixel 깜빡임 발생, v2 div-based grid 에서 지원 예정)"
        : null
  const { isVirtual, virtualizer } = useTableVirtualizer({
    virtual,
    disabledReason: virtualDisabledReason,
    count: data.length,
    scrollContainerRef,
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
    columnsToRender,
    headerGroups,
    getStickyStyles,
    getColumnWidth,
    resizable,
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
      onRowDelete: stableOnRowDelete,
      rowGrouping,
      middleRowSet,
      // dataLength 는 rowGrouping 의 isGroupSpanToEnd 계산에만 사용됨.
      // rowGrouping 안 쓰면 0 으로 고정해서 행 추가/삭제 시 ctx invalidate 방지.
      dataLength: rowGrouping ? data.length : 0,
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
      setEditValue: setEditValue as (v: T[keyof T] | null) => void,
      setEditingCell,
      editValueRef: editValueRef as React.MutableRefObject<unknown>,
      editingCellRef,
      onCellChange: stableOnCellChange,
      onRowClick: stableOnRowClick,
      rowClassName: stableRowClassName,
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
      stableOnRowDelete,
      rowGrouping,
      middleRowSet,
      rowGrouping ? data.length : 0,
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
      stableOnCellChange,
      stableOnRowClick,
      stableRowClassName,
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
                      isSelected={selectedIdsSet.has(row.id)}
                      canExpand={isRowExpandable(row)}
                      isExpanded={isExpanded}
                      editingCell={editingCell}
                      editValue={editValue}
                      ctx={rowCtx}
                      groupCellFlags={rowGroupFlagsMap?.get(rowIndex)}
                    />
                    {expandable && isExpanded && stableExpandedRowRender && (
                      <DataTableExpandedRow<T>
                        row={row}
                        expandedRowRender={stableExpandedRowRender}
                        totalColumns={totalColumns}
                        visibleWidth={visibleWidth}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </SortableContext>
          ) : isVirtual && virtualizer ? (
            // 가상화 활성: 보이는 행만 렌더 + 상하 spacer 행으로 스크롤 영역 유지
            // TableBody (= tbody) 안에서 spacer-row 패턴 사용 (semantic HTML 유지)
            (() => {
              const virtualItems = virtualizer.getVirtualItems()
              const totalSize = virtualizer.getTotalSize()
              // 정수 픽셀로 라운딩 — sub-pixel 위치로 인한 행 사이 갭 / border 깜빡임 방지
              const paddingTop = Math.round(virtualItems[0]?.start ?? 0)
              const paddingBottom = Math.round(
                totalSize - (virtualItems[virtualItems.length - 1]?.end ?? 0),
              )
              return (
                <>
                  {paddingTop > 0 && (
                    <TableRow className="hover:bg-transparent" style={{ height: paddingTop }}>
                      <TableCell colSpan={totalColumns} className="p-0 border-0" />
                    </TableRow>
                  )}
                  {virtualItems.map((virtualItem) => {
                    const row = data[virtualItem.index]
                    const isExpanded = isRowExpanded(row.id)
                    return (
                      <React.Fragment key={row.id}>
                        <DataTableBodyRow<T>
                          row={row}
                          rowIndex={virtualItem.index}
                          isSelected={selectedIdsSet.has(row.id)}
                          canExpand={isRowExpandable(row)}
                          isExpanded={isExpanded}
                          editingCell={editingCell}
                          editValue={editValue}
                          ctx={rowCtx}
                          groupCellFlags={rowGroupFlagsMap?.get(virtualItem.index)}
                          rowRef={virtualizer.measureElement}
                          dataIndex={virtualItem.index}
                        />
                        {expandable && isExpanded && stableExpandedRowRender && (
                          <DataTableExpandedRow<T>
                            row={row}
                            expandedRowRender={stableExpandedRowRender}
                            totalColumns={totalColumns}
                            visibleWidth={visibleWidth}
                          />
                        )}
                      </React.Fragment>
                    )
                  })}
                  {paddingBottom > 0 && (
                    <TableRow className="hover:bg-transparent" style={{ height: paddingBottom }}>
                      <TableCell colSpan={totalColumns} className="p-0 border-0" />
                    </TableRow>
                  )}
                </>
              )
            })()
          ) : (
            data.map((row, rowIndex) => {
              const isExpanded = isRowExpanded(row.id)
              return (
                <React.Fragment key={row.id}>
                  <DataTableBodyRow<T>
                    row={row}
                    rowIndex={rowIndex}
                    isSelected={selectedIdsSet.has(row.id)}
                    canExpand={isRowExpandable(row)}
                    isExpanded={isExpanded}
                    editingCell={editingCell}
                    editValue={editValue}
                    ctx={rowCtx}
                    groupCellFlags={rowGroupFlagsMap?.get(rowIndex)}
                  />
                  {expandable && isExpanded && stableExpandedRowRender && (
                    <DataTableExpandedRow<T>
                      row={row}
                      expandedRowRender={stableExpandedRowRender}
                      totalColumns={totalColumns}
                      visibleWidth={visibleWidth}
                    />
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
                onClick={() => stableOnRowAdd?.()}
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
