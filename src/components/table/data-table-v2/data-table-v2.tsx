import * as React from "react"

import { cn } from "@/lib/utils"
import { DataTableV2Row } from "./data-table-v2-row"
import type {
  DataTableV2Column,
  DataTableV2Props,
  HeaderGroup,
  SortDirection,
  SortState,
} from "./types"

const DEFAULT_ESTIMATE = 40
const DEFAULT_COL_WIDTH = 120

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
function computePinnedOffsets<T>(columns: DataTableV2Column<T>[]) {
  const left = new Array(columns.length).fill(-1)
  const right = new Array(columns.length).fill(-1)
  let leftAcc = 0
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
  columns,
  headerGroups,
  sortState,
  onSortChange,
  multiSort = false,
  maxHeight,
  estimateRowHeight = DEFAULT_ESTIMATE,
  className,
}: DataTableV2Props<T>) {
  const { left: leftOffsets, right: rightOffsets } = React.useMemo(
    () => computePinnedOffsets(columns),
    [columns]
  )
  const totalWidth = React.useMemo(() => sumColumnWidths(columns), [columns])

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
    const cellCls = cn(
      "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
      width !== undefined && "shrink-0",
      alignClass[col.align ?? "left"],
      isPinned && "sticky z-20",
      isPinned && headerBg,
      isLeftBoundary && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      isRightBoundary && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
    )
    const style: React.CSSProperties = {
      width,
      minWidth,
      flex: width === undefined ? "1 1 0" : undefined,
      left: isLeft ? leftOffsets[i] : undefined,
      right: isRight ? rightOffsets[i] : undefined,
    }
    if (col.sortable) {
      return (
        <div
          key={colId}
          role="columnheader"
          className={cn(cellCls, "select-none")}
          style={style}
          aria-sort={
            info.direction === "asc"
              ? "ascending"
              : info.direction === "desc"
                ? "descending"
                : "none"
          }
        >
          <button
            type="button"
            className="flex w-full items-center gap-1 text-left cursor-pointer"
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
        </div>
      )
    }
    return (
      <div key={colId} role="columnheader" className={cellCls} style={style}>
        {col.header}
      </div>
    )
  }

  // 그룹 행에서 pinned 컬럼 자리를 채우기 위한 sticky placeholder 렌더
  const renderPinnedPlaceholder = (col: DataTableV2Column<T>, i: number) => {
    const width = typeof col.width === "number" ? col.width : DEFAULT_COL_WIDTH
    const isLeft = col.pinned === "left"
    const isLeftBoundary = i === lastLeftPinnedIdx && scrolledLeft
    const isRightBoundary = i === firstRightPinnedIdx && scrolledRight
    return (
      <div
        key={`pinned-placeholder-${col.id ?? String(col.accessorKey)}`}
        className={cn(
          "shrink-0 sticky z-20",
          headerBg,
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

  return (
    <div
      role="grid"
      aria-rowcount={data.length + headerRowCount}
      aria-colcount={columns.length}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700",
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
                {leftPinnedCols.map(({ c, i }) => renderPinnedPlaceholder(c, i))}
                {headerGroupCells.map((cell) => {
                  if (cell.kind === "group") {
                    return (
                      <div
                        key={cell.key}
                        role="columnheader"
                        className={cn(
                          "shrink-0 flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 last:border-r-0",
                          alignClass[cell.group.align ?? "center"]
                        )}
                        style={{ width: cell.width }}
                      >
                        {cell.group.header}
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
            <div role="row" className="flex">
              {columns.map((col, i) => renderHeaderCell(col, i))}
            </div>
          </div>

          {/* Body */}
          <div className="relative" style={{ height: totalHeight }}>
            {data.map((row, i) => (
              <DataTableV2Row
                key={row.id}
                row={row}
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
