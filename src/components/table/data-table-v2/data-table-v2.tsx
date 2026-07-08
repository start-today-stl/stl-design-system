import * as React from "react"
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DownIcon, RightIcon } from "@/icons"
import { DataTableV2ColumnSeparator } from "./data-table-v2-column-separator"
import { DataTableV2Row } from "./data-table-v2-row"
import { DataTableV2SortableHeaderCell } from "./data-table-v2-sortable-header-cell"
import { useColumnResize } from "./hooks/use-column-resize"
import { useColumnReorder } from "./hooks/use-column-reorder"
import { useRowExpansion } from "./hooks/use-row-expansion"
import { useRowSelection } from "./hooks/use-row-selection"
import type {
  DataTableV2Column,
  DataTableV2Props,
  HeaderGroup,
  SortDirection,
  SortState,
} from "./types"

const DEFAULT_ESTIMATE = 40
const DEFAULT_COL_WIDTH = 120
const CHECKBOX_COL_WIDTH = 40
const EXPAND_COL_WIDTH = 40

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
}

function SortArrow({ direction, active }: { direction: "up" | "down"; active: boolean }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-colors",
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        direction === "down" && "rotate-180"
      )}
    >
      <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
    </svg>
  )
}

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
  leftBaseOffset: number = 0
) {
  const left = new Array(columns.length).fill(-1)
  const right = new Array(columns.length).fill(-1)
  let leftAcc = leftBaseOffset
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].pinned === "left") {
      left[i] = leftAcc
      leftAcc += colMinNeeded(columns[i])
    }
  }
  let rightAcc = 0
  for (let i = columns.length - 1; i >= 0; i--) {
    if (columns[i].pinned === "right") {
      right[i] = rightAcc
      rightAcc += colMinNeeded(columns[i])
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
  maxHeight,
  estimateRowHeight = DEFAULT_ESTIMATE,
  className,
}: DataTableV2Props<T>) {
  const { orderedColumns, handleColumnDragEnd } = useColumnReorder({
    columns: rawColumns,
    columnReorderable,
    columnOrder,
    onColumnReorder,
  })
  const { getColumnWidth, handleResizeStart, resizingKey } = useColumnResize({
    resizable,
    columnWidths,
    onColumnResize,
  })

  // resize 적용된 컬럼 배열 (getColumnWidth 결과를 col.width 로 override)
  const columns = React.useMemo(() => {
    if (!resizable) return orderedColumns
    return orderedColumns.map((col) => {
      const w = getColumnWidth(col)
      return w !== undefined ? { ...col, width: w } : col
    })
  }, [orderedColumns, resizable, getColumnWidth])

  // 제어 컬럼 (체크박스 + 확장) 폭. sticky 헤더/셀 offset 계산에 반영.
  const controlColsWidth =
    (selectable ? CHECKBOX_COL_WIDTH : 0) + (expandable ? EXPAND_COL_WIDTH : 0)

  const { left: leftOffsets, right: rightOffsets } = React.useMemo(
    () => computePinnedOffsets(columns, controlColsWidth),
    [columns, controlColsWidth]
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
    onSelectionChange,
  })

  // 행 확장
  const expansion = useRowExpansion({ data, expandable })

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

  const handleSort = React.useCallback(
    (column: keyof T) => {
      if (!onSortChange) return
      onSortChange(computeNextSort(normalizedSortState, column, multiSort))
    },
    [normalizedSortState, multiSort, onSortChange]
  )

  // 어떤 컬럼도 flex-1 이 아니라면 (전부 fixed width) row 오른쪽에 spacer 필요.
  // flex-1 컬럼이 하나라도 있으면 그것이 자연스럽게 남은 공간을 채워서 spacer 필요 없음.
  const hasFlexColumn = React.useMemo(
    () => columns.some((c) => typeof c.width !== "number"),
    [columns]
  )

  // 재정렬 대상 컬럼 ID (pinned/sortable 제외)
  const reorderableIds = React.useMemo(
    () =>
      columnReorderable
        ? columns
            .filter((c) => !c.pinned && !c.sortable)
            .map((c) => String(c.accessorKey))
        : [],
    [columns, columnReorderable]
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = React.useCallback(
    (e: DragEndEvent) => handleColumnDragEnd(e),
    [handleColumnDragEnd]
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

  // pinned 경계 shadow — 스크롤 시에만 표시 (MUI DataGrid 스타일)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [scrolledLeft, setScrolledLeft] = React.useState(false)
  const [scrolledRight, setScrolledRight] = React.useState(false)
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      setScrolledLeft(el.scrollLeft > 0)
      setScrolledRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
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
    type Cell =
      | { kind: "group"; key: string; width: number; group: HeaderGroup<T> }
      | { kind: "placeholder"; key: string; col: DataTableV2Column<T> }
    const cells: Cell[] = []
    let i = 0
    while (i < middleCols.length) {
      const col = middleCols[i]
      const group = headerGroups.find((g) => g.columns[0] === col.accessorKey)
      if (group) {
        const w = group.columns.reduce((sum, ck) => {
          const c = middleCols.find((mc) => mc.accessorKey === ck)
          return sum + (c ? colMinNeeded(c) : DEFAULT_COL_WIDTH)
        }, 0)
        cells.push({
          kind: "group",
          key: `group-${String(col.accessorKey)}`,
          width: w,
          group,
        })
        i += group.columns.length
      } else {
        cells.push({
          kind: "placeholder",
          key: `middle-empty-${String(col.accessorKey)}`,
          col,
        })
        i += 1
      }
    }
    return cells
  }, [middleCols, headerGroups])
  const hasGroups = headerGroupCells !== null && headerGroupCells.length > 0

  const headerRowCount = hasGroups ? 2 : 1
  const headerBg = "bg-slate-100 dark:bg-slate-800"

  const renderHeaderCell = (col: DataTableV2Column<T>, i: number) => {
    const colId = col.id ?? String(col.accessorKey)
    const info = getSortInfo(col.accessorKey)
    const width = typeof col.width === "number" ? col.width : undefined
    const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
    const isLeft = col.pinned === "left"
    const isRight = col.pinned === "right"
    const isPinned = isLeft || isRight
    const isLeftBoundary = i === lastLeftPinnedIdx && scrolledLeft
    const isRightBoundary = i === firstRightPinnedIdx && scrolledRight
    const isFirstRightPinned = i === firstRightPinnedIdx
    const isDraggable = columnReorderable && !isPinned && !col.sortable
    const isResizingThis = resizingKey === col.accessorKey
    const isLastColumn = i === columns.length - 1

    // Outer: 순수 레이아웃/포지셔닝. text 스타일은 content container 에.
    const outerCls = cn(
      "relative flex min-h-9",
      width !== undefined && "shrink-0",
      isPinned && "sticky z-20",
      isPinned && headerBg,
      isLeftBoundary && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      isRightBoundary && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      col.sortable && "select-none",
      isFirstRightPinned && "ml-auto"
    )
    const style: React.CSSProperties = {
      width,
      minWidth,
      flex: width === undefined ? "1 1 0" : undefined,
      left: isLeft ? leftOffsets[i] : undefined,
      right: isRight ? rightOffsets[i] : undefined,
    }

    // Content container: 확장 슬롯. 미래에 checkbox / filter / menu 등 여기 내부에 형제로 추가.
    const contentCls = cn(
      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      alignClass[col.align ?? "left"]
    )
    const contentBody = col.sortable ? (
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          col.align === "right"
            ? "flex-row-reverse justify-start"
            : alignClass[col.align ?? "left"]
        )}
        onClick={() => handleSort(col.accessorKey)}
      >
        {col.header}
        <span className="flex items-center gap-0.5">
          <span className="flex flex-col gap-0.5">
            <SortArrow direction="up" active={info.direction === "asc"} />
            <SortArrow direction="down" active={info.direction === "desc"} />
          </span>
          {info.priority !== undefined && (
            <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none">
              {info.priority}
            </span>
          )}
        </span>
      </button>
    ) : (
      col.header
    )

    const separator = !isLastColumn && (
      <DataTableV2ColumnSeparator
        resizable={resizable}
        isResizing={isResizingThis}
        onResizeStart={(e) => handleResizeStart(e, col)}
      />
    )

    const ariaSort: "ascending" | "descending" | "none" | undefined = col.sortable
      ? info.direction === "asc"
        ? "ascending"
        : info.direction === "desc"
          ? "descending"
          : "none"
      : undefined

    if (isDraggable) {
      return (
        <DataTableV2SortableHeaderCell
          key={colId}
          id={String(col.accessorKey)}
          className={outerCls}
          style={style}
        >
          <div className={contentCls}>{contentBody}</div>
          {separator}
        </DataTableV2SortableHeaderCell>
      )
    }

    return (
      <div
        key={colId}
        role="columnheader"
        className={outerCls}
        style={style}
        aria-sort={ariaSort}
      >
        <div className={contentCls}>{contentBody}</div>
        {separator}
      </div>
    )
  }

  // 그룹 행에서 pinned 컬럼 자리를 채우기 위한 sticky placeholder 렌더
  const renderPinnedPlaceholder = (col: DataTableV2Column<T>, i: number) => {
    const width = typeof col.width === "number" ? col.width : DEFAULT_COL_WIDTH
    const isLeft = col.pinned === "left"
    const isLeftBoundary = i === lastLeftPinnedIdx && scrolledLeft
    const isRightBoundary = i === firstRightPinnedIdx && scrolledRight
    const isFirstRightPinned = i === firstRightPinnedIdx
    return (
      <div
        key={`pinned-placeholder-${col.id ?? String(col.accessorKey)}`}
        className={cn(
          "shrink-0 sticky z-20",
          headerBg,
          isFirstRightPinned && "ml-auto",
          isLeftBoundary && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          isRightBoundary && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        )}
        style={{
          width,
          left: isLeft ? leftOffsets[i] : undefined,
          right: !isLeft ? rightOffsets[i] : undefined,
        }}
      />
    )
  }

  // Control 헤더 셀 (체크박스 / 확장) — sticky left, 항상 좌측 pinned 컬럼 앞에 위치
  const showExpandAll = expandable?.showExpandAll ?? true
  const renderControlHeaderCells = () => {
    const cells: React.ReactNode[] = []
    if (selectable) {
      cells.push(
        <div
          key="ctrl-header-select"
          role="columnheader"
          className={cn("shrink-0 sticky z-20 flex items-center justify-center min-h-9", headerBg)}
          style={{ width: CHECKBOX_COL_WIDTH, left: 0 }}
        >
          <Checkbox
            checked={selection.allSelected}
            indeterminate={selection.someSelected}
            onCheckedChange={() => selection.toggleAll()}
            aria-label="전체 선택"
          />
        </div>
      )
    }
    if (expandable) {
      cells.push(
        <div
          key="ctrl-header-expand"
          role="columnheader"
          className={cn("shrink-0 sticky z-20 flex items-center justify-center min-h-9", headerBg)}
          style={{
            width: EXPAND_COL_WIDTH,
            left: selectable ? CHECKBOX_COL_WIDTH : 0,
          }}
        >
          {showExpandAll && (
            <button
              type="button"
              onClick={expansion.toggleAll}
              className="flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label={expansion.allExpanded ? "모두 접기" : "모두 펼치기"}
            >
              {expansion.allExpanded ? <DownIcon size={24} /> : <RightIcon size={24} />}
            </button>
          )}
        </div>
      )
    }
    return cells
  }

  // Control 헤더 placeholder (그룹 행에서 자리 확보용, 내용 비어있음)
  const renderControlHeaderPlaceholders = () => {
    const cells: React.ReactNode[] = []
    if (selectable) {
      cells.push(
        <div
          key="ctrl-ph-select"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{ width: CHECKBOX_COL_WIDTH, left: 0 }}
        />
      )
    }
    if (expandable) {
      cells.push(
        <div
          key="ctrl-ph-expand"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{
            width: EXPAND_COL_WIDTH,
            left: selectable ? CHECKBOX_COL_WIDTH : 0,
          }}
        />
      )
    }
    return cells
  }

  const leftPinnedCols = columns
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.pinned === "left")
  const rightPinnedCols = columns
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.pinned === "right")

  // pinned 섹션 경계 인덱스 (테두리로 시각적 구분용)
  const lastLeftPinnedIdx = leftPinnedCols.length
    ? leftPinnedCols[leftPinnedCols.length - 1].i
    : -1
  const firstRightPinnedIdx = rightPinnedCols.length ? rightPinnedCols[0].i : -1

  const gridContent = (
    <div
      role="grid"
      aria-rowcount={data.length + headerRowCount}
      aria-colcount={columns.length}
      className={cn(
        // flex-1 컬럼 있으면 컨테이너 폭 채워서 그 컬럼이 자라게. 없으면 콘텐츠 폭 (빈 공간 없음).
        hasFlexColumn ? "w-full" : "w-fit max-w-full",
        "overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        className
      )}
    >
      <div
        ref={scrollRef}
        className="overflow-auto"
        style={{ maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }}
      >
        <div style={{ minWidth: totalWidth }}>
          {/* Header (sticky top) */}
          <div
            className={cn(
              "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
              headerBg
            )}
          >
            {hasGroups && headerGroupCells && (
              <div
                role="row"
                className="flex border-b border-slate-200 dark:border-slate-700"
              >
                {renderControlHeaderPlaceholders()}
                {leftPinnedCols.map(({ c, i }) => renderPinnedPlaceholder(c, i))}
                {headerGroupCells.map((cell, idx) => {
                  if (cell.kind === "group") {
                    // 마지막 그룹 셀에는 우측 구분선 생략
                    let lastGroupIdx = -1
                    for (let k = headerGroupCells.length - 1; k >= 0; k--) {
                      if (headerGroupCells[k].kind === "group") {
                        lastGroupIdx = k
                        break
                      }
                    }
                    const isLastGroupCell = idx === lastGroupIdx
                    return (
                      <div
                        key={cell.key}
                        role="columnheader"
                        className="relative flex min-h-9 shrink-0"
                        style={{ width: cell.width }}
                      >
                        <div
                          className={cn(
                            "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                            alignClass[cell.group.align ?? "center"]
                          )}
                        >
                          {cell.group.header}
                        </div>
                        {!isLastGroupCell && <DataTableV2ColumnSeparator />}
                      </div>
                    )
                  }
                  const col = cell.col
                  const width = typeof col.width === "number" ? col.width : undefined
                  const minWidth =
                    typeof col.minWidth === "number" ? col.minWidth : undefined
                  return (
                    <div
                      key={cell.key}
                      className={cn(
                        "min-h-9",
                        width === undefined ? "flex-1" : "shrink-0"
                      )}
                      style={{ width, minWidth }}
                    />
                  )
                })}
                {rightPinnedCols.map(({ c, i }) => renderPinnedPlaceholder(c, i))}
              </div>
            )}
            {columnReorderable ? (
              <SortableContext
                items={reorderableIds}
                strategy={horizontalListSortingStrategy}
              >
                <div role="row" className="flex">
                  {renderControlHeaderCells()}
                  {columns.map((col, i) => renderHeaderCell(col, i))}
                  {firstRightPinnedIdx === -1 && !hasFlexColumn && (
                    <div aria-hidden className="flex-1 min-h-9" />
                  )}
                </div>
              </SortableContext>
            ) : (
              <div role="row" className="flex">
                {renderControlHeaderCells()}
                {columns.map((col, i) => renderHeaderCell(col, i))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="relative" style={{ height: totalHeight }}>
            {data.map((row, i) => (
              <DataTableV2Row
                key={row.id}
                row={row}
                rowIndex={i}
                columns={columns}
                leftOffsets={leftOffsets}
                rightOffsets={rightOffsets}
                lastLeftPinnedIdx={lastLeftPinnedIdx}
                firstRightPinnedIdx={firstRightPinnedIdx}
                showLeftShadow={scrolledLeft}
                showRightShadow={scrolledRight}
                totalWidth={totalWidth}
                translateY={positions[i]}
                isHovered={hoveredId === row.id}
                onHover={setHoveredId}
                onHeightChange={setHeight}
                selectable={selectable}
                isSelected={selection.isSelected(row.id)}
                onToggleSelect={selection.toggleRow}
                checkboxColWidth={CHECKBOX_COL_WIDTH}
                expandable={!!expandable}
                isExpanded={expansion.isExpanded(row.id)}
                canExpand={expansion.canExpand(row)}
                onToggleExpand={expansion.toggleRow}
                expandedContent={
                  expandable && expansion.isExpanded(row.id)
                    ? expandable.expandedRowRender(row)
                    : null
                }
                expandColWidth={EXPAND_COL_WIDTH}
                onRowClick={onRowClick}
                extraClassName={rowClassName?.(row)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (columnReorderable) {
    return (
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {gridContent}
      </DndContext>
    )
  }
  return gridContent
}
