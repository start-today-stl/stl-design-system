import * as React from "react"
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { SplashScreen } from "@/components/ui/splash-screen"
import { RowAddIcon } from "@/icons"
import { DataTableV2Header, type HeaderGroupCell } from "./data-table-v2-header"
import {
  CHECKBOX_COL_WIDTH,
  DEFAULT_COL_WIDTH,
  DRAG_HANDLE_COL_WIDTH,
  EXPAND_COL_WIDTH,
  ROW_ACTIONS_WIDTH,
} from "./constants"
import { useFilter } from "./hooks/use-filter"
import { useRowReorder } from "./hooks/use-row-reorder"
import { DataTableV2Row } from "./data-table-v2-row"
import { useCellEdit } from "./hooks/use-cell-edit"
import { useColumnResize } from "./hooks/use-column-resize"
import { useColumnReorder } from "./hooks/use-column-reorder"
import { useRowExpansion } from "./hooks/use-row-expansion"
import { useRowGrouping } from "./hooks/use-row-grouping"
import { useRowSelection } from "./hooks/use-row-selection"
import { useStableCallback } from "./hooks/use-stable-callback"
import { useTableVirtualizer } from "./hooks/use-table-virtualizer"
import type {
  DataTableV2Column,
  DataTableV2Props,
  HeaderGroup,
  SortDirection,
  SortState,
} from "./types"

const DEFAULT_ESTIMATE = 40
const SKELETON_ROW_COUNT = 5

/**
 * PointerSensor 옵션 — **반드시 모듈 상수여야 한다.**
 *
 * dnd-kit 의 `useSensor(sensor, options)` 는 `[sensor, options]` 로 메모한다.
 * 인라인 객체 리터럴을 넘기면 매 렌더 새 객체 → sensors 새 배열 → activators 재계산 →
 * DndContext 의 internal context 값이 매 렌더 바뀐다.
 * 그러면 `useSortable` 을 구독하는 모든 헤더 셀 / 행이 부모 리렌더마다 함께 리렌더된다
 * (context 변경은 React.memo 로 막을 수 없다).
 *
 * 5px: 제자리 클릭은 정렬, 5px 이상 끌면 재정렬로 갈린다.
 */
const POINTER_SENSOR_OPTIONS = { activationConstraint: { distance: 5 } }

/**
 * 헤더 클릭 시 다음 정렬 상태 계산.
 * - 단일 정렬 모드: asc → desc → 해제 순환. 다른 컬럼 클릭 시 그 컬럼만 asc.
 * - 다중 정렬 모드: 없으면 asc 추가, 이미 있으면 asc→desc→제거 순환. 다른 컬럼은 유지.
 */
function computeNextSort<T>(
  current: SortState<T>[],
  column: keyof T,
  multiSort: boolean
): SortState<T>[] {
  const existing = current.find((s) => s.column === column)

  if (multiSort) {
    if (!existing) return [...current, { column, direction: "asc" }]
    if (existing.direction === "asc") {
      return current.map((s) =>
        s.column === column ? { column, direction: "desc" as SortDirection } : s
      )
    }
    return current.filter((s) => s.column !== column)
  }

  if (!existing) return [{ column, direction: "asc" }]
  if (existing.direction === "asc") return [{ column, direction: "desc" }]
  return []
}

/**
 * pinned 컬럼의 좌/우 누적 offset 계산.
 * 좌 pinned 는 앞쪽부터 누적, 우 pinned 는 뒤쪽부터 누적.
 * pinned 아닌 컬럼은 -1 (offset 미사용).
 */
function computePinnedOffsets<T>(
  columns: DataTableV2Column<T>[],
  leftBaseOffset: number = 0,
  rightBaseOffset: number = 0,
  // 실제 렌더 폭 해석기. 선언된 폭(colMinNeeded)은 `minWidth` 만 준 컬럼에서
  // 실제 폭과 어긋나므로, 측정값이 있으면 그것을 쓴다.
  widthOf: (col: DataTableV2Column<T>) => number = colMinNeeded
) {
  const left = new Array(columns.length).fill(-1)
  const right = new Array(columns.length).fill(-1)
  let leftAcc = leftBaseOffset
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].pinned === "left") {
      left[i] = leftAcc
      leftAcc += widthOf(columns[i])
    }
  }
  let rightAcc = rightBaseOffset
  for (let i = columns.length - 1; i >= 0; i--) {
    if (columns[i].pinned === "right") {
      right[i] = rightAcc
      rightAcc += widthOf(columns[i])
    }
  }
  return { left, right }
}

/** width 있으면 width, 없으면 minWidth, 없으면 DEFAULT_COL_WIDTH */
function colMinNeeded<T>(col: DataTableV2Column<T>): number {
  if (typeof col.width === "number") return col.width
  if (typeof col.minWidth === "number") return col.minWidth
  return DEFAULT_COL_WIDTH
}

function sumColumnWidths<T>(columns: DataTableV2Column<T>[]): number {
  return columns.reduce((sum, col) => sum + colMinNeeded(col), 0)
}

/** DataTable v2 — div role=grid 기반 그리드 컨테이너 */
export function DataTableV2<T extends { id: string | number }>({
  data,
  columns: rawColumns,
  headerGroups,
  sortState,
  onSortChange,
  multiSort = false,
  resizable = false,
  columnWidths,
  onColumnResize,
  columnReorderable = false,
  columnOrder,
  onColumnReorder,
  selectable = false,
  selectedIds,
  defaultSelectedIds,
  onSelectionChange,
  onRowClick,
  rowClassName,
  expandable,
  onCellChange,
  rowActions,
  loading = false,
  loadingMode = "splash",
  loadingContent,
  emptyMessage = "데이터가 없습니다.",
  rowReorderable: rowReorderableProp = false,
  onRowReorder,
  filterState,
  defaultFilterState,
  onFilterChange,
  maxHeight,
  estimateRowHeight = DEFAULT_ESTIMATE,
  rowGrouping,
  virtual,
  bordered = true,
  className,
}: DataTableV2Props<T>) {
  // rowGrouping 활성 시 rowReorderable 자동 OFF (병합 셀 드래그 시 레이아웃 붕괴).
  // v1 동일 정책.
  const rowReorderable = rowGrouping ? false : rowReorderableProp

  // rowActions 파생 값
  const showRowDelete = rowActions?.showDelete ?? !!rowActions?.onRowDelete
  const showRowAdd = rowActions?.showAdd ?? !!rowActions?.onRowAdd

  // 사용자 콜백은 ref 로 흡수해 stable ref 보장 (React.memo 무효화 방지).
  // 사용처에서 inline arrow / inline object 로 넘겨도 안전.
  // → 아래 hooks 들이 이 stable ref 를 useCallback deps 에 넣어도 콜백 rebind 안 됨.
  const onRowDelete = useStableCallback(rowActions?.onRowDelete)
  const onRowAdd = useStableCallback(rowActions?.onRowAdd)
  const stableOnRowClick = useStableCallback(onRowClick)
  const stableRowClassName = useStableCallback(rowClassName)
  const stableOnCellChange = useStableCallback(onCellChange)
  const stableExpandedRowRender = useStableCallback(expandable?.expandedRowRender)
  const stableOnSelectionChange = useStableCallback(onSelectionChange)
  const stableOnSortChange = useStableCallback(onSortChange)
  const stableOnFilterChange = useStableCallback(onFilterChange)
  const stableOnColumnResize = useStableCallback(onColumnResize)
  const stableOnColumnReorder = useStableCallback(onColumnReorder)
  const stableOnRowReorder = useStableCallback(onRowReorder)
  const stableOnExpandedChange = useStableCallback(expandable?.onExpandedChange)
  const { orderedColumns, handleColumnDragEnd } = useColumnReorder({
    columns: rawColumns,
    columnReorderable,
    columnOrder,
    onColumnReorder: stableOnColumnReorder,
  })
  const { getColumnWidth, handleResizeStart, resizingKey } = useColumnResize({
    resizable,
    columnWidths,
    onColumnResize: stableOnColumnResize,
  })

  // resize 적용된 컬럼 배열 (getColumnWidth 결과를 col.width 로 override)
  const columns = React.useMemo(() => {
    if (!resizable) return orderedColumns
    return orderedColumns.map((col) => {
      const w = getColumnWidth(col)
      return w !== undefined ? { ...col, width: w } : col
    })
  }, [orderedColumns, resizable, getColumnWidth])

  // 제어 컬럼 (드래그 핸들 + 체크박스 + 확장 + 행 삭제) 폭. sticky 헤더/셀 offset 계산에 반영.
  // 좌측 순서: [드래그 핸들] → [체크박스] → [확장] → [삭제] → [데이터 컬럼]
  const dragHandleColsWidth = rowReorderable ? DRAG_HANDLE_COL_WIDTH : 0
  const rowActionsColLeftOffset =
    dragHandleColsWidth +
    (selectable ? CHECKBOX_COL_WIDTH : 0) +
    (expandable ? EXPAND_COL_WIDTH : 0)
  const controlColsWidth =
    rowActionsColLeftOffset + (showRowDelete ? ROW_ACTIONS_WIDTH : 0)

  // 컬럼의 **실제 렌더 폭**. `minWidth` 만 준 컬럼은 flex 로 늘어나므로 선언값과 다르다.
  // 이 값이 없으면 (1) 헤더 그룹 셀 폭이 하위 컬럼과 어긋나고 (2) pinned sticky offset 이
  // 실제보다 작아 스크롤 시 고정 컬럼끼리 겹친다.
  const [measuredColWidths, setMeasuredColWidths] = React.useState<
    Record<string, number>
  >({})
  const colWidth = React.useCallback(
    (col: DataTableV2Column<T>) =>
      measuredColWidths[String(col.accessorKey)] ?? colMinNeeded(col),
    [measuredColWidths]
  )

  const { left: leftOffsets, right: rightOffsets } = React.useMemo(
    () => computePinnedOffsets(columns, controlColsWidth, 0, colWidth),
    [columns, controlColsWidth, colWidth]
  )
  const totalWidth = React.useMemo(
    () => sumColumnWidths(columns) + controlColsWidth,
    [columns, controlColsWidth]
  )

  // 행 선택
  const selection = useRowSelection({
    data,
    selectable,
    selectedIds,
    defaultSelectedIds,
    onSelectionChange: stableOnSelectionChange,
  })

  // 행 확장 — expandable 객체 내부 onExpandedChange 는 stable 로 흡수해서 넘김
  const stableExpandable = React.useMemo(
    () =>
      expandable
        ? { ...expandable, onExpandedChange: stableOnExpandedChange }
        : undefined,
    [expandable, stableOnExpandedChange]
  )
  const expansion = useRowExpansion({ data, expandable: stableExpandable })

  // 셀 편집
  const cellEdit = useCellEdit<T>({ onCellChange: stableOnCellChange })

  // 행 순서 변경
  const { handleRowDragEnd } = useRowReorder<T>({ data, onRowReorder: stableOnRowReorder })

  // 로우 그룹핑 (셀 병합)
  const { rowSpanMap, getRowSpan } = useRowGrouping<T>({ data, rowGrouping })

  // 컬럼 헤더 필터
  const filter = useFilter({ filterState, defaultFilterState, onFilterChange: stableOnFilterChange })

  const normalizedSortState = React.useMemo<SortState<T>[]>(
    () => sortState ?? [],
    [sortState]
  )

  const getSortInfo = React.useCallback(
    (column: keyof T): { direction: SortDirection; priority: number | undefined } => {
      const idx = normalizedSortState.findIndex((s) => s.column === column)
      if (idx < 0) return { direction: null, priority: undefined }
      const found = normalizedSortState[idx]
      return {
        direction: found.direction,
        priority: multiSort && normalizedSortState.length > 1 ? idx + 1 : undefined,
      }
    },
    [normalizedSortState, multiSort]
  )

  // 정렬 상태를 ref 로 흡수해 handleSort 를 stable ref 로 유지한다.
  // deps 에 두면 정렬할 때마다 새 함수가 되고, 이 콜백을 prop 으로 받는
  // **모든 헤더 셀의 memo 가 무효**가 되어 관계없는 컬럼까지 전부 리렌더된다.
  const sortRef = React.useRef(normalizedSortState)
  sortRef.current = normalizedSortState
  const multiSortRef = React.useRef(multiSort)
  multiSortRef.current = multiSort

  const handleSort = React.useCallback(
    (column: keyof T) => {
      if (!stableOnSortChange) return
      stableOnSortChange(
        computeNextSort(sortRef.current, column, multiSortRef.current)
      )
    },
    [stableOnSortChange]
  )

  // 어떤 컬럼도 flex-1 이 아니라면 (전부 fixed width) row 오른쪽에 spacer 필요.
  // flex-1 컬럼이 하나라도 있으면 그것이 자연스럽게 남은 공간을 채워서 spacer 필요 없음.
  const hasFlexColumn = React.useMemo(
    () => columns.some((c) => typeof c.width !== "number"),
    [columns]
  )

  // 재정렬 대상 컬럼 ID (pinned 제외)
  // pinned 는 sticky offset 이 컬럼 순서에 종속이라 재정렬 대상에서 뺀다.
  // sortable 은 제외하지 않는다 — 드래그는 전용 핸들에만 걸려 있어 정렬 클릭과 충돌하지 않는다.
  const reorderableIds = React.useMemo(
    () =>
      columnReorderable
        ? columns.filter((c) => !c.pinned).map((c) => String(c.accessorKey))
        : [],
    [columns, columnReorderable]
  )

  const sensors = useSensors(useSensor(PointerSensor, POINTER_SENSOR_OPTIONS))

  // 지금 끌고 있는 게 컬럼인지 행인지 — 자동 스크롤 축을 정하는 데만 사용
  const [activeDragAxis, setActiveDragAxis] = React.useState<
    "column" | "row" | null
  >(null)

  const handleDragStart = React.useCallback((e: DragStartEvent) => {
    setActiveDragAxis(String(e.active.id).startsWith("row-") ? "row" : "column")
  }, [])

  // 컬럼 재정렬(id: accessorKey) 과 행 재정렬(id: `row-{id}`) 을 prefix 로 라우팅.
  const handleDragEnd = React.useCallback(
    (e: DragEndEvent) => {
      setActiveDragAxis(null)
      if (String(e.active.id).startsWith("row-")) {
        handleRowDragEnd(e)
      } else {
        handleColumnDragEnd(e)
      }
    },
    [handleColumnDragEnd, handleRowDragEnd]
  )

  const handleDragCancel = React.useCallback(() => setActiveDragAxis(null), [])

  // dnd-kit 기본 자동 스크롤 threshold 는 { x: 0.2, y: 0.2 } 라 **양축 모두** 스크롤된다.
  // 그래서 컬럼을 옮기려고 살짝 위로 당기기만 해도 바디가 세로로 스크롤됐다.
  // 컬럼 재정렬은 가로 위치만 바꾸므로 세로 스크롤이 일어날 이유가 없다 (AG Grid 도 동일).
  // → 끌고 있는 대상에 따라 필요한 축만 남긴다.
  const autoScroll = React.useMemo(
    () =>
      activeDragAxis === "row"
        ? { threshold: { x: 0, y: 0.2 } }
        : { threshold: { x: 0.2, y: 0 } },
    [activeDragAxis]
  )

  // 행 재정렬용 sortable id 목록 (row-{id} 형식)
  const rowSortableIds = React.useMemo(
    () => (rowReorderable ? data.map((r) => `row-${r.id}`) : []),
    [data, rowReorderable]
  )

  const [heights, setHeights] = React.useState<Map<T["id"], number>>(new Map())

  const setHeight = React.useCallback((id: T["id"], height: number) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev
      const next = new Map(prev)
      next.set(id, height)
      return next
    })
  }, [])

  const positions = React.useMemo(() => {
    const arr = new Array<number>(data.length + 1)
    arr[0] = 0
    for (let i = 0; i < data.length; i++) {
      const h = heights.get(data[i].id) ?? estimateRowHeight
      arr[i + 1] = arr[i] + h
    }
    return arr
  }, [data, heights, estimateRowHeight])

  const totalHeight = positions[data.length]

  const [hoveredId, setHoveredId] = React.useState<T["id"] | null>(null)

  // rowGrouping: hover 된 row 가 속한 그룹의 head 셀도 함께 hover 표시.
  // 사용자가 middle row (예: 옵션 M) 를 hover 하면 병합된 상품정보 셀 (head, row 1 DOM 내부) 도 hover bg.
  const hoveredRowIndex = React.useMemo(() => {
    if (hoveredId === null) return -1
    return data.findIndex((r) => r.id === hoveredId)
  }, [hoveredId, data])

  // getGroupHovered: hoveredRowIndex 에 dep. hover 시 콜백 rebind → 모든 rendered row 리렌더.
  // Trade-off: rowGrouping 케이스는 태생적으로 소량 데이터 (수십~수백 row) 라 all 리렌더 허용.
  // (대용량은 rowGrouping 자체가 UX 부적합 → tree grouping 등 다른 방식 사용해야 함)
  // Non-grouped 케이스는 onHover 미전달로 hoveredId state 업데이트 자체 X → 0 리렌더 유지.
  const getGroupHovered = React.useCallback(
    (rowIndex: number, colKey: keyof T): boolean => {
      if (hoveredRowIndex < 0) return false
      const span = getRowSpan(rowIndex, colKey)
      if (span === undefined || span <= 1) return false
      return hoveredRowIndex >= rowIndex && hoveredRowIndex < rowIndex + span
    },
    [hoveredRowIndex, getRowSpan]
  )

  // 병합 셀의 선택 표시도 hover 와 같이 **그룹 단위**로 판단한다.
  // head 행의 isSelected 만 보면, 그룹의 두 번째 이후 행을 체크했을 때 병합 셀만
  // 흰색으로 남아 어긋난다 (병합 셀은 그룹 전체를 덮고 있으므로).
  //
  // 이 콜백은 선택이 바뀔 때마다 rebind 되어 rendered row 가 전부 리렌더된다.
  // getGroupHovered 와 같은 trade-off 이며, rowGrouping 이 켜졌을 때만 감수한다
  // (rowGrouping 은 태생적으로 소량 데이터. 대용량은 UX 상 다른 방식을 써야 함).
  // rowGrouping 이 꺼져 있으면 stable no-op 을 넘겨 선택 시 리렌더가 늘지 않게 한다.
  const selectedSet = selection.selectedSet
  const getGroupSelectedActive = React.useCallback(
    (rowIndex: number, colKey: keyof T): boolean => {
      const span = getRowSpan(rowIndex, colKey)
      if (span === undefined || span <= 1) return false
      for (let i = rowIndex; i < rowIndex + span; i++) {
        const r = data[i]
        if (r && selectedSet.has(r.id)) return true
      }
      return false
    },
    [getRowSpan, data, selectedSet]
  )
  const getGroupSelectedNoop = React.useCallback(() => false, [])
  const getGroupSelected = rowGrouping
    ? getGroupSelectedActive
    : getGroupSelectedNoop

  // head 셀 세로 확장 높이 계산 — positions 를 ref 로 흡수해 콜백 자체는 stable ref 유지.
  // 이유: 가상화 스크롤 중 새 row 측정되면 heights → positions 가 자주 변경됨. 콜백을
  // positions 에 의존시키면 매번 새 ref 로 rebind → 모든 row memo 무효 → viewport 안 row 도
  // 스크롤마다 리렌더. ref 로 흡수하면 콜백 ref stable, rows 리렌더 없음. 값은 호출 시 최신.
  const positionsRef = React.useRef(positions)
  positionsRef.current = positions
  const getRowSpanHeight = React.useCallback(
    (rowIndex: number, colKey: keyof T): number | undefined => {
      const span = getRowSpan(rowIndex, colKey)
      if (span === undefined || span <= 1) return undefined
      return positionsRef.current[rowIndex + span] - positionsRef.current[rowIndex]
    },
    [getRowSpan]
  )

  // pinned 경계 shadow — 스크롤 시에만 표시 (MUI DataGrid 스타일)
  // visibleWidth — loading/empty 콘텐츠 가로 중앙 정렬용 (가로 스크롤 시 가시 영역 기준)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // 가상화 측정 캐시 키.
  //
  // **deps 에 data 를 넣어야 한다.** ref 로 읽고 콜백을 고정하면, 라이브러리가 이 함수의
  // 참조가 그대로라고 보고 측정값 재계산을 건너뛴다. 그러면 데이터가 바뀌어도 예전
  // 인덱스→id 매핑을 계속 써서, 사실상 인덱스에 높이가 붙은 것처럼 동작한다
  // (확장행이 있던 자리에 빈 공간이 남는다).
  const virtualGetItemKey = React.useCallback(
    (index: number) => data[index]?.id ?? index,
    [data]
  )


  // 가상화 (SDS-38): viewport 안 row 만 렌더. rowSpanMap 전달로 그룹 head 강제 렌더 (overscan 확장).
  const {
    isVirtual,
    virtualizer,
    renderIndices,
    getItemStart,
    totalSize: virtualTotalSize,
  } = useTableVirtualizer({
    virtual,
    count: data.length,
    scrollContainerRef: scrollRef,
    rowSpanMap,
    // 측정한 행 높이를 행 id 기준으로 기억한다. 인덱스 기준이면 필터/정렬로 데이터가
    // 바뀔 때 그 자리에 이전 행 높이가 남아, 확장행이 있던 자리에 빈 공간이 생긴다.
    getItemKey: virtualGetItemKey,
  })
  // ── 행 위치는 prop 이 아니라 DOM 에 직접 쓴다 (SDS-49) ──────────────────
  // positions 는 행 높이의 누적합이라, 한 행의 높이가 바뀌면 (확장 / 편집 에러 등)
  // 그 아래 모든 행의 값이 밀린다. 위치를 prop 으로 넘기면 그 행들이 전부 리렌더된다.
  // v1 은 <table> 문서 흐름이라 브라우저가 알아서 밀어내고 React 가 개입하지 않았다.
  // 여기서는 layout effect 로 style.top 을 직접 써서 같은 결과를 만든다.
  //
  // 행 id 로 보관하는 이유: 인덱스로 보관하면 행 순서가 바뀔 때 ref 정리(null)와
  // 등록(el) 순서가 엘리먼트 간에 보장되지 않아 서로의 등록을 지울 수 있다.
  const rowElsRef = React.useRef(new Map<T["id"], HTMLElement>())
  const registerRowEl = React.useCallback(
    (id: T["id"], el: HTMLElement | null) => {
      if (el) rowElsRef.current.set(id, el)
      else rowElsRef.current.delete(id)
    },
    []
  )
  React.useLayoutEffect(() => {
    for (const i of renderIndices) {
      const row = data[i]
      if (!row) continue
      const el = rowElsRef.current.get(row.id)
      if (!el) continue
      const top = `${Math.round(isVirtual ? getItemStart(i) : positions[i])}px`
      // 중복 쓰기 방지는 **엘리먼트의 인라인 스타일**과 비교해서 판단한다.
      // 별도 Map 에 캐시하면 가상화로 행이 사라졌다 다시 나타났을 때 틀린다.
      // (엘리먼트는 새것이라 top 이 비어 있는데 캐시에는 예전 값이 남아 있어
      //  "이미 적용됨" 으로 건너뛰고, 그 행이 0 위치에 겹쳐 그려진다)
      if (el.style.top !== top) el.style.top = top
    }
  })

  // 가로 스크롤 shadow: React state 대신 scrollRef DOM 에 data-attr 직접 갱신 →
  // React 리렌더 없이 CSS 로 shadow 처리 (모든 row 리렌더 방지).
  // pinned 경계 셀은 data-attr 상속받는 CSS 셀렉터로 shadow 표시.
  // visibleWidth 는 loading/empty 컨텐츠 중앙 정렬용 — 값 변경 시 리렌더 필요하므로 state 유지.
  const [visibleWidth, setVisibleWidth] = React.useState(0)

  // 헤더 리프 셀의 실제 폭을 재서 위 measuredColWidths 에 반영한다.
  // 매 렌더가 아니라 폭이 달라질 수 있는 입력이 바뀔 때만 측정한다
  // (컬럼 정의 / 사용자 리사이즈 / 컨테이너 폭). 스크롤마다 재면 레이아웃 스래싱이 난다.
  React.useLayoutEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>(
      '[role="columnheader"][data-column-key]'
    )
    if (els.length === 0) return
    const next: Record<string, number> = {}
    els.forEach((el) => {
      const key = el.dataset.columnKey
      if (key) next[key] = el.getBoundingClientRect().width
    })
    setMeasuredColWidths((prev) => {
      const keys = Object.keys(next)
      const same =
        keys.length === Object.keys(prev).length &&
        keys.every((k) => Math.abs((prev[k] ?? -1) - next[k]) < 0.5)
      return same ? prev : next
    })
  }, [columns, columnWidths, visibleWidth])
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      const left = el.scrollLeft > 0
      const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
      // data-attr 직접 갱신 (state 변경 없음 → 리렌더 없음)
      el.dataset.scrolledLeft = left ? "true" : "false"
      el.dataset.scrolledRight = right ? "true" : "false"
      setVisibleWidth(el.clientWidth)
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  // headerGroups 는 pinned 아닌 middle 컬럼에만 적용 (pinned 컬럼은 그룹 대상 아님)
  const middleCols = React.useMemo(
    () => columns.filter((c) => !c.pinned),
    [columns]
  )
  const headerGroupCells = React.useMemo(() => {
    if (!headerGroups || headerGroups.length === 0) return null
    type Cell = HeaderGroupCell<T>

    // 컬럼 → 그룹 역인덱스 (한 컬럼이 여러 그룹에 적혀 있으면 먼저 정의된 그룹 채택)
    const groupOfColumn = new Map<keyof T, HeaderGroup<T>>()
    for (const g of headerGroups) {
      for (const ck of g.columns) {
        if (!groupOfColumn.has(ck)) groupOfColumn.set(ck, g)
      }
    }

    // 그룹 스팬은 **현재 컬럼 순서에서 같은 그룹이 연속되는 구간(run)** 으로 매번 재계산한다.
    // 그룹 정의의 columns 배열을 그대로 믿고 건너뛰면, 재정렬로 인접성이 깨졌을 때
    // 다른 그룹이 통째로 소멸하거나 그룹 폭이 실제 컬럼 폭과 어긋난다 (SDS-39).
    // AG Grid 와 동일하게, 그룹이 갈라지면 헤더도 갈라져 각각 그려진다.
    const cells: Cell[] = []
    let i = 0
    while (i < middleCols.length) {
      const col = middleCols[i]
      const group = groupOfColumn.get(col.accessorKey)
      if (!group) {
        cells.push({
          kind: "placeholder",
          key: `middle-empty-${String(col.accessorKey)}`,
          col,
        })
        i += 1
        continue
      }
      // 그룹 셀은 하위 컬럼들과 **같은 flex 규칙**으로 크기를 잡는다.
      //
      // 폭의 합을 계산해 고정폭으로 주면 `minWidth` 만 지정한 컬럼(= flex 로 늘어남)과
      // 어긋난다. 실제 렌더 폭을 재서 넣는 방법도 있지만, 그룹 행이 넓어지면 컨테이너가
      // 넓어지고 그만큼 하위 컬럼도 다시 늘어나는 되먹임이 생긴다.
      //
      // 대신 하위 컬럼의 flex 설정을 그대로 합산한다.
      //   - 고정폭(width) 컬럼: 폭을 그대로 더한다
      //   - flex 컬럼(width 없음): grow 지분 1씩 더하고 minWidth 를 더한다
      // 같은 컨테이너 안에서 같은 지분으로 분배되므로 하위 컬럼 합과 폭이 일치한다.
      let fixedWidth = 0
      let flexGrow = 0
      let minWidth = 0
      const runStart = i
      while (
        i < middleCols.length &&
        groupOfColumn.get(middleCols[i].accessorKey) === group
      ) {
        const c = middleCols[i]
        if (typeof c.width === "number") {
          fixedWidth += c.width
          minWidth += c.width
        } else {
          flexGrow += 1
          minWidth += colMinNeeded(c)
        }
        i += 1
      }
      cells.push({
        // 같은 그룹이 여러 구간으로 갈라질 수 있으므로 key 는 구간 첫 컬럼 기준
        key: `group-${String(middleCols[runStart].accessorKey)}`,
        kind: "group",
        width: flexGrow === 0 ? fixedWidth : undefined,
        flexGrow,
        // 고정폭 컬럼이 섞인 그룹은 그만큼을 flex-basis 로 깔아야 한다.
        // basis 0 으로 두면 고정폭 몫이 빠져서 그룹 행이 그만큼 짧아진다.
        flexBasis: fixedWidth,
        minWidth,
        group,
      })
    }
    return cells
  }, [middleCols, headerGroups])
  const hasGroups = headerGroupCells !== null && headerGroupCells.length > 0

  // 헤더 그룹 행에서 첫 그룹 셀 앞에 다른 셀(컨트롤/좌측 pinned)이 있는지.
  // 없으면 첫 그룹의 좌측 구분선이 테이블 좌측 테두리와 겹쳐서 생략한다.
  const hasPrecedingHeaderCells =
    controlColsWidth > 0 || columns.some((c) => c.pinned === "left")

  const headerRowCount = hasGroups ? 2 : 1
  const headerBg = "bg-slate-100 dark:bg-slate-800"
  const showExpandAll = expandable?.showExpandAll ?? true

  // pinned 컬럼 파생값 — useMemo 로 stable ref 유지 (헤더 useMemo deps 안정성 확보).
  const { leftPinnedCols, rightPinnedCols, lastLeftPinnedIdx, firstRightPinnedIdx } =
    React.useMemo(() => {
      const left = columns
        .map((c, i) => ({ c, i }))
        .filter(({ c }) => c.pinned === "left")
      const right = columns
        .map((c, i) => ({ c, i }))
        .filter(({ c }) => c.pinned === "right")
      return {
        leftPinnedCols: left,
        rightPinnedCols: right,
        lastLeftPinnedIdx: left.length ? left[left.length - 1].i : -1,
        firstRightPinnedIdx: right.length ? right[0].i : -1,
      }
    }, [columns])

  // ARIA colcount 는 컨트롤 셀 (drag/checkbox/expand/delete) 도 포함해야 표준 grid 패턴 준수.
  const ariaColCount =
    columns.length +
    (rowReorderable ? 1 : 0) +
    (selectable ? 1 : 0) +
    (expandable ? 1 : 0) +
    (showRowDelete ? 1 : 0)

  const gridContent = (
    <div
      role="grid"
      aria-rowcount={data.length + headerRowCount}
      aria-colcount={ariaColCount}
      className={cn(
        // 항상 컨테이너 폭 유지. 리사이즈로 모든 컬럼 fixed 로 전환돼도 테이블 자체는 shrink 안 함.
        // 빈 영역은 셀 bg (SDS-42 에서 모든 셀에 headerBg 적용) 로 시각 커버.
        "w-full overflow-hidden bg-white dark:bg-slate-900",
        // flex 부모(TableContainer 등) 안에서 남은 높이를 받아 내부 스크롤이 생기도록 한다.
        // v1 은 스크롤 래퍼에 flex-1 이 있어서 TableContainer 안에서 자연히 스크롤됐다.
        // 이게 없으면 테이블이 내용 높이만큼 늘어나고 컨테이너의 overflow-hidden 에 잘려
        // 어디에서도 세로 스크롤이 안 된다. flex 부모가 아니면 무시되므로 단독 사용에는 영향 없음.
        "flex flex-col flex-1 min-h-0",
        bordered && "rounded-2xl border border-slate-200 dark:border-slate-700",
        className
      )}
    >
      <div
        ref={scrollRef}
        // group/scroll — 자식 boundary 셀들이 `group-data-[scrolled-left=true]/scroll:...` 로 shadow 반응
        // data-scrolled-left/right 는 스크롤 리스너에서 imperative 로 갱신 (React state X)
        className="overflow-auto group/scroll flex-1 min-h-0"
        style={{ maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }}
        data-scrolled-left="false"
        data-scrolled-right="false"
      >
        <div style={{ minWidth: totalWidth }}>
          <DataTableV2Header
            columns={columns}
            hasFlexColumn={hasFlexColumn}
            headerGroupCells={headerGroupCells}
            hasGroups={hasGroups}
            headerRowCount={headerRowCount}
            hasPrecedingHeaderCells={hasPrecedingHeaderCells}
            leftPinnedCols={leftPinnedCols}
            rightPinnedCols={rightPinnedCols}
            lastLeftPinnedIdx={lastLeftPinnedIdx}
            firstRightPinnedIdx={firstRightPinnedIdx}
            leftOffsets={leftOffsets}
            rightOffsets={rightOffsets}
            getSortInfo={getSortInfo}
            onSort={handleSort}
            filterState={filter.filterState}
            getColumnFilter={filter.getColumnFilter}
            hasActiveFilter={filter.hasActiveFilter}
            onColumnFilterChange={filter.setColumnFilter}
            resizable={resizable}
            resizingKey={resizingKey}
            onResizeStart={handleResizeStart as (e: React.MouseEvent, column: unknown) => void}
            columnReorderable={columnReorderable}
            reorderableIds={reorderableIds}
            rowReorderable={rowReorderable}
            selectable={selectable}
            allSelected={selection.allSelected}
            someSelected={selection.someSelected}
            onToggleAll={selection.toggleAll}
            hasExpandable={!!expandable}
            showExpandAll={showExpandAll}
            allExpanded={expansion.allExpanded}
            onToggleExpandAll={expansion.toggleAll}
            showRowDelete={showRowDelete}
            dragHandleColsWidth={dragHandleColsWidth}
            rowActionsColLeftOffset={rowActionsColLeftOffset}
            headerBg={headerBg}
          />

          {/* Body */}
          {loading ? (
            loadingContent ? (
              // 커스텀 로딩 — 가로 스크롤 시 가시 영역 중앙에 표시
              <div
                className="sticky left-0 flex items-center justify-center min-h-64 py-8"
                style={visibleWidth ? { width: visibleWidth } : undefined}
              >
                {loadingContent}
              </div>
            ) : loadingMode === "skeleton" ? (
              // 스켈레톤 — 각 컬럼 폭에 맞춰 셀 구조로 렌더
              <div>
                {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
                  <div
                    key={rowIdx}
                    role="row"
                    className="flex border-b border-slate-200 dark:border-slate-700 min-h-9"
                  >
                    {rowReorderable && (
                      <div
                        role="gridcell"
                        className="shrink-0"
                        style={{ width: DRAG_HANDLE_COL_WIDTH }}
                      />
                    )}
                    {selectable && (
                      <div
                        role="gridcell"
                        className="shrink-0 flex items-center justify-center"
                        style={{ width: CHECKBOX_COL_WIDTH }}
                      >
                        <Skeleton width={16} height={16} />
                      </div>
                    )}
                    {expandable && (
                      <div
                        role="gridcell"
                        className="shrink-0 flex items-center justify-center"
                        style={{ width: EXPAND_COL_WIDTH }}
                      >
                        <Skeleton width={16} height={16} />
                      </div>
                    )}
                    {showRowDelete && (
                      <div
                        role="gridcell"
                        className="shrink-0"
                        style={{ width: ROW_ACTIONS_WIDTH }}
                      />
                    )}
                    {columns.map((col) => {
                      const width =
                        typeof col.width === "number" ? col.width : undefined
                      const minWidth =
                        typeof col.minWidth === "number" ? col.minWidth : undefined
                      return (
                        <div
                          key={col.id ?? String(col.accessorKey)}
                          role="gridcell"
                          className={cn(
                            "flex items-center px-3 py-1.5",
                            width === undefined ? "flex-1" : "shrink-0"
                          )}
                          style={{ width, minWidth }}
                        >
                          <Skeleton height={16} width="70%" />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ) : (
              // 기본 splash — 가로 스크롤 시 가시 영역 중앙에 표시
              <div
                className="sticky left-0 flex items-center justify-center min-h-64 py-8"
                style={visibleWidth ? { width: visibleWidth } : undefined}
              >
                <SplashScreen size="lg" />
              </div>
            )
          ) : data.length === 0 ? (
            <div
              className="sticky left-0 flex items-center justify-center min-h-32 py-8 text-sm text-slate-500 dark:text-slate-400"
              style={visibleWidth ? { width: visibleWidth } : undefined}
            >
              {emptyMessage}
            </div>
          ) : (
            // 가상화 ON 시 컨테이너 높이 = virtualizer.totalSize, OFF 시 = positions 기반 totalHeight
            <div
              className="relative"
              style={{ height: isVirtual ? virtualTotalSize : totalHeight }}
            >
              {(() => {
                // SortableContext 는 rowReorderable 활성 시에만 감쌈.
                // 항상 감싸면 useSortable 이 context subscribe 해서 모든 parent 리렌더마다
                // 모든 row 리렌더 (React.memo 로 못 막음 — memo 는 props 만 비교, context 변경은 별개).
                const rowsJsx = renderIndices.map((i) => {
                  const row = data[i]
                  return (
                  <DataTableV2Row
                    key={row.id}
                    row={row}
                    rowIndex={i}
                    columns={columns}
                    leftOffsets={leftOffsets}
                    rightOffsets={rightOffsets}
                    lastLeftPinnedIdx={lastLeftPinnedIdx}
                    firstRightPinnedIdx={firstRightPinnedIdx}
                    totalWidth={totalWidth}
                    registerEl={registerRowEl}
                    onHover={rowGrouping ? setHoveredId : undefined}
                    onHeightChange={setHeight}
                    measureRef={isVirtual && virtualizer ? virtualizer.measureElement : undefined}
                    dataIndex={isVirtual ? i : undefined}
                    selectable={selectable}
                    isSelected={selection.isSelected(row.id)}
                    onToggleSelect={selection.toggleRow}
                    checkboxColWidth={CHECKBOX_COL_WIDTH}
                    expandable={!!expandable}
                    isExpanded={expansion.isExpanded(row.id)}
                    canExpand={expansion.canExpand(row)}
                    onToggleExpand={expansion.toggleRow}
                    expandedRowRender={expandable ? stableExpandedRowRender : undefined}
                    expandColWidth={EXPAND_COL_WIDTH}
                    visibleWidth={visibleWidth}
                    onRowClick={stableOnRowClick}
                    extraClassName={stableRowClassName?.(row)}
                    editingColumnKey={
                      cellEdit.editing?.rowId === row.id ? cellEdit.editing.columnKey : null
                    }
                    editingError={
                      cellEdit.editing?.rowId === row.id ? cellEdit.editing.error : undefined
                    }
                    onStartEdit={cellEdit.startEdit}
                    onCompleteEdit={cellEdit.completeEdit}
                    onCancelEdit={cellEdit.cancelEdit}
                    onClearEditError={cellEdit.clearError}
                    showRowDelete={showRowDelete}
                    onRowDelete={onRowDelete}
                    rowActionsColWidth={ROW_ACTIONS_WIDTH}
                    rowActionsColLeftOffset={rowActionsColLeftOffset}
                    rowReorderable={rowReorderable}
                    dragHandleColWidth={DRAG_HANDLE_COL_WIDTH}
                    isLast={i === data.length - 1}
                    getRowSpan={getRowSpan}
                    getRowSpanHeight={getRowSpanHeight}
                    getGroupHovered={getGroupHovered}
                    getGroupSelected={getGroupSelected}
                    ariaRowIndex={headerRowCount + i + 1}
                  />
                  )
                })
                return rowReorderable ? (
                  <SortableContext
                    items={rowSortableIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {rowsJsx}
                  </SortableContext>
                ) : (
                  <>{rowsJsx}</>
                )
              })()}
            </div>
          )}

          {/* 행 추가 버튼 (하단 새 행, 삭제 컬럼과 동일 위치) */}
          {showRowAdd && !loading && (
            <div
              role="row"
              className="flex bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {rowReorderable && (
                <div
                  aria-hidden
                  className="shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900"
                  style={{ width: DRAG_HANDLE_COL_WIDTH, left: 0 }}
                />
              )}
              {selectable && (
                <div
                  aria-hidden
                  className="shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900"
                  style={{
                    width: CHECKBOX_COL_WIDTH,
                    left: dragHandleColsWidth,
                  }}
                />
              )}
              {expandable && (
                <div
                  aria-hidden
                  className="shrink-0 sticky z-10 min-h-9 bg-white dark:bg-slate-900"
                  style={{
                    width: EXPAND_COL_WIDTH,
                    left: dragHandleColsWidth + (selectable ? CHECKBOX_COL_WIDTH : 0),
                  }}
                />
              )}
              <div
                role="gridcell"
                className={cn(
                  "shrink-0 sticky z-10 flex items-center justify-center bg-white dark:bg-slate-900 min-h-9"
                )}
                style={{ width: ROW_ACTIONS_WIDTH, left: rowActionsColLeftOffset }}
              >
                <button
                  type="button"
                  onClick={() => onRowAdd?.()}
                  className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  aria-label="행 추가"
                >
                  <RowAddIcon size={20} />
                </button>
              </div>
              <div role="gridcell" aria-hidden className="flex-1 min-h-9" />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (columnReorderable || rowReorderable) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        autoScroll={autoScroll}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {gridContent}
      </DndContext>
    )
  }
  return gridContent
}
